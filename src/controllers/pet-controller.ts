import service from "../services/pet-service";
import { RequestHandler } from "express";

class UserController {
  constructor() {}
  
  addPet: RequestHandler = async (req, res) => {
    try {
      const result = await service.add(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  deletePet: RequestHandler = async (req, res) => {
    try {
      const result = await service.del(req.params.id);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  updatePet: RequestHandler = async (req, res) => {
    try {
      const result = await service.update(req.body);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getPet: RequestHandler = async (req, res) => {
    try {
      const result = await service.get(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  getAllPet: RequestHandler = async (_req, res) => {
    try {
      const result = await service.getAll();
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

}

export default UserController;
