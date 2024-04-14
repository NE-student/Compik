import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { validationResult } from "express-validator";


const categoryRepository = AppDataSource.getRepository(Category)

export const getCategories = async (req:Request, res:Response) => {
    const page = +(req.params.page);
    let itemsPerPage = 10;
    let categories;
    if(page)
        categories = await categoryRepository.createQueryBuilder("Category").limit(itemsPerPage).offset((page - 1) * itemsPerPage).getMany();
    else
        categories   = await categoryRepository.createQueryBuilder("Category").getMany();

    if(!categories){
        return res.status(404).json({success:false, message: "Categories weren't found"})
    }

    var json = JSON.stringify({data:categories, page, success:true});
    res.writeHead(200, {'content-type':'application/json', 'content-length':Buffer.byteLength(json)}); 
    res.end(json);
}

export const getCategory = async(req:Request, res:Response) => {
    try{
        const category = await categoryRepository
            .createQueryBuilder("category")
            .where("category.id = :id", { id: req.body.id })
            .leftJoinAndSelect("category.properties", "properties")
            .leftJoinAndSelect("category.compareProperties", "compareProperties")
            .leftJoinAndSelect("category.impactCompareProperties", "impactCompareProperties")
            .leftJoinAndSelect("category.countProperties", "countProperties")
            .leftJoinAndSelect("category.countProductProperties", "countProductProperties")
            .leftJoinAndSelect("category.impactCountProductProperties", "impactCountProductProperties")
            .leftJoinAndSelect("category.components", "components")
            .getOne();

        if(!category){
            return res.status(404).json({success: false, message:"Category wasn't found"});
        }
        const categoryData = {
            id: category.id,
            Name: category.Name,
            Description: category.Description,
            properties: category.properties,
            compareProperties: category.compareProperties,
            impactCompareProperties: category.impactCompareProperties,
            countProperties: category.countProperties,
            countProductProperties: category.countProductProperties,
            impactCountProductProperties: category.impactCountProductProperties,
            components: category.components,
            
        }
        return res.status(200).json({success: true, ...categoryData});
    }
    catch(err:any){
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail});
    }

}

export const createCategory = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try{
        const category = new Category();
        category.Name = req.body.Name;
        category.Description = req.body.Description

        await categoryRepository.save(category);

        return res.status(201).json({
            success:true,
            property: {
                id: category.id,
                Name: category.Name,
                Description: category.Description,     
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

export const updateCategory = async(req: Request, res: Response) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const id = +(req.params.id)
    const property = await categoryRepository.save({
        id: id,
        Name: req.body.Name,
        Description: req.body.description,
    });
    
    return res.status(200).json({
        success:true,
        id: property.id,
        Name: property.Name
    });
}

export const removeCategory = async(req: Request, res: Response) =>{
    const id = +(req.params.id);
    try{
        await categoryRepository.delete({
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