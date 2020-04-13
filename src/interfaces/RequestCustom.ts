import { IUserDocument } from '../interfaces/IUserDocument';
declare global {
    namespace Express {
      interface Request {
        user: IUserDocument
      }
    }
  }
