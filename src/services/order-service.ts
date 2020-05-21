import Order from "../models/order";
import { IUserDocument } from "../interfaces/IUserDocument";


const add = async function (
  data: { name: string; amount: number }[] ,
  user: IUserDocument
) {
   
  const order = new Order({
    ingredients: data,
  });
  await order.save();
  user.orders.push(order._id);
  await user.save();
  return {ok:"all ok"};
};

const get = async function (id: string) {
  return await Order.findById(id);
};

const update = async function (
  data: { ingredients: { name: string; amount: number }[]; _id: string },
  user: IUserDocument
) {
  if (user && !user.orders.includes(data._id)) {
    throw Error("You do not have edit access to this recipe.");
  }

  return await Order.findByIdAndUpdate(data._id, data, { new: true });
};

const del = async function (id: string, user: IUserDocument) {
  if (!user.orders.includes(id)) {
    throw Error("You do not have permission to delete this order.");
  }
  const order = await Order.findById(id);
  if (!order) {
    throw Error("Recipe doesn't exist");
  }

  await order.remove();
  
  return { id };
};

export default {
  add,
  get,
  update,
  del,
};
