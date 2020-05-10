import Recipe from "../models/recipe";
import { recipeData } from "../interfaces/recipeData";

const add = async function (data: {
  name: string;
}) {
  const pet = new Recipe(data);
  await pet.save();
  return pet;
};



const get = async function (id: string) {
  return await Recipe.findById(id);
};

const getAll = async function () {
  return await Recipe.find({});
};

const update = async function (data: recipeData) {
  return await Recipe.findByIdAndUpdate(data.id, data, { new: true });
};

const updateAll = async function (data: recipeData[]) {
  
  await Recipe.deleteMany({})
  return await Recipe.insertMany(data)

};

const del = async function (id: string) {
  return await Recipe.findByIdAndDelete(id);
};



export default {
  add,
  get,
  update,
  del,
  getAll,
  updateAll
};
