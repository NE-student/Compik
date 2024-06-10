import { property } from './../routes/property';
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validationResult } from "express-validator";
import { Component } from "../entity/Сomponent";
import { In } from 'typeorm';


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

export const getCountByComponents = async (req: Request, res: Response) => {
    try {
        let chosenComponents = Array<Component>();

        if (req.body.components.length == 0) {
            return res.status(404).json({ success: false, message: "Component's weren't found" })
        }
        let count = Object();
        chosenComponents = await componentRepository
            .find({
                relations: {
                    category: true,
                    compareProperties: {
                        property: {
                            category: true,
                            type: true,
                            impactCategories: {
                                category: true
                            }
                        },
                        value: true
                    }
                },
                where: {
                    id: In(req.body.components),
                }
            })
        chosenComponents.forEach((chosenComponent) => {
            chosenComponent.compareProperties.forEach((compareProperty) => {
                if (compareProperty.property.isCountable) {
                    const checkImpact = compareProperty.property.impactCategories.map((element) => { return element.category.id })
                    if (checkImpact.includes(chosenComponent.category.id)) return;
                    if (compareProperty.property.type.Name === "boolean" && compareProperty.boolValue == false) return

                    compareProperty.property.impactCategories.forEach((impactCategory) => {

                        const impactComponent = chosenComponents.find((component) => component.category.id == impactCategory.category.id)
                        const impactProperty = impactComponent?.compareProperties.find((property) => property.property.id == compareProperty.property.id)
                        if (impactComponent && !impactProperty) return;

                        if (impactProperty) {
                            if (impactProperty.property.type.Name === "string") {
                                if (impactProperty.value.value !== compareProperty.value.value) return
                                else {
                                    if (count[impactCategory.category.id] && count[impactCategory.category.id] < compareProperty.count) return
                                    count[impactCategory.category.id] = compareProperty.count;
                                    return
                                }
                            }
                            if (impactProperty.property.type.Name === "number") {
                                if (+impactProperty.value.value > +compareProperty?.value.value) return
                                else {
                                    if (count[impactCategory.category.id] && count[impactCategory.category.id] < compareProperty.count) return
                                    count[impactCategory.category.id] = compareProperty.count;
                                    return
                                }
                            }

                            if (impactProperty.property.type.Name === "boolean") {

                                
                                if (impactProperty.boolValue !== compareProperty.boolValue) return
                                else {
                                    if (count[impactCategory.category.id] && count[impactCategory.category.id] < compareProperty.count) return
                                    count[impactCategory.category.id] = compareProperty.count;
                                    return
                                }
                            }
                        }



                        if (count[impactCategory.category.id] && count[impactCategory.category.id] < compareProperty.count) return
                        count[impactCategory.category.id] = compareProperty.count
                    })

                }
            })

        })



        var json = JSON.stringify({ data: count, success: true });
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
        console.log(filters)
        let chosenComponents = Array<Component>();
        if (req.body?.components?.length > 0) {
            chosenComponents = await componentRepository
                .find({
                    relations: {
                        category: true,
                        compareProperties: {
                            property: {
                                category: true,
                                impactCategories: {
                                    category: true
                                }
                            },
                            value: true
                        }
                    },
                    where: {
                        id: In(req.body.components),
                    }
                })

        }

        let whereCondition = "component.category.id = :id";
        var whereObj: { [k: string]: any } = { id: req.body.category };

        components = await componentRepository
            .createQueryBuilder("component")
            .leftJoinAndSelect("component.category", "category")
            .leftJoinAndSelect("component.properties", "properties")
            .leftJoinAndSelect("properties.property", "property")
            .leftJoinAndSelect("property.type", "type")
            .leftJoinAndSelect("properties.value", "value")
            .leftJoinAndSelect("component.compareProperties", "compareProperties")
            .leftJoinAndSelect("compareProperties.property", "compareProperty")
            .leftJoinAndSelect("compareProperty.type", "compareType")
            .leftJoinAndSelect("compareProperties.value", "compareValue")
            .where(whereCondition, whereObj)
            .getMany();


        if (filters) {
            components = components.map((comp: any) => {


                if (comp.Price < filters.price.minNumber || comp.Price > filters.price.maxNumber) return undefined;
                for (const [idProperty, value] of Object.entries<[number, number]>(filters.properties)) {
                    for (let i = 0; i < comp.properties.length; i++) {
                        if (comp.properties[i].property.id == idProperty && comp.properties[i]?.value?.id !== value) {
                            if (comp.properties[i].boolValue != value) return null;
                        }
                    }
                }
                for (const [idCompareProperty, value] of Object.entries<[number, number]>(filters.compareProperties)) {
                    for (let i = 0; i < comp.compareProperties.length; i++) {
                        if (comp.compareProperties[i].property.id == idCompareProperty && comp.compareProperties[i]?.value?.id !== value) {
                            if (comp.compareProperties[i].boolValue != value) return null;
                        }
                    }
                }

                return comp;
            })
        }

        if (chosenComponents && chosenComponents.length > 0) {
            components = components.map((comp: Component) => {
                let approved = true;
                chosenComponents.forEach((ccomp) => {
                    for (let j = 0; j < ccomp.compareProperties.length; j++) {
                        const cproperty = ccomp.compareProperties[j];
                        const checkImpact = cproperty.property.impactCategories.map((element) => { return element.category.id })
                        for (let k = 0; k < comp.compareProperties.length; k++) {

                            if (comp.compareProperties[k].property.id == cproperty.property.id) {

                                // string
                                if (comp.compareProperties[k].property.type.Name === "string") {
                                    if (comp.compareProperties[k]?.value && comp.compareProperties[k]?.value?.id !== cproperty.value.id) {
                                        approved = false
                                        return
                                    }
                                }

                                //number

                                if (comp.compareProperties[k].property.type.Name === "number") {
                                    //main comp
                                    if (checkImpact.includes(ccomp.category.id) && checkImpact.includes(comp.category.id)) continue;
                                    if (comp.category.id == cproperty.property.category.id) {
                                        if (+comp.compareProperties[k]?.value.value < +cproperty?.value.value) {
                                            approved = false
                                            return
                                        }

                                    }
                                    else { // impact comp
                                        if (+comp.compareProperties[k]?.value.value > +cproperty?.value.value) {
                                            approved = false
                                            return
                                        }

                                    }
                                }

                                // bool
                                if (comp.compareProperties[k].property.type.Name === "boolean") {
                                    if (comp.compareProperties[k].boolValue != cproperty.boolValue) {
                                        approved = false
                                        return
                                    }
                                }
                            }
                        }
                    }

                })
                return approved ? comp : null
            })
        }
        components = components.filter((element: Component) => element !== null)

        

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
                category: component.category
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