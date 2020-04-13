import { Router } from "express"

import validation from "../middleware/validation";
import validCreateUser from "../dtos/create-user.dto"; 
import validLoginUser from "../dtos/login-user.dto";   

import auth from "../middleware/auth";
import avatarUpload from "../middleware/uploadAvatar"

import UserController from "../controllers/user-controller";
const user_controller = new UserController();

const router = Router();

router.post("/", validation(validCreateUser),  user_controller.addUser); //регистрация

router.post("/upload/avatar", auth, avatarUpload, user_controller.addAvatarToUser); // загрузка аватара для пользователя

router.delete("/:id", auth, user_controller.deleteUser); // удаление пользователя
router.put("/", auth, user_controller.updateUser); // изменение пользователя
router.get("/:id", auth, user_controller.getUser); // получение одного пользователя
router.get("/", auth, user_controller.getAllUser); // получение всех пользователей

router.post("/pet", auth, user_controller.addPetToUser); // привязка питомца к пользователю
router.get("/pet/:id", auth, user_controller.getUserWithPets); // получение всех питомцов пользователя

router.post("/login",validation(validLoginUser) , user_controller.login); //авторизация
router.post("/logout", auth, user_controller.logout); //выход // посути не нужен т.к. используется jwt

export default router;
