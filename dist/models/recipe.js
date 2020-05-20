"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
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
exports.default = mongoose_1.model("Recipe", recipeSchema);
