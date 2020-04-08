import { Router } from "express"

import validation from "../middleware/validation";
import validCreateUser from "../dtos/create-user.dto.js"; //non TS types
import validLoginUser from "../dtos/login-user.dto.js";   //non TS types

import auth from "../middleware/auth";

import UserController from "../controllers/user-controller";
const user_controller = new UserController();

const router = Router();

router.post("/", validation(validCreateUser),  user_controller.addUser); //регистрация

router.delete("/:id", auth, user_controller.deleteUser); // удаление
router.put("/", auth, user_controller.updateUser); // изменение
router.get("/:id", auth, user_controller.getUser); // юзера

router.get("/", auth, user_controller.getAllUser); //визуал
router.post("/login",validation(validLoginUser) , user_controller.login); //авторизация
router.post("/logout", auth, user_controller.logout); //выход

export default router;
