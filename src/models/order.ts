import { Schema, model } from "mongoose";
import { IOrderDocument } from "../interfaces/IOrderDocument";
import User from "../models/user";

const orderSchema = new Schema({
  ingredients: [{ name: String, amount: Number }],
});

orderSchema.pre("remove", function (next) {
  User.updateOne({ orders: this._id }, { $pull: { orders: this._id } }).exec();
  next();
});
export default model<IOrderDocument>("Order", orderSchema);
