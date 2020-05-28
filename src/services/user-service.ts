import fs from "fs";

import { File } from "../interfaces/MulterFileFilter";
import { IUserDocument } from "../interfaces/IUserDocument";
import User from "../models/user";
import Recipe from "../models/recipe";
import { recipeData } from "../interfaces/recipe.model";

const add = async function (data: { password: string; email: string }) {
  const userTest = await User.findOne({ email: data.email });
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
    avatarUrl: user.avatarImg,
    firstName: user.firstName,
    secondName: user.secondName,
    date: user.date,
    phoneNumber: user.phoneNumber,
  };
};

const get = async function (id: string) {
  let user = await User.findById(id);
  if (!user) {
    throw new Error("user doesn't exists");
  }
  return {
    email: user.email,
    avatarImg: user.avatarImg,
    firstName: user.firstName,
    secondName: user.secondName,
    date: user.date,
    phoneNumber: user.phoneNumber,
    recipes: user.recipes,
  };
};

const getAll = async function () {
  return await User.aggregate([
    { $match: {} },
    {
      $project: {
        avatarImg: 1,
        firstName: 1,
        secondName: 1,
        date: 1,
        phoneNumber: 1,
        email: 1,
        recipes: 1,
      },
    },
  ]);
};

const update = async function (
  data: {
    firstName: string;
    passwords: { password: string; secondPassword: string };
    phoneNumber: string;
    secondName: string;
  },
  user: IUserDocument
) {
  user.firstName = data.firstName;
  user.secondName = data.secondName;
  user.phoneNumber = data.phoneNumber;
  if (data.passwords.password) {
    user.password = data.passwords.password;
  }

  const token = await user.generateAuthToken();
  await user.save();
  return {
    idToken: token,
    localId: user._id,
    email: user.email,
    expiresIn: 3600,
    avatarUrl: user.avatarImg,
    firstName: user.firstName,
    secondName: user.secondName,
    date: user.date,
    phoneNumber: user.phoneNumber,
  };
};

const del = async function (id: string) {
  return await User.findByIdAndDelete(id);
};

const login = async function (data: { password: string; email: string }) {
  const user = await User.findByCredentials(data.email, data.password);

  const token = await user.generateAuthToken();

  return {
    idToken: token,
    localId: user._id,
    email: user.email,
    expiresIn: 3600,
    avatarUrl: user.avatarImg,
    firstName: user.firstName,
    secondName: user.secondName,
    date: user.date,
    phoneNumber: user.phoneNumber,
  };
};

const addRecipe = async function (user: IUserDocument, data: recipeData) {
  const recipe = new Recipe(data);
  await recipe.save();
  user.recipes.push(recipe._id);
  await user.save();
  return recipe;
};

const bindRecipe = async function (
  user: IUserDocument,
  data: { name: string }
) {
  const recipe = await Recipe.findOne({ name: data.name });
  if (!recipe) {
    throw new Error("Recipe doesn't exist");
  }

  user.recipes.push(recipe._id);
  await user.save();

  return { user, recipe };
};

const addAvatar = async function (file: File, user: IUserDocument) {
  if (user.avatarImg !== "img/avatars/avatar.png") {
    fs.unlinkSync("public/" + user.avatarImg);
  }

  user.avatarImg = "img/avatars/" + file.filename;
  await user.save();

  return { imgUrl: "img/avatars/" + file.filename };
};

const getOrders = async function (user: IUserDocument) {
  return (await user.populate("orders").execPopulate()).orders;
};

const getRecipes = async function (user: IUserDocument) {
  return (await user.populate("recipes").execPopulate()).recipes;
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
  getOrders,
};
