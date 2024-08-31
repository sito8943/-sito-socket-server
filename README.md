# Super small Socket Server for chat

## Events

1. connection - to know if a client has connected
2. disconnect - to know if a client has disconnected
3. notify - to know if a client needs to sync with the server

### How to use

```
import express from "express";
import { createServer } from "http";

// @sito-socket
import { SocketServer } from "@sito/socket-server";

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

```
