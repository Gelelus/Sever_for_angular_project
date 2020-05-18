import Recipe from "../models/recipe";
import { IUserDocument } from "../interfaces/IUserDocument";
import fs from "fs";

const add = async function (
  data: { name: string; description: string; ingredients: string },
  user: IUserDocument,
  file: Express.Multer.File
) {
  const ingredients = JSON.parse(data.ingredients);

  const recipe = new Recipe({
    name: data.name,
    description: data.description,
    ingredients: ingredients,
    imagePath: "img/recipes/" + file.filename,
  });

  await recipe.save();
  user.recipes.push(recipe._id);
  await user.save();
  return recipe;
};

const get = async function (id: string) {
  return await Recipe.findById(id);
};

const getAll = async function (params: { startItem: number; limit: number }) {
  const maxRecipes = await Recipe.countDocuments();
  const recipes = await Recipe.find()
    .skip(+params.startItem)
    .limit(+params.limit);

  return { recipes, maxRecipes };
};

const update = async function (
  data: {
    name: string;
    description: string;
    ingredients: string | { name: string; amount: number }[];
    _id: string;
  },
  user: IUserDocument,
  file: Express.Multer.File
) {
  if (user && !user.recipes.includes(data._id)) {
    throw Error("You do not have edit access to this recipe.");
  }

  if (file && typeof data.ingredients === "string") {
    const ingredients = JSON.parse(data.ingredients);

    const recipe = await Recipe.findById(data._id);
    if (!recipe) {
      throw Error("Recipe doesn't exist");
    }

    fs.unlinkSync("public/" + recipe.imagePath);

    recipe.name = data.name;
    recipe.description = data.description;
    recipe.ingredients = ingredients;
    recipe.imagePath = "img/recipes/" + file.filename;

    return await recipe.save();
  } else {
    return await Recipe.findByIdAndUpdate(data._id, data, { new: true });
  }
};

const del = async function (id: string, user: IUserDocument) {
  if (!user.recipes.includes(id)) {
    throw Error("You do not have permission to delete this recipe.");
  }
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw Error("Recipe doesn't exist");
  }
  
  fs.unlinkSync("public/" + recipe.imagePath);

  await recipe.remove();
  user.recipes = user.recipes.filter((resId) => resId !== id);
  await user.save();
  return { id };
};

export default {
  add,
  get,
  update,
  del,
  getAll,
};
