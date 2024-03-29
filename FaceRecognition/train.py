import face_recognition
import cv2
import os
import numpy as np
import pickle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
image_dir = os.path.join(BASE_DIR, "images_input")
picleDir = 'pickleData/'
encodings = []
names = []


def train(fullTrain):
    for root, dirs, files in os.walk(image_dir):
        for file in files:
            if file.endswith("png") or file.endswith("jpg"):
                path = os.path.join(root, file)
                print(image_dir)
                label = os.path.basename(root).replace(" ", "-")#.lower()
                face = face_recognition.load_image_file(path)
                face_bounding_boxes = face_recognition.face_locations(face)
                # If training image contains exactly one face
                if len(face_bounding_boxes) == 1:
                    face_enc = face_recognition.face_encodings(face)[0]
                    # Add face encoding for current image with corresponding label (name) to the training data
                    encodings.append(face_enc)
                    names.append(label)
                    if(not fullTrain):
                        break
                else:
                    os.remove(path)
                    print("File was skipped and deleted. (can't be used for training)")


def storeData(fullTrain):
    data = {"encodings": encodings, "names": names}
    if(fullTrain):
        f = open("pickleData/SVM_data", "wb")
    else:
        f = open("pickleData/data", "wb")
    f.write(pickle.dumps(data))


def main():
    while True:
        fullTrain = input(
            "Full train (svm) or small train (normal)? (0 - small | 1 - Full) ")
        fullTrain = int(fullTrain)
        if(fullTrain == 0 or fullTrain == 1):
            fullTrain = bool(fullTrain)
            break
        else:
            print("Input should be 0 or 1")
            continue
    train(fullTrain)
    storeData(fullTrain)


# comentar isto para nao necessitar no recognition
main()
