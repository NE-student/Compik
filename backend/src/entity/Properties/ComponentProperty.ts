import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PropertyValues } from "./PropertyValues";
import { Property } from "./Property";
import { Component } from "../Сomponent";


@Entity()
export class ComponentProperty{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    numberValue: number

    @Column({nullable: true})
    boolValue: boolean

    @ManyToOne(() => PropertyValues, propertyValues => propertyValues.component_properties)
    value: PropertyValues

    @ManyToOne(() => Property, property => property.components)
    property: Property

    @ManyToOne(() => Component, component => component.properties)
    component: Component

}
