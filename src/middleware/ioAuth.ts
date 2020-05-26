import jwt from "jsonwebtoken";
import { DataStoredInToken } from "../interfaces/dataStoredInToken";
import User from "../models/user";



const authIO = async (socket: SocketIO.Socket, next: (err?: any) => void) => {
  try {
    if (socket.handshake.query && socket.handshake.query.token) {
      
      const decoded = jwt.verify(
        socket.handshake.query.token,
        "expressapp"
      ) as DataStoredInToken;

      const user = await User.findOne({ _id: decoded._id });

      if (!user) {
        throw new Error();
      }
      socket.user = user;

      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    next(new Error("Authentication error"));
  }
};

export default authIO;
