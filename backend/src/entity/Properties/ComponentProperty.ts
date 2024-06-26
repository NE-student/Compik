import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PropertyValues } from "./PropertyValues";
import { Property } from "./Property";
import { Component } from "../Сomponent";


@Entity()
export class ComponentProperty{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true, default: false})
    boolValue: boolean

    @ManyToOne(() => PropertyValues, propertyValues => propertyValues.component_properties, {nullable: true, onDelete:"CASCADE", onUpdate:"CASCADE"})
    value: PropertyValues

    @ManyToOne(() => Property, property => property.components, {onDelete:"CASCADE", onUpdate:"CASCADE"})
    property: Property

    @ManyToOne(() => Component, component => component.properties, {onDelete:"CASCADE", onUpdate:"CASCADE"})
    component: Component

}
