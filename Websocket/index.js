const { generateJsFile } = require("./generate_file");

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
httpServer.listen(8081, function () {
  console.log("listening on *:8081");
});
io.on("connection", function (socket) {
  //check socket connection
  console.log(
    `client ${socket.id},${socket.localAddress}, ${socket.localPort} has connected`
  );
  socket.on("NEW_RECOGNIZED_USER", (response) => {
    userData = JSON.parse(response);
    generateJsFile(userData);
    socket.broadcast.emit("NEW_RECOGNIZED_USER", response);
  });

  socket.on("NEW_USE_UPDATE", (response) => {
    userData = JSON.parse(response);
    generateJsFile(userData);
    socket.broadcast.emit("updateUser", response);
  });
});
