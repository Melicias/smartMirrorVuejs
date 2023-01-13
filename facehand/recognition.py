import face_recognition
import cv2
import numpy as np
import os
from sklearn import svm
import pickle
import socketio
from datetime import datetime
import firebase_admin
from firebase_admin import db
from firebase_admin import firestore
from firebase_admin import storage
import threading
import json
import filecmp
from trainDef import *
import mediapipe as mp
import time
import math
import shutil

# To download the images
def download_image_to_train(user_id):
    # Obter a referencia da imagem
    blob = bucket.blob('images/'+user_id+'.png')
    # Download
    local_folder = './images_input'
    folder_path = f'{local_folder}/{user_id}'
    if not os.path.exists(folder_path):
        # If the folder does not exist, create it
        os.makedirs(folder_path)
    image_path_old = f'{folder_path}/0.png'
    image_path = f'{folder_path}/01.png'
    
    if not blob.exists():
        return
    blob.download_to_filename(image_path)
    
    if not os.path.isfile(image_path_old):
        #trocar o nome do ficheiro
        os.rename(image_path, image_path_old)
        train(False)
    else:
        if not filecmp.cmp(image_path_old, image_path):
            #trocar o nome do ficheiro
            os.rename(image_path, image_path_old)
            train(False)
        else:
            print("descarregar ficheiro")
            fetch_userData(user_id,True) #so fazer isto caso o ficheiro exista?! senao ele cria na mesma
            
            
# To remove the images
def remove_file_user(user_id):
    # Download
    local_folder = './images_input'
    folder_path = f'{local_folder}/{user_id}'
    if not os.path.exists(folder_path):
        return
    
    try:
        shutil.rmtree(folder_path)
        print("directory is deleted")
        train(False)
    except OSError as x:
        print("Error occured: %s : %s" % (folder_path, x.strerror))
        return

# Create a callback on_snapshot function to capture changes
def on_snapshot(col_snapshot, changes, read_time):
    print("teste")
    for change in changes:
        if change.type.name == 'ADDED':
            print(f'New user: {change.document.id}')
            #sio.emit('newInscricao', "teste1 - " + change.document.id)
        elif change.type.name == 'MODIFIED':
            print(f'Modified user: {change.document.id}')
            #doc_dict = change.document.to_dict()
            #doc_dict['user_id'] = change.document.id
            #json_object = json.dumps(doc_dict, indent=4)
            modifiying.set()
            download_image_to_train(change.document.id)
            modifiying.clear()

        elif change.type.name == 'REMOVED':
            print(f'Removed user: {change.document.id}')
            modifiying.set()
            remove_file_user(change.document.id)
            modifiying.clear()
            print("removed user")
            # chamar funcao para apagar os dados de imagem

# Socket notification that user is on FR
def fetch_userData(user_id,isUpdate):
    doc = col_query.document(user_id).get()
    doc_dict = doc.to_dict()
    print(user_id)
    doc_dict['user_id'] = user_id
    json_object = json.dumps(doc_dict, indent=4)
    if isUpdate:
        sio.emit('NEW_RECOGNIZED_USER_FOR_UPDATE', json_object)
    else:
        sio.emit('NEW_RECOGNIZED_USER', json_object)

def declareFaces():
    global picleDir, encodings, names_raw, names
    encodings = []
    names_raw = []
    names = []
    f = open("pickleData/data", "rb").read()
    pickleFile = pickle.loads(f)
    encodings = (pickleFile['encodings'])
    names_raw = (pickleFile['names'])
    for n in names_raw:
        names.append(Name(n))

class Name:
    name = ''
    time = ''

    def __init__(self, name):
        self.name = name
        self.time = datetime.now()

# main
sio = socketio.Client()
sio.connect('http://localhost:8081')

# connect to database firebase
cred_obj = firebase_admin.credentials.Certificate('privateKeyFirebase.json')
print(cred_obj)
default_app = firebase_admin.initialize_app(cred_obj, {
    'databaseURL': 'https://rasp-mestrado.firebaseio.com/',
    'storageBucket': 'rasp-mestrado.appspot.com'
})
db = firestore.client()
# collection = db.collection('user')
# doc = collection.document('fy8FJ5bSxSAOH5FIWT7b') #get by the user id
# res = doc.get().to_dict()

