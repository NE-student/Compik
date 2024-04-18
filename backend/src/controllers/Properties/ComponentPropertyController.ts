import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { validationResult } from "express-validator";
import { Property } from "../../entity/Properties/Property";
import { PropertyValues } from "../../entity/Properties/PropertyValues";
import { ComponentProperty } from "../../entity/Properties/ComponentProperty";
import { Component } from "../../entity/Сomponent";

const propertyRepository = AppDataSource.getRepository(Property);
const propertyValueRepository = AppDataSource.getRepository(PropertyValues)
const componentRepository = AppDataSource.getRepository(Component)
const componentPropertyRepository = AppDataSource.getRepository(ComponentProperty)

export const getComponentProperty = async(req: Request, res: Response) =>{
    const id = +(req.params.id)

    const componentProperty = await componentPropertyRepository.findOneBy({
        id: id
    })

    if(!componentProperty){
        return res.status(404).json({success:false, message: "Relation wasn't found"})
    }
    
    const propertyValueData = {
        property: componentProperty.property,
        value: componentProperty.value,
        component: componentProperty.component,
    }

    return res.status(200).json({success: true, ...propertyValueData})
}

export const createComponentProperty = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    console.log(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        
        const property = await propertyRepository.findOneBy({
            id: req.body.propertyId
        });
        if (!property) return res.status(404).json({success:false, message: "Property wasn't found"});
        
        const value = await propertyValueRepository.findOneBy({
            id: req.body.propertyValueId
        });
        if (!value) return res.status(404).json({success:false, message: "Value wasn't found"});
        
        const component = await componentRepository.findOneBy({
            id: req.body.componentId
        });
        if (!component) return res.status(404).json({success:false, message: "Component wasn't found"});

        const componentProperty = new ComponentProperty();
        componentProperty.property = property
        componentProperty.value = value
        componentProperty.component =component

        await componentPropertyRepository.save(componentProperty);

        return res.status(201).json({
            success:true,
            componentProperty: {
                id: componentProperty.id,
                property: componentProperty.property,
                value: componentProperty.value,
                component: componentProperty.component

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

// export const updatePropertyValue = async(req: Request, res: Response) =>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json(errors.array());
//     }

//     const id = +(req.params.id)
//     const propertyValue = await PropertyValueRepository.save({
//         propertyValueId: id,
//         value: req.body.value
//     });
    
//     return res.status(200).json({
//         success:true,
//         id: propertyValue.propertyValueId,
//         Value: propertyValue.value
//     });
// }

export const removeComponentProperty = async(req: Request, res: Response) =>{
    const id = +(req.params.id);
    try{
        await componentPropertyRepository.delete({
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

export const getComponentProperties =  async (req:Request, res:Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 10;

    const component = await componentRepository.findOneBy({
        id: req.body.id
    });
    if (!component) return res.status(404).json({success:false, message: "Component wasn't found"});


    let componentProperties =
        await componentPropertyRepository
        .createQueryBuilder("component_property")
        .where("component_property.component.id = :id", {id: component.id})
        .leftJoinAndSelect("component_property.property", "property")
        .where("property.category.id = :id", { id: component.category.id})
        .leftJoinAndSelect("component_property.value", "value")
        .where("value.property.id = property.id")
        .limit(itemsPerPage)
        .offset((page - 1) * itemsPerPage)
        .getMany();
    

    if(!componentProperties){
        return res.status(404).json({success:false, message: "Component's properties were not found"})
    }

    var json = JSON.stringify({data:componentProperties, page, success:true});
    res.writeHead(200, {'content-Property':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
};

export const getPropertiesByCategory = async (req: Request, res:Response) => {



    const properties = await propertyRepository.find({
        category: req.body.id
    });



    let componentProperties =
        await propertyRepository
        .createQueryBuilder("property")
        .leftJoinAndSelect("property.category", "category")
        .where("property.category.id = :id", {id: req.body.id})
        .leftJoinAndSelect("property.values", "values")
        .orderBy('property.id')
        .getMany();
    

    if(!componentProperties){
        return res.status(404).json({success:false, message: "Component's properties were not found"})
    }

    var json = JSON.stringify({data:componentProperties, success:true});
    res.writeHead(200, {'content-Property':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
}