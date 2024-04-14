import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import {Type} from "../Type";
import { PropertyValues } from "./PropertyValues";
import { Category } from "../Category";
import { ComponentProperty } from "./ComponentProperty";
import { CountProperty } from "./CountProperties/CountProperty";

@Entity()
export class Property {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @Column({type:"character varying"})
    Description: string

    @OneToMany(() => PropertyValues, propertyValues => propertyValues.property)
    values: PropertyValues[]
    
    @OneToMany(() => ComponentProperty, component_property => component_property.property)
    components: ComponentProperty[]

    @OneToMany(() => CountProperty, cp => cp.impactProperty)
    countProperties: CountProperty
    
    @ManyToOne(() => Type, type => type.properties)
    type: Type

    @ManyToOne(() => Category, category => category.properties)
    category: Category
}
