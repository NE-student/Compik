import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { validationResult } from "express-validator";
import { CompareProperty } from "../../../entity/Properties/CompareProperties/CompareProperty";
import { ComparePropertyImpactCategory } from "../../../entity/Properties/CompareProperties/ComparePropertyImpactCategory";


const PropertyRepository = AppDataSource.getRepository(CompareProperty);
const PropertyImpactCategoryRepository = AppDataSource.getRepository(ComparePropertyImpactCategory)

export const getPropertyImpactCategory = async(req: Request, res: Response) =>{
    const id = +(req.params.id)

    const propertyImpactCategory = await PropertyImpactCategoryRepository.findOneBy({
        id: id
    })

    if(!propertyImpactCategory){
        return res.status(404).json({success:false, message: "Property value wasn't found"})
    }
    
    const propertyValueData = {
        property: propertyImpactCategory.property,
        category: propertyImpactCategory.category,
    }

    return res.status(200).json({success: true, ...propertyValueData})
}

export const createPropertyImpactCategory = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        const property = await PropertyRepository.findOneBy({
            id: req.body.id
        });
        if (!property) return res.status(404).json({success:false, message: "Property wasn't found"});

        const propertyImpactCategory = new ComparePropertyImpactCategory();
        propertyImpactCategory.category = req.body.categoryId;
        propertyImpactCategory.property = property

        await PropertyImpactCategoryRepository.save(propertyImpactCategory);

        return res.status(201).json({
            success:true,
            propertyValue: {
                id: propertyImpactCategory.id,
                property: propertyImpactCategory.property,
                category: propertyImpactCategory.category,
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

export const updatePropertyImpactCategory = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const id = +(req.params.id)
    const propertyValue = await PropertyImpactCategoryRepository.save({
        propertyValueId: id,
        category: req.body.categoryId
    });
    
    return res.status(200).json({
        success:true,
        id: propertyValue.propertyValueId,
        Value: propertyValue.value
    });
}

export const removePropertyImpactCategory = async(req: Request, res: Response) =>{
    const id = +(req.params.id);
    try{
        await PropertyImpactCategoryRepository.delete({
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

export const getPropertyImpactCategories =  async (req:Request, res:Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 10;

    let propertyValues;
    if(!req.body.id)
        propertyValues = await PropertyImpactCategoryRepository.createQueryBuilder("compareProperty_impactCategories").limit(itemsPerPage).offset((page - 1) * itemsPerPage).getMany();
    else
        propertyValues = 
        await PropertyImpactCategoryRepository
        .createQueryBuilder("compareProperty_impactCategories")
        .leftJoinAndSelect("compareProperty_impactCategories.property", "property")
        .where("property.id = :id", { id: req.body.id})
        .leftJoinAndSelect("compareProperty_impactCategories.category", "category")
        .getMany();

    if(!propertyValues){
        return res.status(404).json({success:false, message: "PropertyValues were not found"})
    }

    var json = JSON.stringify({data:propertyValues, page, success:true});
    res.writeHead(200, {'content-Property':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
};

