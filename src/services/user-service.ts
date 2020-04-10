import User from "../models/user";
import Pet from "../models/pet";

const add = async function (data: {
  password: string;
  age: number;
  name: string;
}) {
  const user = new User(data);
  await user.save();
  return user;
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

const login = async function (data: { password: string; name: string }) {
  const user = await User.findByCredentials(data.name, data.password); //статик метод из model проверка хэша и логина

  const token = await user.generateAuthToken(); // генерация токена

  return { user, token };
};

const getPets = async function (id: string) {
  const userWithPets = await User.findById(id)
                                 .populate("pets")
                                 
  return userWithPets;
};

const addPet = async function (data: { id: string; name: string }) { //привязка питомца к пользователю
  
  const pet = await Pet.findOne({name: data.name}); //проверка есть ли питомец в базе
  if (!pet) {
    throw new Error("Pet doesn't exist");
  }
  const user = await User.findById(data.id); 
  if (!user) {
    throw new Error("User doesn't exist");
  }
  user.pets.push(pet._id); //привязка питомца к пользователю
  user.save();
 
  return { user, pet };
};

export default {
  add,
  get,
  update,
  del,
  getAll,
  login,
  getPets,
  addPet,
};
