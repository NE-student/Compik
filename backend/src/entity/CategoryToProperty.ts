import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./Category"
import { Property } from "./Property"

@Entity()
export class CategoryToProperty {
    @PrimaryGeneratedColumn()
    public categoryToPropertyId: number

    @Column()
    public categoryId: number

    @Column()
    public propertyId: number

    @Column({type:"character varying", unique:true, length:100})
    public alternativeName: string

    @ManyToOne(() => Property, (property) => property.categoryToProperties)
    public property: Property

    @ManyToOne(() => Category, (category) => category.categoryToProperties)
    public category: Category
}