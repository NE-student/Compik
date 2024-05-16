import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "../../Type";
import { Category } from "../../Category";
import { ComparePropertyValue } from "./ComparePropertyValue";
import { ComponentCompareProperty } from "./ComponentCompareProperty";
import { ComparePropertyImpactCategory } from "./ComparePropertyImpactCategory";



@Entity()
export class CompareProperty{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @Column({type:"character varying"})
    Description: string

    @Column({nullable: true, default: false})
    isCountable: boolean
    
    @ManyToOne(() => Type, type => type.compareProperties, {onDelete:"CASCADE", onUpdate:"CASCADE"})
    type: Type
    
    @ManyToOne(() => Category, category => category.compareProperties, {onDelete:"CASCADE", onUpdate:"CASCADE"})
    category: Category
    
    @OneToMany(() => ComparePropertyImpactCategory, cpic => cpic.property, {nullable:true})
    impactCategories: ComparePropertyImpactCategory[]

    @OneToMany(() => ComparePropertyValue, value => value.property)
    values: ComparePropertyValue[]

    @OneToMany(() => ComponentCompareProperty, ccp => ccp.property)
    components: ComponentCompareProperty[]
}