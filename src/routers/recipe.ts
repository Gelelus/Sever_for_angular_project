import { Router } from "express";

// import validation from "../middleware/validation";
// import validCreateRecipe from "../dtos/create-recipe.dto";

import Upload from "../middleware/uploadRecipe";
import RecipeController from "../controllers/recipe-controller";

const router = Router();

router.get("/:id", RecipeController.getRecipe); // получение одного
router.get("/", RecipeController.getAllRecipe); // получение всех

router.post("/", Upload, RecipeController.addRecipe); //добавление

router.put("/", Upload, RecipeController.updateRecipe); // изменение

router.delete("/:id", RecipeController.deleteRecipe); // удаление

export default router;
