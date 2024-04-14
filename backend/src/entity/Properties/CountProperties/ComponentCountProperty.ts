import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CountProperty } from "./CountProperty";
import { Component } from "../../Сomponent";


@Entity()
export class ComponentCountProperty{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"int"})
    count: number

    @ManyToOne(() => CountProperty, property => property.components)
    property: CountProperty

    @ManyToOne(() => Component, component => component.countProperties)
    component: Component
}