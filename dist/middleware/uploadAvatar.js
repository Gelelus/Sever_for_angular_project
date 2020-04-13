"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var path = process.cwd() + "/public/img/avatars";
var storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path);
    },
    filename: function (_req, file, cb) {
        cb(null, uuid_1.v4().toString() + "_" + file.originalname);
    }
});
var fileFilter = function (_req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
    }
    else {
        cb(new Error("Type file is not access"));
    }
};
exports.default = multer_1.default({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
}).single('avatar');
