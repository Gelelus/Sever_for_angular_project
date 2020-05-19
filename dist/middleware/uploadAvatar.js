"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path = process.cwd() + "/public/img/avatars";
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/gif": "gif",
};
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path);
    },
    filename: (_req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuid_1.v4().toString() + "_" + file.originalname + "." + ext);
    },
});
const fileFilter = (_req, file, cb) => {
    if (MIME_TYPE_MAP[file.mimetype]) {
        cb(null, true);
    }
    else {
        cb(new Error("Baf file type"));
    }
};
exports.default = multer_1.default({
    storage,
    fileFilter,
}).single("image");
