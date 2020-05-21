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
const user_service_1 = __importDefault(require("../services/user-service"));
class UserController {
    constructor() { }
}
UserController.addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.add(req.body);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.del(req.params.id);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.update(req.body, req.user);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.get(req.params.id);
        res.send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.getAllUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.getAll();
        res.send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.getOrders(req.user);
        res.send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.login(req.body);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.bindRecipeToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.bindRecipe(req.user, req.body);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.addRecipeToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.addRecipe(req.user, req.body);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.getUserRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.getRecipes(req.user);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
UserController.addAvatarToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.addAvatar(req.file, req.user);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
exports.default = UserController;
