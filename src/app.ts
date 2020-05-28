import express from "express";
import socketIo from "socket.io";
import http from "http";

import router from "./routers/index";
import { ServerConfiguration } from "./config/server.config";


const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);
const port = process.env.PORT || 8080;

ServerConfiguration.mongoDB();
ServerConfiguration.chat(io);
app.use(router);

server.listen(port, () => {
  console.log("server start on port " + port);
});
