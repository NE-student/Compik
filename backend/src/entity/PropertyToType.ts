import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Property } from "./Property"
import { Type } from "./Type"

@Entity()
export class PropertyToType {
    @PrimaryGeneratedColumn()
    public propertyToTypeId: number
    
    @Column()
    public propertyId: number

    @Column()
    public typeId: number

    @Column({type:"character varying", unique:true})
    public value: string

    @ManyToOne(() => Property, (property) => property.propertyToTypes)
    public property: Property

    @ManyToOne(() => Type, (type) => type.propertyToTypes)
    public type: Type
}