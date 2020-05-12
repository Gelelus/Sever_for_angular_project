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
const user_1 = __importDefault(require("../models/user"));
const recipe_1 = __importDefault(require("../models/recipe"));
const add = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        const userTest = yield user_1.default.findOne({ email: data.email });
        if (userTest) {
            throw new Error("Email already exists");
        }
        const user = new user_1.default(data);
        const token = yield user.generateAuthToken();
        yield user.save();
        return {
            idToken: token,
            localId: user._id,
            email: user.email,
            expiresIn: 3600,
            avatarUrl: user.avatarImg
        };
    });
};
const get = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.findById(id);
    });
};
const getAll = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.find({});
    });
};
const update = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.findByIdAndUpdate(data.id, data, { new: true });
    });
};
const del = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.findByIdAndDelete(id);
    });
};
const login = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findByCredentials(data.email, data.password);
        const token = yield user.generateAuthToken();
        return {
            idToken: token,
            localId: user._id,
            email: user.email,
            expiresIn: 3600,
            avatarUrl: user.avatarImg
        };
    });
};
const getRecipes = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userWithRecipes = yield user_1.default.findById(id).populate("recipes");
        return userWithRecipes;
    });
};
const addRecipe = function (user, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipe = yield new recipe_1.default(data);
        yield recipe.save();
        user.recipes.push(recipe._id);
        yield user.save();
        return { user, recipe };
    });
};
const addRecipes = function (_user, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield recipe_1.default.insertMany(data, { ordered: false });
        return { answer };
    });
};
const bindRecipe = function (user, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipe = yield recipe_1.default.findOne({ name: data.name });
        if (!recipe) {
            throw new Error("Recipe doesn't exist");
        }
        user.recipes.push(recipe._id);
        yield user.save();
        return { user, recipe };
    });
};
const addAvatar = function (file, user) {
    return __awaiter(this, void 0, void 0, function* () {
        user.avatarImg = "/public/img/avatars/" + file.filename;
        yield user.save();
        return user;
    });
};
exports.default = {
    add,
    get,
    update,
    del,
    getAll,
    login,
    getRecipes,
    bindRecipe,
    addAvatar,
    addRecipe,
    addRecipes,
};
