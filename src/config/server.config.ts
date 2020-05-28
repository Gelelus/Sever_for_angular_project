import mongoose from "mongoose";
import dotenv from "dotenv";
import authIO from "../middleware/ioAuth";
import { IUserDocument } from "../interfaces/IUserDocument";

declare global {
  namespace SocketIO {
    interface Socket {
      user: IUserDocument;
    }
  }
}

export class ServerConfiguration {
  static mongoDB() {
    dotenv.config();

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
       State of connection to DB- ${mongoose.connection.readyState} 
       0 = disconnected
       1 = connected
       2 = connecting 
       3 = disconnecting
      `
        )
      );
  }

  static chat(io: SocketIO.Server) {
    io.use(authIO).on("connection", (socket) => {
      console.log("user connected");

      socket.on("disconnecting", () => {
        console.log("user disconnected");
      });

      socket.on("new-message", (message) => {
        console.log(message);
        io.emit("new-message", {
          message: message,
          img: socket.user.avatarImg,
          email: socket.user.email,
          date: Date.now(),
        });
      });
    });
  }
}
