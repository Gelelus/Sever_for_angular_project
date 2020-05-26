import { Router } from "express";

import MessageController from "../controllers/message-controller";

const router = Router();

router.get("/", MessageController.getAllMessage); // получение

router.post("/",  MessageController.addMessage); //добавление



export default router;
