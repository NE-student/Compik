import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Property } from "./Property"
import { CategoryToProperty } from "./CategoryToProperty"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @Column({type:"character varying"})
    Description: string

    @OneToMany(() => CategoryToProperty, categoryToProperty => categoryToProperty.category)
    public categoryToProperties: CategoryToProperty[];

}
