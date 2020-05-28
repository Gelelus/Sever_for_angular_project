import { Schema, model } from "mongoose";
import { IMessageDocument } from "../interfaces/IMessageDocument";


const mesageSchema = new Schema({
  name: String,
  message: String
});


export default model<IMessageDocument>("Message", mesageSchema);
