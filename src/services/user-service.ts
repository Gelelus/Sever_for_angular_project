import { File } from "../interfaces/MulterFileFilter";
import { IUserDocument } from "../interfaces/IUserDocument";

import User from "../models/user";
import Recipe from "../models/recipe";
import { recipeData } from "../interfaces/recipeData";

const add = async function (data: { password: string; email: string }) {
  const userTest = await User.findOne({ email: data.email });//
  if (userTest) {
    throw new Error("Email already exists");
  } 
    const user = new User(data);

    const token = await user.generateAuthToken();
    await user.save();

    return {
      idToken: token,
      localId: user._id,
      email: user.email,
      expiresIn: 3600,
      avatarUrl: user.avatarImg
    };
  
};

const get = async function (id: string) {
  return await User.findById(id);
};

const getAll = async function () {
  return await User.find({});
};

const update = async function (data: {
  id: string;
  age: number;
  name: string;
}) {
  return await User.findByIdAndUpdate(data.id, data, { new: true });
};

const del = async function (id: string) {
  return await User.findByIdAndDelete(id);
};

const login = async function (data: { password: string; email: string }) {
  const user = await User.findByCredentials(data.email, data.password); //статик метод из model проверка хэша и логина

  const token = await user.generateAuthToken(); // генерация токена
  
  return {
    idToken: token,
    localId: user._id,
    email: user.email,
    expiresIn: 3600,
    avatarUrl: user.avatarImg
  };
};

const getRecipes = async function (id: string) {
  // получение всех рецептов пользователя
  const userWithRecipes = await User.findById(id).populate("recipes");

  return userWithRecipes;
};

const addRecipe = async function (user: IUserDocument, data: recipeData) {
  
  const recipe = await new Recipe(data);
  await recipe.save();
  user.recipes.push(recipe._id);
  await user.save();
  return recipe;
};

const bindRecipe = async function (
  user: IUserDocument,
  data: { name: string }
) {
  //привязка рецепта к пользователю
  const recipe = await Recipe.findOne({ name: data.name }); //проверка есть ли рицепт в базе
  if (!recipe) {
    throw new Error("Recipe doesn't exist");
  }

  user.recipes.push(recipe._id); //привязка рецепта
  await user.save();

  return { user, recipe };
};

const addAvatar = async function (file: File, user: IUserDocument) {
  user.avatarImg = "/public/img/avatars/" + file.filename;
  await user.save();
  return user;
};

export default {
  add,
  get,
  update,
  del,
  getAll,
  login,
  getRecipes,
  bindRecipe,
  addAvatar,
  addRecipe,
};
