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
        property.Name = req.body.Name;
        property.Description = req.body.Description;
        property.type = req.body.type;
        property.category = req.body.category;
        property.isCountable = req.body.isCountable || false
        
        

        await ComparePropertyRepository.save(property);

        return res.status(201).json({
            success:true,
            id: property.id,
            name: property.Name,
            values: property.values,
            components: property.components,
            type: property.type,
            category: property.category,
            isCountable: property.isCountable
            
            
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
        Name: req.body.Name,
        Description: req.body.Description,
        type : req.body.type,
        category : req.body.category,
        isCountable: req.body.isCountable
    });
    
    return res.status(200).json({
        success:true,
        id: property.id,
        Description: property.Description,
        name: property.name,
        values: property.values,
        components: property.components,
        type: property.type,
        category: property.category,
        isCountable: property.isCountable
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
    const itemsPerPage = 10;
    const skip = (itemsPerPage * page) - itemsPerPage;
    const properties = 
        await ComparePropertyRepository.find({
            relations:{
                type: true,
                category: true,
                impactCategories: {
                    category: true
                },
                values: true
            },
            take: itemsPerPage,
            skip,
        });
    
    if(!properties){
        return res.status(404).json({success:false, message: "Properties were not found"})
    }

    var json = JSON.stringify({data:properties, page, success:true});
    res.writeHead(200, {'content-Property':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
};

export const getComparePropertiesByCategory = async (req: Request, res:Response) => {
    try{
        let componentProperties =
            await ComparePropertyRepository.createQueryBuilder("CompareProperty")
            .leftJoinAndSelect("CompareProperty.type", "type")
            .leftJoinAndSelect("CompareProperty.category", "category")
            .leftJoinAndSelect("CompareProperty.impactCategories", "impactCategories")
            .leftJoinAndSelect("impactCategories.category", "impactCategory")
            .leftJoinAndSelect("CompareProperty.values", "values")
            .where("category.id = :id OR impactCategory.id = :id", { id: req.params.category})
            .orderBy("CompareProperty.id")
            .getMany();
        
        if(!componentProperties || componentProperties.length == 0){
            return res.status(404).json({success:false, message: "Component's properties were not found"})
        }
    
        var json = JSON.stringify({data:componentProperties, success:true});
        res.writeHead(200, {'content-Property':'application/json', 'content-length':Buffer.byteLength(json)}); 
        res.end(json);
    }catch(err:any){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail});
    }

}

