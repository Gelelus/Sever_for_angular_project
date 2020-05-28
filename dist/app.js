"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("./routers/index"));
const server_config_1 = require("./config/server.config");
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default.listen(server);
const port = process.env.PORT || 8080;
server_config_1.ServerConfiguration.mongoDB();
server_config_1.ServerConfiguration.chat(io);
app.use(index_1.default);
server.listen(port, () => {
    console.log("server start on port " + port);
});
