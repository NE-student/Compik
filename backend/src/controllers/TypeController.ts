import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Type } from "../entity/Type";
import { validationResult } from "express-validator";

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
        properties: type.properties
    }

    return res.status(200).json({success: true, ...typeData})
}

export const getTypes =  async (req:Request, res:Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 5;
    let types;
    if(page)
        types = await typeRepository.createQueryBuilder("Type").limit(itemsPerPage).offset((page - 1) * itemsPerPage).getMany();
    else
        types = await typeRepository.createQueryBuilder("Type").getMany();

    if(!types){
        return res.status(404).json({success:false, message: "Types were not found"})
    }

    var json = JSON.stringify({data:types, page, success:true});
    res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
};
