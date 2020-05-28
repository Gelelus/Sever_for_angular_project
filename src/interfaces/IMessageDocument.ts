import { Document } from "mongoose";

export interface IMessageDocument extends Document {
  message: string;
  name: string;
}
