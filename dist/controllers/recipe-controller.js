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
const recipe_service_1 = __importDefault(require("../services/recipe-service"));
class RecipeController {
    constructor() { }
}
RecipeController.addRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_service_1.default.add(req.body, req.user, req.file);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
RecipeController.deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_service_1.default.del(req.params.id, req.user);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
RecipeController.updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_service_1.default.update(req.body, req.user, req.file);
        res.status(201).send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
RecipeController.getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_service_1.default.get(req.params.id);
        res.send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
RecipeController.getAllRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield recipe_service_1.default.getAll(req.query);
        res.send(result);
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }
});
exports.default = RecipeController;
