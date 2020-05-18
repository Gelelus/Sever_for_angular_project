import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import options from "./middleware/options";
import * as router from "./routers/export-router";
import auth from "./middleware/auth";

dotenv.config(); //env reader

if (!process.env.MONGO_DB) {
  throw new Error("please create .env file as .env.example");
}
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(
      `
       State of connection - ${mongoose.connection.readyState} 
       0 = disconnected
       1 = connected
       2 = connecting 
       3 = disconnecting
      `
    )
  );

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(options);
app.use("/users", router.userRouter);
app.use("/recipes", auth, router.recipeRouter);
app.use(express.static(process.cwd() + "/public"));

app.listen(port, () => {
  console.log("server on port " + port);
});
