import { Router } from "express";

import OrderController from "../controllers/order-controller";

const router = Router();

router.get("/:id", OrderController.getOrder); // получение одного

router.post("/",  OrderController.addOrder); //добавление

router.put("/",  OrderController.updateOrder); // изменение

router.delete("/:id", OrderController.deleteOrder); // удаление

export default router;
