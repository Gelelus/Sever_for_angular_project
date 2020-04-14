"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pet_1 = __importDefault(require("../models/pet"));
const add = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        const pet = new pet_1.default(data);
        yield pet.save();
        return pet;
    });
};
const get = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pet_1.default.findById(id);
    });
};
const getAll = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pet_1.default.find({});
    });
};
const update = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pet_1.default.findByIdAndUpdate(data.id, data, { new: true });
    });
};
const del = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pet_1.default.findByIdAndDelete(id);
    });
};
exports.default = {
    add,
    get,
    update,
    del,
    getAll
};
