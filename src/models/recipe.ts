import { Schema, model } from "mongoose";
import { IRecipeDocument } from "../interfaces/IRecipeDocument";

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
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

export default model<IRecipeDocument>("Recipe", recipeSchema);
