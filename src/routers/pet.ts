import { Router } from "express"

import validation from "../middleware/validation";
import validCreatePet from "../dtos/create-pet.dto"; 

import auth from "../middleware/auth";

import PetController from "../controllers/pet-controller";
const pet_controller = new PetController();

const router = Router();

router.post("/", validation(validCreatePet),  pet_controller.addPet); //добавление питомца

router.delete("/:id", auth, pet_controller.deletePet); // удаление
router.put("/", auth, pet_controller.updatePet); // изменение
router.get("/:id", auth, pet_controller.getPet); // получение одного
router.get("/", auth, pet_controller.getAllPet);    // получение всех

export default router;
