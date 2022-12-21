import face_recognition
import cv2
import numpy as np
from sklearn import svm
import pickle
import socketio
from datetime import datetime
import firebase_admin
from firebase_admin import db
from firebase_admin import firestore 
import threading
import json

class Name:
    name = ''
    time = ''
    def __init__(self, name):  
        self.name = name
        self.time = datetime.now()

sio = socketio.Client()
sio.connect('http://localhost:8081')

#connect to database firebase
cred_obj = firebase_admin.credentials.Certificate('privateKeyFirebase.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':'https://rasp-mestrado.firebaseio.com/' })
db = firestore.client() 
#collection = db.collection('user') 
#doc = collection.document('fy8FJ5bSxSAOH5FIWT7b') #get by the user id
#res = doc.get().to_dict()

# Create an Event for notifying main thread.
delete_done = threading.Event()

# Create a callback on_snapshot function to capture changes
def on_snapshot(col_snapshot, changes, read_time):
    for change in changes:
        if change.type.name == 'ADDED':
            print(f'New user: {change.document.id}')
            sio.emit('newInscricao', "teste1 - " + change.document.id)
        elif change.type.name == 'MODIFIED':
            print(f'Modified user: {change.document.id}')
            doc_dict = change.document.to_dict()
            json_object = json.dumps(doc_dict, indent = 4)
            #with open("sample.json", "w") as outfile:
            #    json.dump(json_object, outfile)
            sio.emit('newInscricao', "teste2 - " + doc_dict["imageFRurl"])

            #fazer download da imagem, talvez chamar uma funcao para tratar disso
            #doc_dict["imageFRurl"]
        elif change.type.name == 'REMOVED':
            print(f'Removed user: {change.document.id}')
            sio.emit('newInscricao', "teste3 - " + change.document.id)
            delete_done.set()

col_query = db.collection(u'user')

# Watch the collection query
query_watch = col_query.on_snapshot(on_snapshot)


# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)

# Create arrays of known face encodings and their names
picleDir = 'pickleData/'
encodings = []
names_raw = []
f = open("pickleData/data", "rb").read()
pickleFile = pickle.loads(f)
encodings = (pickleFile['encodings'])
names_raw = (pickleFile['names'])

#add time until ask for next request
names = []
for n in names_raw:
    names.append(Name(n))

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

while True:
    # Grab a single frame of video
    ret, frame = video_capture.read()

    # Only process every other frame of video to save time
    if process_this_frame:
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(
            rgb_small_frame, face_locations)
        face_names = []
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(encodings, face_encoding)
            name = "Unknown"
            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(
                encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = names[best_match_index].name
                if (datetime.now() - names[best_match_index].time).seconds > 10:
                    sio.emit('newInscricao', name)
                    names[best_match_index].time = datetime.now()
                
            face_names.append(name)

    process_this_frame = not process_this_frame

    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35),
                      (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6),
                    font, 1.0, (255, 255, 255), 1)

    # Display the resulting image
    cv2.imshow('Video', frame)

    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()
