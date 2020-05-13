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
    required: true,
    trim: true,
  },
  ingredients: [{name: String, amount: Number}]
});

export default model<IRecipeDocument>("Recipe", recipeSchema);
