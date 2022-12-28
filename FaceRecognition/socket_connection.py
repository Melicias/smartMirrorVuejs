import socketio
sio = socketio.Client()
sio.connect('http://localhost:8081')
print('my sid is', sio.sid)

sio.emit('NEW_RECOGNIZED_USER', {'foo': 'bar'})

while True:
    @sio.on('NEW_RECOGNIZED_USER')
    def on_connect(data):
        print("I'm connected to the /chat namespace!"+data)
    if 0xFF == ord('q'):
        break
