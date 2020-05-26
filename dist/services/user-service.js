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
const fs_1 = __importDefault(require("fs"));
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
            avatarUrl: user.avatarImg,
            firstName: user.firstName,
            secondName: user.secondName,
            date: user.date,
            phoneNumber: user.phoneNumber,
        };
    });
};
const get = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield user_1.default.findById(id);
        if (!user) {
            throw new Error("user doesn't exists");
        }
        return {
            email: user.email,
            avatarImg: user.avatarImg,
            firstName: user.firstName,
            secondName: user.secondName,
            date: user.date,
            phoneNumber: user.phoneNumber,
            recipes: user.recipes,
        };
    });
};
const getAll = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.aggregate([
            { $match: {} },
            {
                $project: {
                    avatarImg: 1,
                    firstName: 1,
                    secondName: 1,
                    date: 1,
                    phoneNumber: 1,
                    email: 1,
                    recipes: 1,
                },
            },
        ]);
    });
};
const update = function (data, user) {
    return __awaiter(this, void 0, void 0, function* () {
        user.firstName = data.firstName;
        user.secondName = data.secondName;
        user.phoneNumber = data.phoneNumber;
        if (data.passwords.password) {
            user.password = data.passwords.password;
        }
        const token = yield user.generateAuthToken();
        yield user.save();
        return {
            idToken: token,
            localId: user._id,
            email: user.email,
            expiresIn: 3600,
            avatarUrl: user.avatarImg,
            firstName: user.firstName,
            secondName: user.secondName,
            date: user.date,
            phoneNumber: user.phoneNumber,
        };
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
            avatarUrl: user.avatarImg,
            firstName: user.firstName,
            secondName: user.secondName,
            date: user.date,
            phoneNumber: user.phoneNumber,
        };
    });
};
const addRecipe = function (user, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipe = new recipe_1.default(data);
        yield recipe.save();
        user.recipes.push(recipe._id);
        yield user.save();
        return recipe;
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
        if (user.avatarImg !== "img/avatars/avatar.png") {
            fs_1.default.unlinkSync("public/" + user.avatarImg);
        }
        user.avatarImg = "img/avatars/" + file.filename;
        yield user.save();
        return { imgUrl: "img/avatars/" + file.filename };
    });
};
const getOrders = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield user.populate("orders").execPopulate()).orders;
    });
};
const getRecipes = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield user.populate("recipes").execPopulate()).recipes;
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
    getOrders,
};
