class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      socket.on("CLIENT_MESSAGE", (data) => {
        socket.broadcast.emit("RECEIVED_MESSAGE", data);
      });
    });
  }
}

module.exports = Sockets;
