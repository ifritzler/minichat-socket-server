const express = require("express");
const http = require("http");
const path = require("path");
const { Server: SocketioServer } = require("socket.io");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.server = http.createServer(this.app);
    this.io = new SocketioServer(this.server, {
      /* Configuracion de sockets*/
    });
  }

  socketsConfig() {
    new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  initRoutes() {
    this.app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../public/index.html"));
    });
  }

  execute() {
    this.middlewares();
    this.socketsConfig();
    this.initRoutes();
    this.server.listen(this.port, () => {
      console.log(`Server listen on port ${this.port} 🚀`);
    });
  }
}

module.exports = Server;
