import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CompareProperty } from "./CompareProperty";
import { ComparePropertyValue } from "./ComparePropertyValue";
import { Component } from "../../Сomponent";



@Entity()
export class ComponentCompareProperty{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Component, component => component.compareProperties)
    component: Component

    @ManyToOne(() => ComparePropertyValue, value => value.componentsCompareProperty)
    value: ComparePropertyValue

    @ManyToOne(() => CompareProperty, property => property.components)
    property: CompareProperty
    
}