import { Router } from "express"

import validation from "../middleware/validation";
import validCreateUser from "../dtos/registration.dto"; 
import validLoginUser from "../dtos/login.dto";   
import auth from "../middleware/auth";
import avatarUpload from "../middleware/uploadAvatar"
import UserController from "../controllers/user-controller";


const router = Router();

router.get("/:id", UserController.getUser); 
router.get("/", UserController.getAllUser); 
router.get("/get/recipes", auth, UserController.getUserRecipes); 
router.get("/get/orders", auth,UserController.getUserOrders)

router.post("/", validation(validCreateUser),  UserController.addUser); 
router.post("/recipe/bind", auth, UserController.bindRecipeToUser); 
router.post("/recipe", auth, UserController.addRecipeToUser); 
router.post("/login",validation(validLoginUser) , UserController.login); 

router.put("/", auth, UserController.updateUser); 
router.put("/avatar", auth, avatarUpload, UserController.addAvatarToUser); 

router.delete("/:id", auth, UserController.deleteUser); 

export default router;
