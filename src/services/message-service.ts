import Message from "../models/message";

const add = async function (data: { name: string; message: string }) {
  const message = new Message(data);
  return message.save();
};

const getAll = async function () {
  return await Message.find({});
};

export default {
  add,
  getAll,
};
