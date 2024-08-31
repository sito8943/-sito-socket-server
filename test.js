import express from "express";
import { createServer } from "http";

// @sito-socket
import { SocketServer } from "./index.js";

const port = process.env.PORT;
const app = express();

const httpServer = createServer(app);

const socket = new SocketServer(httpServer);

app.get("/send-test", (req, res) => {
  const { target, sender } = req.query;
  socket.io.emit("notify", {
    target,
    sender,
    message: "Hola Test",
  });
  res.send("test");
});

httpServer.listen(port, () => {
  console.info("listening on", port);
});
