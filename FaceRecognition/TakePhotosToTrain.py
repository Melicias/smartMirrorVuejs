import cv2
import numpy as numpy
import face_recognition
import os
import pickle



# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)
FACE_DIR = "images_input/"
encodings = []
names = []
def create_folder(folder_name):
	if not os.path.exists(folder_name):
		os.mkdir(folder_name)

def empy_folder(folder_name):
	for root, dirs, files in os.walk(folder_name):
		for file in files:
			if file.endswith("png") or file.endswith("jpg"):
				path = os.path.join(root, file)
				os.remove(path)
				

		
def main():

	create_folder(FACE_DIR)
	# get face id
	while True:
		face_id = input("Enter name for face: ")
		try:
			face_folder = FACE_DIR + str(face_id) + "/"
			create_folder(face_folder)
			empy_folder(face_folder)
			break
		except:
			print("Invalid name")
			continue
	
	while True:
		init_total_imgs = input("Total number of images?.: ")
		try:
			init_total_imgs = int(init_total_imgs)
			break
		except:
			print("Total number of images should be integer...")
			continue
	total_imgs=init_total_imgs
	# get beginning image number
	while True:
		init_img_no = input("Starting img no.: ")
		try:
			init_img_no = int(init_img_no)
			break
		except:
			print("Starting img no should be integer...")
			continue
	img_no = init_img_no
	
	# get face images
	while True:
		ret, frame = video_capture.read()
		small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
		rgb_small_frame = small_frame[:, :, ::-1]
		face_bounding_boxes = face_recognition.face_locations(rgb_small_frame)
		if len(face_bounding_boxes) == 1:
			for (top, right, bottom, left) in (face_bounding_boxes):
				#x, y, w, h
			# Scale back up face locations since the frame we detected in was scaled to 1/4 size
				top *= 4
				right *= 4
				bottom *= 4
				left *= 4
			# Draw a box around the face
				img_path = face_folder+str(img_no)+".jpg"
				#cv2.imwrite(img_path, frame[top:bottom, left:right])
				cv2.imwrite(img_path, frame)
				cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)							
				cv2.waitKey(1)
				img_no += 1
		else:
			print(" was skipped and can't be used for training")
		cv2.imshow('Video', frame)
		if img_no == init_img_no + total_imgs:
			break
		
	video_capture.release()
	cv2.destroyAllWindows()

main()