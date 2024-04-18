import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Property } from "./Properties/Property"
import { Component } from "./Сomponent"
import { CompareProperty } from "./Properties/CompareProperties/CompareProperty"
import { ComponentCountProperty } from "./Properties/CountProperties/ComponentCountProperty"
import { CountProperty } from "./Properties/CountProperties/CountProperty"

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

    @OneToMany(() => CompareProperty, compareProperty => compareProperty.impactCategory)
    impactCompareProperties: CompareProperty[]

    @OneToMany(() => CountProperty, ccp => ccp.mainCategory)
    countProperties: ComponentCountProperty[]
    
    @OneToMany(() => CountProperty, ccp => ccp.impactCategory)
    impactCountProperties: ComponentCountProperty[]


}
