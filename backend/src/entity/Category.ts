import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Property } from "./Properties/Property"
import { Component } from "./Сomponent"
import { CompareProperty } from "./Properties/CompareProperties/CompareProperty"
import { ComparePropertyImpactCategory } from "./Properties/CompareProperties/ComparePropertyImpactCategory"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @Column({type:"character varying"})
    Description: string

    @Column({type:"character varying", nullable:true})
    Photos: string[]

    @OneToMany(() => Property, property => property.category)
    properties: Property[]

    @OneToMany(() => Component, component => component.category)
    components: Component[]

    @OneToMany(() => CompareProperty, compareProperty => compareProperty.category)
    compareProperties: CompareProperty[]

    @OneToMany(() => ComparePropertyImpactCategory, cpic => cpic.category)
    impactCompareProperties: ComparePropertyImpactCategory[]


}
