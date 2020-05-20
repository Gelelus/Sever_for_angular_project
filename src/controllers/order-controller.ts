import service from "../services/order-service";
import { RequestHandler } from "express";

class OrderController {
  constructor() {}

  static addOrder: RequestHandler = async (req, res) => {
    try {
      
      const result = await service.add(req.body, req.user);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static deleteOrder: RequestHandler = async (req, res) => {
    try {
      const result = await service.del(req.params.id, req.user);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static updateOrder: RequestHandler = async (req, res) => {
    try {
      const result = await service.update(req.body, req.user);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

 

  static getOrder: RequestHandler = async (req, res) => {
    try {
      const result = await service.get(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  
}

export default OrderController;
