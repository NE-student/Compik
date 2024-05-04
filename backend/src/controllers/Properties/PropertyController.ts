import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Property } from "../../entity/Properties/Property";
import { validationResult } from "express-validator";

const PropertyRepository = AppDataSource.getRepository(Property);

export const getProperty = async(req: Request, res: Response) =>{
    const id = +(req.params.id)

    const property = await PropertyRepository.findOneBy({
        id: id
    })

    if(!property){
        return res.status(404).json({success:false, message: "Property wasn't found"})
    }
    
    const propertyData = {
        name: property.Name,
        description: property.Description,
        values: property.values,
        components: property.components,
        category: property.category,
        type: property.type,
    }

    return res.status(200).json({success: true, ...propertyData})
}

export const createProperty = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        const property = new Property();
        property.Name = req.body.Name;
        property.Description = req.body.Description;
        property.category = req.body.category;
        property.type = req.body.type;

        await PropertyRepository.save(property);

        return res.status(201).json({
            success:true,
            property: {
                id: property.id,
                Name: property.Name,
                Description: property.Description,
                category: property.category,
                type: property.type,         
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

export const updateProperty = async(req: Request, res: Response) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }
    
        const id = +(req.params.id)
        const property = await PropertyRepository.save({
            id: id,
            Name: req.body.Name,
            Description: req.body.description,
            type: req.body.type,
            category: req.body.category
        });
        
        return res.status(200).json({
            success:true,
            id: property.id,
            Name: property.Name
        });
    }
    catch(err:any){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail});
    }
    
}

export const removeProperty = async(req: Request, res: Response) =>{
    const id = +(req.params.id);
    try{
        await PropertyRepository.delete({
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

export const getProperties =  async (req:Request, res:Response) => {
    try{
        const page = +(req.params.page);
        let itemsPerPage = 10;
        const properties = await PropertyRepository
            .createQueryBuilder("Property")
            .leftJoinAndSelect("Property.type", "type")
            .leftJoinAndSelect("Property.category", "category")
            .limit(itemsPerPage)
            .offset((page - 1) * itemsPerPage)
            .orderBy("Property.id")
            .getMany();
    
        if(!properties){
            return res.status(404).json({success:false, message: "Properties were not found"})
        }
    
        var json = JSON.stringify({data:properties, page, success:true});
        res.writeHead(200, {'content-Property':'application/json', 'content-length':Buffer.byteLength(json)}); 
        res.end(json);
    }
    catch(err:any){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail});
    }
    
};

export const getPropertiesByCategory = async (req: Request, res:Response) => {
    try{
        let componentProperties =
            await PropertyRepository
            .createQueryBuilder("property")
            .leftJoinAndSelect("property.type", "type")
            .leftJoinAndSelect("property.category", "category")
            .where("property.category.id = :id", {id: req.params.category})
            .leftJoinAndSelect("property.values", "values")
            .orderBy('property.id')
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

