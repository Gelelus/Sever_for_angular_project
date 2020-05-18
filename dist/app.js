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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const options_1 = __importDefault(require("./middleware/options"));
const router = __importStar(require("./routers/export-router"));
const auth_1 = __importDefault(require("./middleware/auth"));
dotenv_1.default.config();
if (!process.env.MONGO_DB) {
    throw new Error("please create .env file as .env.example");
}
mongoose_1.default
    .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log(`
       State of connection - ${mongoose_1.default.connection.readyState} 
       0 = disconnected
       1 = connected
       2 = connecting 
       3 = disconnecting
      `));
const app = express_1.default();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(options_1.default);
app.use("/users", router.userRouter);
app.use("/recipes", auth_1.default, router.recipeRouter);
app.use(express_1.default.static(process.cwd() + "/public"));
app.listen(port, () => {
    console.log("server on port " + port);
});
