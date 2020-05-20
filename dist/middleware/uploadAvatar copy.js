"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path = process.cwd() + "/public/img/avatars";
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path);
    },
    filename: (_req, file, cb) => {
        cb(null, uuid_1.v4().toString() + "_" + file.originalname);
    }
});
const fileFilter = (_req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
    }
    else {
        cb(new Error("Type file is not access"));
    }
};
exports.default = multer_1.default({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
}).single('avatar');
