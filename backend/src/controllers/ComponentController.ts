import { category } from './../routes/category';
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validationResult } from "express-validator";
import { Component } from "../entity/Сomponent";


const componentRepository = AppDataSource.getRepository(Component)

export const getComponents = async (req:Request, res:Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 10;
    let components;
    if(req.body.category){
        components = await componentRepository
        .createQueryBuilder("component")
        .leftJoinAndSelect("component.category", "category")
        .where("component.category.id = :id", { id: req.body.category })
        .limit(itemsPerPage)
        .offset((page - 1) * itemsPerPage)
        .getMany();
    }
    else{
        components = await componentRepository
            .createQueryBuilder("component")
            .limit(itemsPerPage)
            .offset((page - 1) * itemsPerPage)
            .getMany();
    }

    if(!components || components.length == 0){
        return res.status(404).json({success:false, message: "Component's weren't found"})
    }

    var json = JSON.stringify({data:components, page, success:true});
    res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
}

export const getComponent = async(req:Request, res:Response) => {
    try{
        const component = await componentRepository
            .createQueryBuilder("component")
            .where("component.id = :id", { id: +(req.params.id) })
            .leftJoinAndSelect("component.properties", "properties")
            .leftJoinAndSelect("component.compareProperties", "compareProperties")
            .leftJoinAndSelect("component.countProperties", "countProperties")
            .leftJoinAndSelect("component.category", "category")
            .getOne();

        if(!component){
            return res.status(404).json({success: false, message:"Component wasn't found"});
        }
        const componentData = {
            id: component.id,
            Name: component.Name,
            Description: component.Description,
            Photos: component.Photos,
            Price: component.Price,
            properties: component.properties,
            compareProperties: component.compareProperties,
            countProperties: component.countProperties,
            category: component.category,
            
        }
        return res.status(200).json({success: true, component:componentData});
    }
    catch(err:any){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail});
    }

}

export const createComponent = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        const component = new Component();
        component.Name = req.body.Name;
        component.Description = req.body.Description;
        
        if(req.body.Photos){
            req.body.Photos.forEach((element : string) => {
                if(!component.Photos){
                    component.Photos = []
                }
                component.Photos.push(element);
            });
        }

        component.Price = req.body.Price;
        component.category = req.body.category;



        await componentRepository.save(component);

        return res.status(201).json({
            success:true,
            component: {
                id: component.id,
                Name: component.Name,
                Description: component.Description,     
                Photos: component.Photos,     
                Price: component.Price,
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

export const updateComponent = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const id = +(req.params.id)
    const component = await componentRepository.save({
        id: id,
        Name: req.body.Name,
        Description: req.body.Description,
        Photos: req.body.Photos,
        Price: req.body.Price,
    });
    
    return res.status(200).json({
        success:true,
        component: {
            id: component.id,
            Name: component.Name,
            Description: component.Description,     
            Photos: component.Photos,     
            Price: component.Price,
        }
    });
}

export const removeComponent = async(req: Request, res: Response) =>{
    const id = +(req.params.id);
    try{
        await componentRepository.delete({
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