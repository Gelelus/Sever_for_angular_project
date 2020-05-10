"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const validationUserSchema = joi_1.default.object({
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,}$")).required(),
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
    })
        .required(),
    name: joi_1.default.string().alphanum().min(3),
});
exports.default = validationUserSchema;
