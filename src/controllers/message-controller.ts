import service from "../services/message-service";
import { RequestHandler } from "express";

class OrderController {
  constructor() {}

  static addMessage: RequestHandler = async (req, res) => {
    try {
      
      const result = await service.add(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static getAllMessage: RequestHandler = async (_req, res) => {
    try {
      const result = await service.getAll();
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  
}

export default OrderController;
