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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const recipe_1 = __importDefault(require("../models/recipe"));
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    avatarImg: {
        type: String,
        trim: true,
        default: "img/avatars/avatar.png",
    },
    date: { type: Date, default: Date.now },
    firstName: {
        type: String,
        trim: true,
        default: "Nameless",
    },
    secondName: {
        type: String,
        trim: true,
        default: "User",
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: "+375",
    },
    recipes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
    orders: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});
userSchema.statics.findByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email: email });
    if (!user) {
        throw new Error("Unable user");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login");
    }
    return user;
});
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = jsonwebtoken_1.default.sign({
            _id: user._id.toString(),
            expiresIn: Date.now() + 3600000,
        }, "expressapp");
        return token;
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield bcryptjs_1.default.hash(user.password, 8);
        }
        next();
    });
});
userSchema.pre("remove", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        recipe_1.default.updateMany({ users: this._id }, { $pull: { users: this._id } }, { multi: true }).exec();
        next();
    });
});
const User = mongoose_1.model("User", userSchema);
exports.default = User;
