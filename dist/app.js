"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = __importStar(require("./routers/export-router"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(function () {
    return console.log("\n       State of connection - " + mongoose_1.default.connection.readyState + " \n       0 = disconnected\n       1 = connected\n       2 = connecting \n       3 = disconnecting\n      ");
});
var app = express_1.default();
var port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use("/users", router.userRouter);
app.use(express_1.default.static(__dirname + "/public"));
app.listen(port, function () {
    console.log("server on port " + port);
});
