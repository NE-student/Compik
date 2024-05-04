import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validationResult } from "express-validator";
import { Component } from "../entity/Сomponent";


const componentRepository = AppDataSource.getRepository(Component)

const arrayToString = (array: Array<any>) => {
    return String(array).replace("[", "").replace("]", "");
}

export const getComponents = async (req: Request, res: Response) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        let components;
        if (req.body.category) {
            components = await componentRepository
                .createQueryBuilder("component")
                .leftJoinAndSelect("component.category", "category")
                .where("component.category.id = :id", { id: req.body.category })
                .limit(itemsPerPage)
                .offset((page - 1) * itemsPerPage)
                .getMany();
        }
        else {
            components = await componentRepository
                .createQueryBuilder("component")
                .limit(itemsPerPage)
                .offset((page - 1) * itemsPerPage)
                .getMany();
        }

        if (!components || components.length == 0) {
            return res.status(404).json({ success: false, message: "Component's weren't found" })
        }

        var json = JSON.stringify({ data: components, page, success: true });
        res.writeHead(200, { 'content-type': 'application/json', 'content-length': Buffer.byteLength(json) });
        res.end(json);
    }
    catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail
        });
    }

}

export const getComponentsByFilter = async (req: Request, res: Response) => {
    try {
        if (!req.body.category) { return res.status(404).json({ success: false, message: "Component's weren't found" }) }
        let components;

        const filters = req.body.filters;
        console.log(req.body)


        let whereCondition = "component.category.id = :id";
        var whereObj: { [k: string]: any } = { id: req.body.category };

        components = await componentRepository
            .createQueryBuilder("component")
            .leftJoinAndSelect("component.category", "category")
            .leftJoinAndSelect("component.properties", "properties")
            .leftJoinAndSelect("properties.property", "property")
            .leftJoinAndSelect("properties.value", "value")
            .leftJoinAndSelect("component.compareProperties", "compareProperties")
            .leftJoinAndSelect("compareProperties.property", "compareProperty")
            .leftJoinAndSelect("compareProperties.value", "compareValue")
            .where(whereCondition, whereObj)
            .getMany();


        if (filters) {
            components = components.map((comp: any) => {
                if(comp.Price < filters.price.minNumber || comp.Price > filters.price.maxNumber) return undefined;
                for (let i = 0; i < comp.properties.length; i++) {
                    const exist = filters.properties.hasOwnProperty(comp.properties[i].property.id)
                    const value = filters.properties[comp.properties[i].property.id]
                    if (exist && comp.properties[i]?.value?.id !== value) {
                        if (comp.properties[i].boolValue != value) return undefined;
                    }
                }
                for (let i = 0; i < comp.compareProperties.length; i++) {
                    const exist = filters.compareProperties.hasOwnProperty(comp.compareProperties[i].property.id)
                    const value = filters.compareProperties[comp.compareProperties[i].property.id]
                    if (exist && comp.compareProperties[i]?.value?.id !== value) {
                        if (comp.compareProperties[i].boolValue != value) return undefined;
                    }
                }
                for (let i = 0; i < comp.compareProperties.length; i++) {
                    for (const [_, compProps] of Object.entries<[string, Object]>(filters.additionalCompareProperties)) {
                        console.log(compProps)
                        const exist = compProps.hasOwnProperty(comp.compareProperties[i].property.id)
                        const value = compProps[comp.compareProperties[i].property.id]
                        if (exist && comp.compareProperties[i]?.value?.id !== value) {
                            if (comp.compareProperties[i].boolValue != value) return undefined;
                        }
                    }
                }
                return comp;
            })
        }

        if (!components || components.length == 0 || !components[0]) {
            return res.status(404).json({ success: false, message: "Component's weren't found" })
        }


        var json = JSON.stringify({ data: components, success: true });
        res.writeHead(200, { 'content-type': 'application/json', 'content-length': Buffer.byteLength(json) });
        res.end(json);
    }
    catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail
        });
    }
}

export const getComponent = async (req: Request, res: Response) => {
    try {
        const component = await componentRepository
            .createQueryBuilder("component")
            .where("component.id = :id", { id: +(req.params.id) })
            .leftJoinAndSelect("component.properties", "properties")
            .leftJoinAndSelect("properties.property", "property")
            .leftJoinAndSelect("properties.value", "value")
            .leftJoinAndSelect("component.compareProperties", "compareProperties")
            .leftJoinAndSelect("compareProperties.property", "compareProperty")
            .leftJoinAndSelect("compareProperties.value", "comparePropertyValue")
            .leftJoinAndSelect("component.category", "category")
            .getOne();

        if (!component) {
            return res.status(404).json({ success: false, message: "Component wasn't found" });
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
        return res.status(200).json({ success: true, component: componentData });
    }
    catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail
        });
    }

}

export const createComponent = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    try {
        const component = new Component();
        component.Name = req.body.Name;
        component.Description = req.body.Description;

        if (req.body.Photos) {
            req.body.Photos.forEach((element: string) => {
                if (!component.Photos) {
                    component.Photos = []
                }
                component.Photos.push(element);
            });
        }

        component.Price = req.body.Price;
        component.category = req.body.category;



        await componentRepository.save(component);

        return res.status(201).json({
            success: true,
            component: {
                id: component.id,
                Name: component.Name,
                Description: component.Description,
                Photos: component.Photos,
                Price: component.Price,
            }
        });
    }
    catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail
        });
    }
}

export const updateComponent = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
        success: true,
        component: {
            id: component.id,
            Name: component.Name,
            Description: component.Description,
            Photos: component.Photos,
            Price: component.Price,
        }
    });
}

export const removeComponent = async (req: Request, res: Response) => {
    const id = +(req.params.id);
    try {
        await componentRepository.delete({
            id: id
        });
        return res.status(200).json({
            success: true
        });
    }
    catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail
        });
    }
}