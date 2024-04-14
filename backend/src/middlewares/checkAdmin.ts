import { Express, Request, Response, NextFunction } from "express";
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';


const userRepository = AppDataSource.getRepository(User);

export default async(req:Request, res:Response, next:NextFunction) =>{
    
    let user = await userRepository.findOneBy({
        id: req.body.userId,
    });
    
    if(!user){
        return res.status(403).json({success:false, message:"Access denied."});
    }
    if(!user.isAdmin){
        return res.status(403).json({success:false, message:"Access denied."});
    }
    next();
}