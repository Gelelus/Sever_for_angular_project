import Recipe from "../models/recipe";
import { recipeData } from "../interfaces/recipeData";
import { IUserDocument } from "../interfaces/IUserDocument";

const add = async function (data: recipeData, user: IUserDocument) {
  
  const recipe = await new Recipe(data);
  await recipe.save();
  user.recipes.push(recipe._id);
  await user.save();
  return recipe;

};

const get = async function (id: string) {
  return await Recipe.findById(id);
};

const getAll = async function () {
  return await Recipe.find({});
};

const update = async function (data: recipeData, user: IUserDocument) {
  if(!user.recipes.includes(data._id)){
    throw Error("You do not have edit access to this recipe.")
  }
  return await Recipe.findByIdAndUpdate(data._id, data, { new: true });
};

const updateAll = async function (data: recipeData[]) {
  
  await Recipe.deleteMany({})
  return await Recipe.insertMany(data)

};

const del = async function (id: string, user: IUserDocument) {
  if(!user.recipes.includes(id)){
    throw Error("You do not have permission to delete this recipe.")
  }
  await Recipe.findByIdAndDelete(id);
  return {id}
};



export default {
  add,
  get,
  update,
  del,
  getAll,
  updateAll
};
