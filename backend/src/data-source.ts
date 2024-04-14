import "reflect-metadata"
import dotenv from "dotenv";
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Type } from "./entity/Type";
import { Property } from "./entity/Properties/Property";
import { PropertyValues } from "./entity/Properties/PropertyValues";
import { Category } from "./entity/Category";
import { Component } from "./entity/Сomponent";
import { Configuration } from "./entity/Configuration";
import { ComponentProperty } from "./entity/Properties/ComponentProperty";
import { CompareProperty } from "./entity/Properties/CompareProperties/CompareProperty";
import { ComparePropertyValue } from "./entity/Properties/CompareProperties/ComparePropertyValue";
import { ComponentCompareProperty } from "./entity/Properties/CompareProperties/ComponentCompareProperty";
import { CountProperty } from "./entity/Properties/CountProperties/CountProperty";
import { ComponentCountProperty } from "./entity/Properties/CountProperties/ComponentCountProperty";

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
    entities: [
        Type, Category,
        Property, PropertyValues, ComponentProperty,
        CompareProperty, ComparePropertyValue, ComponentCompareProperty,
        CountProperty, ComponentCountProperty,
        Component, User, Configuration],
    migrations: [],
    subscribers: [],
});