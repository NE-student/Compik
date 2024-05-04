import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Property } from "./Properties/Property";
import { CompareProperty } from "./Properties/CompareProperties/CompareProperty";

@Entity()
export class Type {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @OneToMany(() => Property, property => property.type)
    public properties: Property[]

    @OneToMany(() => CompareProperty, property => property.type)
    compareProperties: CompareProperty[]
}
