"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var petSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});
exports.default = mongoose_1.model('Pet', petSchema);
