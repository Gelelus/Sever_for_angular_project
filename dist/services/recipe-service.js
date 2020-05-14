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
const recipe_1 = __importDefault(require("../models/recipe"));
const add = function (data, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipe = yield new recipe_1.default(data);
        yield recipe.save();
        user.recipes.push(recipe._id);
        yield user.save();
        return recipe;
    });
};
const get = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield recipe_1.default.findById(id);
    });
};
const getAll = function (params) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(params);
        return yield recipe_1.default.find().skip(+params.startItem).limit(+params.limit);
    });
};
const update = function (data, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.recipes.includes(data._id)) {
            throw Error("You do not have edit access to this recipe.");
        }
        return yield recipe_1.default.findByIdAndUpdate(data._id, data, { new: true });
    });
};
const updateAll = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield recipe_1.default.deleteMany({});
        return yield recipe_1.default.insertMany(data);
    });
};
const del = function (id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.recipes.includes(id)) {
            throw Error("You do not have permission to delete this recipe.");
        }
        yield recipe_1.default.findByIdAndDelete(id);
        return { id };
    });
};
exports.default = {
    add,
    get,
    update,
    del,
    getAll,
    updateAll,
};
