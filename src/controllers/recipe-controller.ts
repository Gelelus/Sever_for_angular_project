import service from "../services/recipe-service";
import { RequestHandler } from "express";

class RecipeController {
  constructor() {}

  static addRecipe: RequestHandler = async (req, res) => {
    try {
      
      const result = await service.add(req.body, req.user, req.file);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static deleteRecipe: RequestHandler = async (req, res) => {
    try {
      const result = await service.del(req.params.id, req.user);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static updateRecipe: RequestHandler = async (req, res) => {
    try {
      const result = await service.update(req.body, req.user, req.file);
      res.status(201).send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

 

  static getRecipe: RequestHandler = async (req, res) => {
    try {
      const result = await service.get(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  static getAllRecipe: RequestHandler = async (req, res) => {
    try {
      const result = await service.getAll(req.query);
      res.send(result);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };
}

export default RecipeController;
