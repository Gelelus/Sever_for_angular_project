import { Document } from "mongoose";

export interface IOrderDocument extends Document {

  ingredients: { name: string; amount: number }[];
 
}
