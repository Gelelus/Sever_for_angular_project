import express from "express";
import * as router from "./routers/export-router";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); //env reader

if(!process.env.MONGO_DB){throw new Error('please create .env file as .env.example')}
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
app.use("/users", router.userRouter);
app.use(express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log("server on port " + port);
});
