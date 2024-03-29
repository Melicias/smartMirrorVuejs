import cv2
import mediapipe as mp
import time
import math
import socketio
# main
sio = socketio.Client()
sio.connect('http://localhost:8081')


cap = cv2.VideoCapture(0)
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()
mp_draw = mp.solutions.drawing_utils
prev_time = 0
cur_time = 0
prev_x, prev_y = 0, 0
prev_prev_x, prev_prev_y = 0, 0
RIGHT_MOVE = 0
LEFT_MOVE = 1
while True:
    _, img = cap.read()
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(imgRGB)
    # print("[INFO] handmarks: {}".format(results.multi_hand_landmarks))

    if results.multi_hand_landmarks:

        for hand_landmarks in results.multi_hand_landmarks:
            index_finger_landmark = hand_landmarks.landmark[8]
            # print(hand_landmarks.landmark[8])
            height, width, channel = img.shape
            x, y = index_finger_landmark.x, index_finger_landmark.y
            cx, cy = int(x * width), int(y * height)
            cv2.circle(img, (cx, cy), 10, (255, 0, 255), cv2.FILLED)
            threshold = 0.2*width
            t = time.time()
            t_ms = int(t * 1000)
            if cx > prev_x + threshold and cx > prev_prev_x + threshold:
                print("Index finger moved to the right")
                sio.emit('HAND_TRACK', {"movement": RIGHT_MOVE, "time": t_ms})
            elif cx < prev_x - threshold and cx < prev_prev_x - threshold:
                print("Index finger moved to the left")
                sio.emit('HAND_TRACK', {"movement": LEFT_MOVE, "time": t_ms})
            prev_x, prev_y = cx, cy
            prev_prev_x = prev_x
            prev_prev_y = prev_y
            # for index, lm in enumerate(hand_landmarks.landmark):

            # height, width, channel = img.shape
            # cx, cy = int(lm.x * width), int(lm.y * height)
            # print(cx, cy)
            # cv2.circle(img, (cx, cy), 10, (255, 0, 255), cv2.FILLED)
            mp_draw.draw_landmarks(img, hand_landmarks,
                                   mp_hands.HAND_CONNECTIONS)

    cur_time = time.time()
    fps = 1/(cur_time-prev_time)
    prev_time = cur_time

    cv2.putText(img, str(int(fps)), (10, 70),
                cv2.FONT_HERSHEY_PLAIN, 3, (255, 0, 255), 3)

    cv2.imshow("Image", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
