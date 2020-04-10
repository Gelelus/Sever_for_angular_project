import Pet from "../models/pet";

const add = async function (data: {
  name: string;
}) {
  const pet = new Pet(data);
  await pet.save();
  return pet;
};

const get = async function (id: string) {
  return await Pet.findById(id);
};

const getAll = async function () {
  return await Pet.find({});
};

const update = async function (data: {
  id: string;
  name: string;
}) {
  return await Pet.findByIdAndUpdate(data.id, data, { new: true });
};

const del = async function (id: string) {
  return await Pet.findByIdAndDelete(id);
};



export default {
  add,
  get,
  update,
  del,
  getAll
};
