import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "../../Type";
import { Category } from "../../Category";
import { ComparePropertyValue } from "./ComparePropertyValue";
import { ComponentCompareProperty } from "./ComponentCompareProperty";
import { CompareProperty } from "./CompareProperty";



@Entity()
export class ComparePropertyImpactCategory{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => CompareProperty, cp => cp.impactCategories, {onDelete:"CASCADE", onUpdate:"CASCADE"})
    property: CompareProperty
    
    @ManyToOne(() => Category, category => category.impactCompareProperties, {onDelete:"CASCADE", onUpdate:"CASCADE"})
    category: Category
    

}