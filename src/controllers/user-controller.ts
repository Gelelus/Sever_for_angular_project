import service from '../services/user-service'
import { RequestHandler } from "express";

class UserController {
    constructor(){}
    addUser : RequestHandler  = async (req, res) => {
        try {
            const result = await service.add(req.body)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    deleteUser : RequestHandler  = async (req, res) => {
        try {
            const result = await service.del(req.params.id)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    updateUser : RequestHandler  = async (req, res) => {
        try {
            const result = await service.update(req.body)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    
    getUser : RequestHandler  = async (req, res) => {
        try {
            const result = await service.get(req.params.id)
            res.send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    getAllUser : RequestHandler  = async (_req, res) => {
        try {
            const result = await service.getAll()
            res.send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }

    login : RequestHandler  = async (req, res) => {      
        try {
            const result = await service.login(req.body)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }

    logout : RequestHandler  =  async (_req, res) => {
        try {
            
            res.send({responce: "successfully logout"})
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    
}

export default UserController;
