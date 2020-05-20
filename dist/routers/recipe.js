"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadRecipe_1 = __importDefault(require("../middleware/uploadRecipe"));
const recipe_controller_1 = __importDefault(require("../controllers/recipe-controller"));
const router = express_1.Router();
router.get("/:id", recipe_controller_1.default.getRecipe);
router.get("/", recipe_controller_1.default.getAllRecipe);
router.post("/", uploadRecipe_1.default, recipe_controller_1.default.addRecipe);
router.put("/", uploadRecipe_1.default, recipe_controller_1.default.updateRecipe);
router.delete("/:id", recipe_controller_1.default.deleteRecipe);
exports.default = router;
