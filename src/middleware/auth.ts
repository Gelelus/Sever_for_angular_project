import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {DataStoredInToken} from '../interfaces/dataStoredInToken';

const auth : RequestHandler = async (req, res, next) => {
    try{
        
        const header = req.header('Authorization')
        if(!header){throw new Error}
        
        const token = header.replace('Bearer ', '');
        console.log(token)
     

        const decoded  = jwt.verify(token, 'expressapp') as DataStoredInToken; 
        
        const user = await User.findOne({_id: decoded._id});
        
        if(!user){
            throw new Error
        }


        next()
    } catch (e) {
        res.status(401).send({error: 'Please autentificate'})
    }
}

export default auth
