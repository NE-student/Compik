import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Property } from "./Property"
import { ComponentProperty } from "./ComponentProperty"

@Entity()
export class PropertyValues {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying"})
    value: string
    
    @OneToMany(() => ComponentProperty, component_property => component_property.value)
    component_properties: ComponentProperty[]

    @ManyToOne(() => Property, (property) => property.values)
    property: Property

}