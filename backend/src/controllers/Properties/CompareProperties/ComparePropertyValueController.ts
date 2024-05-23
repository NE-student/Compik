import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { validationResult } from "express-validator";
import { CompareProperty } from "../../../entity/Properties/CompareProperties/CompareProperty";
import { ComparePropertyValue } from "../../../entity/Properties/CompareProperties/ComparePropertyValue";


const PropertyRepository = AppDataSource.getRepository(CompareProperty);
const PropertyValueRepository = AppDataSource.getRepository(ComparePropertyValue)

export const getPropertyValue = async(req: Request, res: Response) =>{
    const id = +(req.params.id)

    const propertyValue = await PropertyValueRepository.findOneBy({
        id: id
    })

    if(!propertyValue){
        return res.status(404).json({success:false, message: "Property value wasn't found"})
    }
    
    const propertyValueData = {
        property: propertyValue.property,
        value: propertyValue.value,
    }

    return res.status(200).json({success: true, ...propertyValueData})
}

export const createPropertyValue = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        const property = await PropertyRepository.findOneBy({
            id: req.body.id
        });
        if (!property) return res.status(404).json({success:false, message: "Property wasn't found"});

        const propertyValue = new ComparePropertyValue();
        propertyValue.value = req.body.value;
        propertyValue.property = property

        await PropertyValueRepository.save(propertyValue);

        return res.status(201).json({
            success:true,
            propertyValue: {
                id: propertyValue.id,
                property: propertyValue.property,
                value: propertyValue.value,
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

export const updatePropertyValue = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const id = +(req.params.id)
    const propertyValue = await PropertyValueRepository.save({
        propertyValueId: id,
        value: req.body.value
    });
    
    return res.status(200).json({
        success:true,
        id: propertyValue.propertyValueId,
        Value: propertyValue.value
    });
}

export const removePropertyValue = async(req: Request, res: Response) =>{
    const id = +(req.params.id);
    try{
        await PropertyValueRepository.delete({
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

export const getPropertyValues =  async (req:Request, res:Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 10;

    let propertyValues;
    if(!req.body.id)
        propertyValues = await PropertyValueRepository.createQueryBuilder("compareProperty_values").limit(itemsPerPage).offset((page - 1) * itemsPerPage).getMany();
    else
        propertyValues = 
        await PropertyValueRepository
        .createQueryBuilder("compareProperty_values")
        .leftJoinAndSelect("compareProperty_values.property", "property")
        .where("property.id = :id", { id: req.body.id})
        .orderBy('compareProperty_values.id', 'ASC')
        .limit(itemsPerPage)
        .offset((page - 1) * itemsPerPage)
        .getMany();

    if(!propertyValues){
        return res.status(404).json({success:false, message: "PropertyValues were not found"})
    }

    var json = JSON.stringify({data:propertyValues, page, success:true});
    res.writeHead(200, {'content-Property':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
};

