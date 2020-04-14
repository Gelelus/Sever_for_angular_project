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
    constructor() {
        this.addUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.add(req.body);
                res.status(201).send(result);
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.del(req.params.id);
                res.status(201).send(result);
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.update(req.body);
                res.status(201).send(result);
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.get(req.params.id);
                res.send(result);
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
        this.getAllUser = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.getAll();
                res.send(result);
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.login(req.body);
                res.status(201).send(result);
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
        this.logout = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.send({ responce: "successfully logout" });
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
        this.addPetToUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.addPet(req.body);
                res.status(201).send(result);
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
        this.getUserWithPets = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.getPets(req.params.id);
                res.status(201).send(result);
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
        this.addAvatarToUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_service_1.default.addAvatar(req.file, req.user);
                res.status(201).send(result);
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
    }
}
exports.default = UserController;
