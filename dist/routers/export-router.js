"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../routers/user"));
exports.userRouter = user_1.default;
const recipe_1 = __importDefault(require("../routers/recipe"));
exports.recipeRouter = recipe_1.default;
const order_1 = __importDefault(require("../routers/order"));
exports.orderRouter = order_1.default;
const message_1 = __importDefault(require("../routers/message"));
exports.messageRouter = message_1.default;
