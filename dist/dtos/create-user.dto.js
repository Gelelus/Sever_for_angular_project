"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var validationUserSchema = joi_1.default.object({
    name: joi_1.default.string()
        .alphanum()
        .min(3)
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,}$'))
        .required(),
    age: joi_1.default.number()
        .integer()
        .min(12)
        .required(),
});
exports.default = validationUserSchema;
