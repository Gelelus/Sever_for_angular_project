import { Router } from "express"

import validation from "../middleware/validation";
import validCreateUser from "../dtos/create-user.dto"; 
import validLoginUser from "../dtos/login-user.dto";   

import auth from "../middleware/auth";
import avatarUpload from "../middleware/uploadAvatar"

import UserController from "../controllers/user-controller";


const router = Router();

router.post("/", validation(validCreateUser),  UserController.addUser); //регистрация

router.post("/upload/avatar", auth, avatarUpload, UserController.addAvatarToUser); // загрузка аватара для пользователя

router.delete("/:id", auth, UserController.deleteUser); // удаление пользователя
router.put("/", auth, UserController.updateUser); // изменение пользователя
router.get("/:id", auth, UserController.getUser); // получение одного пользователя
router.get("/", auth, UserController.getAllUser); // получение всех пользователей

router.post("/recipe/bind", auth, UserController.bindRecipeToUser); // привязка сторонего рецепта
router.post("/recipe", auth, UserController.addRecipeToUser); // добавление рецепта юсера


router.post("/recipes", auth, UserController.addRecipesToUser); // добавление рецептов юсеру
router.get("/recipe/:id", auth, UserController.getUserWithRecipes); // 

router.post("/login",validation(validLoginUser) , UserController.login); //авторизация


export default router;