# Create an Event for notifying main thread.
modifiying = threading.Event()

col_query = db.collection(u'user')
bucket = storage.bucket()
# Watch the collection query

query_watch = col_query.on_snapshot(on_snapshot)
print(query_watch)

# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)

# Create arrays of known face encodings and their names
picleDir = 'pickleData/'; encodings = []; names_raw = []; names = []
declareFaces()
# Initialize some variables
face_locations = []; face_encodings = []; face_names = []; process_this_frame = 0; returned = False

mp_hands = mp.solutions.hands
#hands = mp_hands.Hands()
hands = mp_hands.Hands(static_image_mode=False,max_num_hands=1)
mp_draw = mp.solutions.drawing_utils
prev_time = 0
cur_time = 0
hand_id = 0
prev_x, prev_y = 0, 0
prev_prev_x, prev_prev_y = 0, 0
RIGHT_MOVE = 0
LEFT_MOVE = 1
timeFingers = datetime.now()

while True:
    # Grab a single frame of video
    ret, frame = video_capture.read()
    # Only process every other frame of video to save time
    process_this_frame += 1
    if process_this_frame == 10:
        process_this_frame = 0
        # make decision on what to do
        if modifiying.is_set():
            returned = True
            continue
        if returned:
            declareFaces()
            returned = False
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        face_names = []
        facesCounter = 0
        for face_encoding in face_encodings:
            if facesCounter >= 2:
                break
            matches = face_recognition.compare_faces(encodings, face_encoding)
            name = "Unknown"
            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = names[best_match_index].name
                if not name.startswith("noise") or not name == "Unknown":
                    facesCounter += 1
                if (datetime.now() - names[best_match_index].time).seconds > 10:
                    if not name.startswith("noise"):
                        fetch_userData(name,False)
                    names[best_match_index].time = datetime.now()
            face_names.append(name)

    imgRGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(imgRGB)
    if results.multi_hand_landmarks:
        sorted_hands = sorted(results.multi_hand_landmarks, key=lambda z: z.landmark[0].z, reverse=True)
        closest_hand = sorted_hands[0]
        index_finger_landmark = closest_hand.landmark[8]
        height, width, channel = frame.shape
        x, y = index_finger_landmark.x, index_finger_landmark.y
        cx, cy = int(x * width), int(y * height)
        cv2.circle(frame, (cx, cy), 10, (255, 0, 255), cv2.FILLED)
        threshold = 0.05*width
        if (datetime.now() - timeFingers).seconds > 0.25:
            if cx > prev_x + threshold and cx > prev_prev_x + threshold:
                print("Index finger moved to the right")
                sio.emit('HAND_TRACK', {"movement": RIGHT_MOVE, "time": int(time.time() * 1000)})
                timeFingers = datetime.now()
            elif cx < prev_x - threshold and cx < prev_prev_x - threshold:
                print("Index finger moved to the left")
                sio.emit('HAND_TRACK', {"movement": LEFT_MOVE, "time": int(time.time() * 1000)})
                timeFingers = datetime.now()
        prev_x, prev_y = cx, cy
        prev_prev_x = prev_x
        prev_prev_y = prev_y
        # for index, lm in enumerate(hand_landmarks.landmark):

        # height, width, channel = img.shape
        # cx, cy = int(lm.x * width), int(lm.y * height)
        # print(cx, cy)
        # cv2.circle(img, (cx, cy), 10, (255, 0, 255), cv2.FILLED)
        mp_draw.draw_landmarks(frame, closest_hand,
                                mp_hands.HAND_CONNECTIONS)

    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4; right *= 4; bottom *= 4; left *= 4

        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35),(right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6),font, 1.0, (255, 255, 255), 1)

    # Display the resulting image
    cv2.imshow('Video', frame)
    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()
