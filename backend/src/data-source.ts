import "reflect-metadata"
import dotenv from "dotenv";
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Type } from "./entity/Type";
import { Property } from "./entity/Property";
import { PropertyToType } from "./entity/PropertyToType";
import { Category } from "./entity/Category";
import { CategoryToProperty } from "./entity/CategoryToProperty";
import { Component } from "./entity/Сomponent";
import { Configuration } from "./entity/Configuration";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_ENDPOINT,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    synchronize: true,
    logging: false,
    entities: [Type, Property, PropertyToType, Category, CategoryToProperty, Component, User, Configuration],
    migrations: [],
    subscribers: [],
});