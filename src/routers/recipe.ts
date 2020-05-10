import { Router } from "express";

// import validation from "../middleware/validation";
// import validCreateRecipe from "../dtos/create-recipe.dto";

import auth from "../middleware/auth";

import RecipeController from "../controllers/recipe-controller";

const router = Router();

router.post("/", auth, RecipeController.addRecipe); //добавление

router.put("/update", auth, RecipeController.updateRecipes); //полное обновление

router.delete("/:id", auth, RecipeController.deleteRecipe); // удаление
router.put("/", auth, RecipeController.updateRecipe); // изменение
router.get("/:id", auth, RecipeController.getRecipe); // получение одного
router.get("/", auth, RecipeController.getAllRecipe); // получение всех

export default router;
