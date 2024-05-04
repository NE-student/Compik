import multer from "multer";
import { Express, Request, Response } from "express";
const { checkAdmin, checkAuth } = require("../middlewares/index");

const storage = multer.diskStorage({
    destination: (_, __, callback) =>{
        callback(null, "uploads")
    },
    filename: (_, file, callback) =>{
        callback(null, file.originalname)
    }
})

const uploader = multer({storage});

export const upload = (app: Express) =>{
    app.post('/upload', checkAuth, checkAdmin, uploader.single("image"), (req: Request, res: Response) => {
        
        if(!req.file) return res.json({success:false});

        res.json({
            url: `/uploads/${req.file.originalname}`
        });
    })
}