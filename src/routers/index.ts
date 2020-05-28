import { Router } from "express";
import express from "express";

import * as router from "./export-router";
import auth from "../middleware/auth";
import options from "../middleware/options";


const mainRouter = Router();

mainRouter.use(express.json());
mainRouter.use(options);
mainRouter.use(express.static(process.cwd() + "/public"));
mainRouter.use("/users", router.userRouter);
mainRouter.use("/recipes", auth, router.recipeRouter);
mainRouter.use("/orders", auth, router.orderRouter);
mainRouter.use("/messages", auth, router.messageRouter);

export default mainRouter;
