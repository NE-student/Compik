import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Type } from "../entity/Type";
import { validationResult } from "express-validator";
import { PropertyToType } from "../entity/PropertyToType";

const typeRepository = AppDataSource.getRepository(Type);

export const getType = async(req: Request, res: Response) =>{
    const id = +(req.params.id)

    const type = await typeRepository.findOneBy({
        id: id
    })

    if(!type){
        return res.status(404).json({success:false, message: "Type wasn't found"})
    }
    const typeData = {
        name: type.Name,
        propertiesToType: type.propertyToTypes
    }

    return res.status(200).json({success: true, ...typeData})
}

export const createType = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
    const type = new Type();
    type.Name = req.body.Name;

    await typeRepository.save(type);

    return res.status(201).json({
        success:true,
        type: {
            id: type.id,
            Name: type.Name,
            values: type.propertyToTypes        
        }
    });
    }
    catch(err:any){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail});
    }
}

export const updateType = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const id = +(req.params.id)
    const type = await typeRepository.save({
        id: id,
        Name: req.body.Name
    });
    
    return res.status(200).json({
        success:true,
         id: type.id,
        Name: type.Name
    });
}

export const removeType = async(req: Request, res: Response) =>{
    const id = +(req.params.id);
    await typeRepository.delete({
        id: id
    });
    return res.status(200).json({
        success:true
    });
}

export const getTypes =  async (req:Request, res:Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 5;
    // await sleep(5000);
    const types = await typeRepository.createQueryBuilder("Type").limit(itemsPerPage).offset((page - 1) * itemsPerPage).getMany();

    if(!types){
        return res.status(404).json({success:false, message: "Types were not found"})
    }

    var json = JSON.stringify({data:types, page, success:true});
    res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
};

// function sleep(ms:number) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
//   }