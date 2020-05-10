"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const recipe_controller_1 = __importDefault(require("../controllers/recipe-controller"));
const router = express_1.Router();
router.post("/", auth_1.default, recipe_controller_1.default.addRecipe);
router.put("/update", auth_1.default, recipe_controller_1.default.updateRecipes);
router.delete("/:id", auth_1.default, recipe_controller_1.default.deleteRecipe);
router.put("/", auth_1.default, recipe_controller_1.default.updateRecipe);
router.get("/:id", auth_1.default, recipe_controller_1.default.getRecipe);
router.get("/", auth_1.default, recipe_controller_1.default.getAllRecipe);
exports.default = router;
