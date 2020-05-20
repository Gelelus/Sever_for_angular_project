import { Schema, model } from "mongoose";
import { IOrderDocument } from "../interfaces/IOrderDocument";

const orderSchema = new Schema({

  ingredients: [{ name: String, amount: Number }],

});

export default model<IOrderDocument>("Order", orderSchema);
