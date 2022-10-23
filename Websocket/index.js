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
  console.log(`client ${socket.id} has connected`);
});

io.on("connection", function (socket) {
  socket.on("newInscricao", function (response) {
    console.log(response);
    socket.broadcast.emit("newInscricao", response);
  });
});
