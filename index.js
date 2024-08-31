import { Server } from "socket.io";

/**
 * @description Socket Server
 */
export class SocketServer {
  /**
   * Prepare client socket with custom events
   * @param {object} socket
   */
  prepareClient = (socket) => {
    this.clients[socket.id] = socket;

    socket.on("disconnect", (reason) => {
      // * Whenever a client disconnects
      if (this.clients[socket.id])
        console.info(socket.id, "has disconnected. Reason:", reason);
    });

    socket.emit("connected", { id: socket.id });
  };

  constructor(httpServer) {
    this.clients = {};

    this.io = new Server(httpServer, {
      // options
    });

    // * Whenever a client connects
    this.io.on("connection", (socket) => {
      console.info("client connected", socket.id);

      this.prepareClient(socket);
    });

    // * Whenever a client needs to be notified
    this.io.on("notify", (notification) => {
      if (this.clients[notification.target])
        this.clients[notification.target].emit("notify", notification);
    });
  }
}
