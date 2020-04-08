import User from "../models/user";

const add = async function (data: {
  password: string;
  age: number;
  name: string;
}) {
  const user = new User(data); 
  await user.save();
  return user;
};

const get = async function (id: string)  {
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

const del = async function (id : string) {
  return await User.findByIdAndDelete(id);
};

const login = async function (data: {
    password: string;
    name: string;
  }) {

 
  const user = await User.findByCredentials(data.name, data.password); //статик метод из model проверка хэша и логина

  const token = await user.generateAuthToken(); // генерация токена

  return { user, token };
};

export default {
  add,
  get,
  update,
  del,
  getAll,
  login,
};
