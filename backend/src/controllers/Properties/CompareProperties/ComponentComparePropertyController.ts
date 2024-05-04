import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { validationResult } from "express-validator";

import { Component } from "../../../entity/Сomponent";
import { CompareProperty } from "../../../entity/Properties/CompareProperties/CompareProperty";
import { ComparePropertyValue } from "../../../entity/Properties/CompareProperties/ComparePropertyValue";
import { ComponentCompareProperty } from "../../../entity/Properties/CompareProperties/ComponentCompareProperty";

const propertyRepository = AppDataSource.getRepository(CompareProperty);
const propertyValueRepository = AppDataSource.getRepository(ComparePropertyValue)
const componentRepository = AppDataSource.getRepository(Component)
const componentPropertyRepository = AppDataSource.getRepository(ComponentCompareProperty)

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

export const getComponentPropertyValue = async(req: Request, res: Response) =>{
    const id = +(req.params.id)

    const component = await componentRepository.findOneBy({
        id: id
    });

    if (!component) return res.status(404).json({success:false, message: "Component wasn't found"});

    const property = await propertyRepository.findOneBy({
        id: req.body.propertyId
    })

    if (!property) return res.status(404).json({success:false, message: "Property wasn't found"});


    const componentProperty = await componentPropertyRepository
        .createQueryBuilder("component_compareProperty")
        .where("component_compareProperty.component.id = :id", {id: component.id})
        .leftJoinAndSelect("component_compareProperty.property", "property")
        .where("property.id = :id", { id: property.id})
        .getOne();

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
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        
        const component = await componentRepository.findOneBy({
            id: req.body.componentId
        });
        if (!component) return res.status(404).json({success:false, message: "Component wasn't found"});

        const property = await propertyRepository
            .createQueryBuilder("property")
            .where("property.id = :id", {id: req.body.propertyId})
            .leftJoinAndSelect("property.type", "type")
            .getOne();
        
        if (!property) return res.status(404).json({success:false, message: "Property wasn't found"});

        
        let value
        if(property.type.Name !== "boolean"){
            value = await propertyValueRepository.findOneBy({
                id: req.body.propertyValueId
            });
            if (!value) return res.status(404).json({success:false, message: "Value wasn't found"});
        }
        
        const componentPropertyCheck = await componentPropertyRepository.findOne({
                relations: {
                    property: true,
                    component: true,
                },
                where: {
                    property: {
                        id: property.id
                    },
                    component: {
                        id: component.id,
                    },
                },
            });
        
        if (componentPropertyCheck){
            
            componentPropertyCheck.value = value
            componentPropertyCheck.boolValue = req.body.boolValue
            componentPropertyCheck.count = req.body.count

            await componentPropertyRepository.save(componentPropertyCheck);
            return res.status(200).json({
                success:true,
                componentProperty: {
                    id: componentPropertyCheck.id,
                    property: componentPropertyCheck.property,
                    value: componentPropertyCheck.value,
                    component: componentPropertyCheck.component
    
                }
        });
        }

        const componentProperty = new ComponentCompareProperty();
        componentProperty.property = property
        componentProperty.value = value
        componentProperty.component = component
        componentProperty.boolValue = req.body.boolValue
        componentProperty.count = req.body.count

        await componentPropertyRepository.save(componentProperty);

        return res.status(200).json({
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

