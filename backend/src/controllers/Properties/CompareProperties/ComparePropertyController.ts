import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { CompareProperty } from "../../../entity/Properties/CompareProperties/CompareProperty";
import { validationResult } from "express-validator";


const ComparePropertyRepository = AppDataSource.getRepository(CompareProperty);

export const getCompareProperty = async(req: Request, res: Response) =>{
    const id = +(req.params.id)

    const property = await ComparePropertyRepository.findOneBy({
        id: id
    })

    if(!property){
        return res.status(404).json({success:false, message: "Property wasn't found"})
    }
    
    const propertyData = {
        name: property.name,
        values: property.values,
        components: property.components,
        type: property.type,
        category: property.category,
        impactCategory: property.impactCategory,
    }

    return res.status(200).json({success: true, ...propertyData})
}

export const createCompareProperty = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        const property = new CompareProperty();
        property.name = req.body.Name;
        property.type = req.body.type;
        property.category = req.body.category;
        property.impactCategory = req.body.impactCategory;
        

        await ComparePropertyRepository.save(property);

        return res.status(201).json({
            success:true,
            id: property.id,
            name: property.name,
            values: property.values,
            components: property.components,
            type: property.type,
            category: property.category,
            impactCategory: property.impactCategory,
            
    });
    }
    catch(err:any){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail});
    }
}

export const updateCompareProperty = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const id = +(req.params.id)
    const property = await ComparePropertyRepository.save({
        id: id,
        name: req.body.Name,
        type : req.body.type,
        category : req.body.category,
        impactCategory : req.body.impactCategory,
    });
    
    return res.status(200).json({
        success:true,
        id: property.id,
        name: property.name,
        values: property.values,
        components: property.components,
        type: property.type,
        category: property.category,
        impactCategory: property.impactCategory,
    });
}

export const removeCompareProperty = async(req: Request, res: Response) =>{
    const id = +(req.params.id);
    try{
        await ComparePropertyRepository.delete({
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

export const getCompareProperties =  async (req:Request, res:Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 10;
    const properties = 
        await ComparePropertyRepository
        .createQueryBuilder("CompareProperty")
        .leftJoinAndSelect("CountProperty.category", "category")
        .leftJoinAndSelect("CountProperty.impactCategory", "impactCategory")
        .leftJoinAndSelect("CountProperty.values", "values")
        .leftJoinAndSelect("CountProperty.components", "components")
        .limit(itemsPerPage).offset((page - 1) * itemsPerPage)
        .orderBy("CompareProperty.id")
        .getMany();

    if(!properties){
        return res.status(404).json({success:false, message: "Properties were not found"})
    }

    var json = JSON.stringify({data:properties, page, success:true});
    res.writeHead(200, {'content-Property':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
};

