import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CategoryToProperty } from "./CategoryToProperty";
import { PropertyToType } from "./PropertyToType";

@Entity()
export class Property {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @Column({type:"character varying"})
    Description: string

    @OneToMany(() => CategoryToProperty, categoryToProperty => categoryToProperty.property)
    public categoryToProperties: CategoryToProperty[];
    
    @OneToMany(() => PropertyToType, propertyToType => propertyToType.property)
    public propertyToTypes: PropertyToType[];

}
