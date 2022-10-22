import socketio
sio = socketio.Client()
sio.connect('http://localhost:8081')
print('my sid is', sio.sid)

sio.emit('newInscricao', {'foo': 'bar'})

while True:
    @sio.on('newInscricao')
    def on_connect(data):
        print("I'm connected to the /chat namespace!"+data)
    if 0xFF == ord('q'):
        break
