import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { CountProperty } from "../../../entity/Properties/CountProperties/CountProperty";
import { validationResult } from "express-validator";


const CountPropertyRepository = AppDataSource.getRepository(CountProperty);

export const getCountProperty = async(req: Request, res: Response) =>{
    const id = +(req.params.id)

    const property = await CountPropertyRepository.findOneBy({
        id: id
    })

    if(!property){
        return res.status(404).json({success:false, message: "Property wasn't found"})
    }
    
    const propertyData = {
        name: property.name,
        mainCategory: property.mainCategory,
        impactCategory: property.impactCategory,
        impactProperty: property.impactProperty,
        components: property.components,
    }

    return res.status(200).json({success: true, ...propertyData})
}

export const createCountProperty = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        const property = new CountProperty();
        property.name = req.body.Name;
        property.mainCategory = req.body.MainCategory;
        property.impactCategory = req.body.ImpactCategory;
        property.impactProperty = req.body.ImpactProperty;
        

        await CountPropertyRepository.save(property);

        return res.status(201).json({
            success:true,
            id: property.id,
            name: property.name,
            mainCategory: property.mainCategory,
            impactCategory: property.impactCategory,
            impactProperty: property.impactProperty,
            components: property.components,
            
    });
    }
    catch(err:any){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail});
    }
}

export const updateCountProperty = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const id = +(req.params.id)
    const property = await CountPropertyRepository.save({
        id: id,
        name: req.body.Name,
        mainCategory : req.body.MainCategory,
        impactCategory : req.body.ImpactCategory,
        impactProperty : req.body.ImpactProperty,
    });
    
    return res.status(200).json({
        success:true,
        id: property.id,
        name: property.name,
        mainCategory: property.mainCategory,
        impactCategory: property.impactCategory,
        impactProperty: property.impactProperty,
        components: property.components,
    });
}

export const removeCountProperty = async(req: Request, res: Response) =>{
    const id = +(req.params.id);
    try{
        await CountPropertyRepository.delete({
            id: id
        });
        return res.status(200).json({
            success:true
        });
    }
    catch(err:any){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail});
    }
}

export const getCountProperties =  async (req:Request, res:Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 10;
    const properties = 
        await CountPropertyRepository
        .createQueryBuilder("CountProperty")
        .leftJoinAndSelect("CountProperty.mainCategory", "mainCategory")
        .leftJoinAndSelect("CountProperty.impactCategory", "impactCategory")
        .leftJoinAndSelect("CountProperty.impactProperty", "impactProperty")
        .leftJoinAndSelect("CountProperty.components", "components")
        .limit(itemsPerPage).offset((page - 1) * itemsPerPage)
        .orderBy("CountProperty.id")
        .getMany();

    if(!properties){
        return res.status(404).json({success:false, message: "Properties were not found"})
    }

    var json = JSON.stringify({data:properties, page, success:true});
    res.writeHead(200, {'content-Property':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
};

