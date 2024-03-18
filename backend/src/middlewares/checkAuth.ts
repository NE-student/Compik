import jwt, {Secret, JwtPayload} from "jsonwebtoken";
import { Express, Request, Response, NextFunction } from "express";

export default (req:Request, res:Response, next:NextFunction) =>{
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, '');
    if(token){
        
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
            req.body.id = decoded.id;
            next();
        }
        catch(err){
            
            return res.status(403).json({success:false, message:"Access denied.", err});
        }
    }
    else{
        return res.status(403).json({success:false, message:"Access denied."});
    }
}