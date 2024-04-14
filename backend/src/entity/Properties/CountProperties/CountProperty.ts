import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ComponentCountProperty } from "./ComponentCountProperty";
import { Category } from "../../Category";
import { Property } from "../Property";


@Entity()
export class CountProperty{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type : "character varying"})
    name: string

    @ManyToOne(() => Category, category => category.countProperties)
    mainCategory: Category

    @ManyToOne(() => Category, category => category.impactCountProperties)
    impactCategory: Category

    @ManyToOne(() => Property, property => property.countProperties)
    impactProperty: Property

    @OneToMany(() => ComponentCountProperty, ccp => ccp.property)
    components: ComponentCountProperty[]
    
}