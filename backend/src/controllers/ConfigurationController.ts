import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validationResult } from "express-validator";
import { Configuration } from "../entity/Configuration";
import { Component } from "../entity/Сomponent";
import { In } from "typeorm";

const componentRepository = AppDataSource.getRepository(Component)
const configurationRepository = AppDataSource.getRepository(Configuration)

export const getConfigurations = async (req: Request, res: Response) => {
    try {
        const page = +(req.params.page);
        let itemsPerPage = 10;
        let configurations = await configurationRepository.createQueryBuilder("Configuration").limit(itemsPerPage).offset((page - 1) * itemsPerPage).getMany();


        if (!configurations) {
            return res.status(404).json({ success: false, message: "Categories weren't found" })
        }

        var json = JSON.stringify({ data: configurations, page, success: true });
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

export const getConfiguration = async (req: Request, res: Response) => {
    try {
        const configuration = await configurationRepository
            .createQueryBuilder("Configuration")
            .leftJoinAndSelect("Configuration.components", "components")
            .where("Configuration.id = :id", { id: req.params.id })
            .getOne();

        if (!configuration) {
            return res.status(404).json({ success: false, message: "Configuration wasn't found" });
        }

        return res.status(200).json({ success: true, configuration });
    }
    catch (err: any) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong... Try again later.",
            detail: err.detail
        });
    }

}

export const createConfiguration = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        console.log(req.body.components);
        let chosenComponents = Array<Component>();
        if(req.body.components.length > 0){
            chosenComponents = await componentRepository
            .find({
                where:{
                    id: In(req.body.components),
                }
            })

        }
        const configuration = new Configuration();
        configuration.Name = req.body.Name;
        configuration.Description = req.body.Description
        configuration.components = chosenComponents
        configuration.author = req.body.userId

        await configurationRepository.save(configuration);

        return res.status(201).json({
            success: true,
            configuration
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

export const updateConfiguration = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const id = +(req.params.id)
    const configuration = await configurationRepository.save({
        id: id,
        Name: req.body.Name,
        Description: req.body.description,
        components: req.body.components
    });

    return res.status(200).json({
        success: true,
        configuration
    });
}

export const removeConfiguration = async (req: Request, res: Response) => {
    const id = +(req.params.id);
    try {
        await configurationRepository.delete({
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