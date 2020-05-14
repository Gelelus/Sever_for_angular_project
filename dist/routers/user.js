"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = __importDefault(require("../middleware/validation"));
const create_user_dto_1 = __importDefault(require("../dtos/create-user.dto"));
const login_user_dto_1 = __importDefault(require("../dtos/login-user.dto"));
const auth_1 = __importDefault(require("../middleware/auth"));
const uploadAvatar_1 = __importDefault(require("../middleware/uploadAvatar"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const router = express_1.Router();
router.post("/", validation_1.default(create_user_dto_1.default), user_controller_1.default.addUser);
router.post("/upload/avatar", auth_1.default, uploadAvatar_1.default, user_controller_1.default.addAvatarToUser);
router.delete("/:id", auth_1.default, user_controller_1.default.deleteUser);
router.put("/", auth_1.default, user_controller_1.default.updateUser);
router.get("/:id", auth_1.default, user_controller_1.default.getUser);
router.get("/", auth_1.default, user_controller_1.default.getAllUser);
router.post("/recipe/bind", auth_1.default, user_controller_1.default.bindRecipeToUser);
router.post("/recipe", auth_1.default, user_controller_1.default.addRecipeToUser);
router.get("/recipe/:id", auth_1.default, user_controller_1.default.getUserWithRecipes);
router.post("/login", validation_1.default(login_user_dto_1.default), user_controller_1.default.login);
exports.default = router;
