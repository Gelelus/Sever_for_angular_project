import express from "express";
import socketIo from "socket.io";
import http from "http";

import router from "./routers/index";
import { ServerConfiguration } from "./config/server.config";
import authIO from "./middleware/ioAuth";

ServerConfiguration.mongoDB();

const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);
const port = process.env.PORT || 8080;

app.use(router);

server.listen(port, () => {
  console.log("server start on port " + port);
});

io.use(authIO).on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnecting", () => {
    console.log("user disconnected");
  });

  socket.on("new-message", (message) => {
    console.log(message);
    io.emit("new-message", {
      message: message,
      img: socket.user.avatarImg,
      email: socket.user.email,
      date: Date.now(),
    });
  });
});
