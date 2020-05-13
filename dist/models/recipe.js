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
        required: true,
        trim: true,
    },
    ingredients: [{ name: String, amount: Number }]
});
exports.default = mongoose_1.model("Recipe", recipeSchema);
