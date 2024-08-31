import { Server } from "socket.io";

class SocketServer {
  prepareClient = (socket) => {};

  constructor(httpServer) {
    this.clients = [];
    this.io = new Server(httpServer, {
      // options
    });
    this.io.on("connection", (socket) => {});
    this.io.on("disconnection", (socket) => {});
    this.io.on("notify", (socket) => {});
  }
}

export { SocketServer };
