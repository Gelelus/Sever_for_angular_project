import { Schema, model } from "mongoose";
import { IRecipeDocument } from "../interfaces/IRecipeDocument";
import User from "../models/user";

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    text: true 
  },
  description: {
    type: String,
    required: true,
    trim: true,
    text: true 
  },
  imagePath: {
    type: String,
    default: "img/avatars/index.jpg",
    trim: true,
  },
  ingredients: [{ name: String, amount: Number }],
  date: { type: Date, default: Date.now },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

recipeSchema.pre("remove", function (next) {
  User.updateMany(
    { recipes: this._id },
    { $pull: { recipes: this._id } },
    { multi: true }
  ).exec();
  next();
});

export default model<IRecipeDocument>("Recipe", recipeSchema);
