"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("../models/user"));
const recipeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        text: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        text: true
    },
    imagePath: {
        type: String,
        default: "img/avatars/index.jpg",
        trim: true,
    },
    ingredients: [{ name: String, amount: Number }],
    date: { type: Date, default: Date.now },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
recipeSchema.pre("remove", function (next) {
    user_1.default.updateMany({ recipes: this._id }, { $pull: { recipes: this._id } }, { multi: true }).exec();
    next();
});
exports.default = mongoose_1.model("Recipe", recipeSchema);
