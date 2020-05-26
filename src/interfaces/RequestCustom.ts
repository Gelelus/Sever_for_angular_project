import { IUserDocument } from '../interfaces/IUserDocument';
import socketIo from "socket.io";

declare global {
    namespace Express {
      interface Request {
        user: IUserDocument,
        io: socketIo.Server
      }
    }
  }
