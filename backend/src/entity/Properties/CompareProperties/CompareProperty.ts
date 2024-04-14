import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "../../Type";
import { Category } from "../../Category";
import { ComparePropertyValue } from "./ComparePropertyValue";
import { ComponentCompareProperty } from "./ComponentCompareProperty";



@Entity()
export class CompareProperty{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying"})
    name: string
    
    @ManyToOne(() => Type, type => type.compareProperties)
    type: Type
    
    @ManyToOne(() => Category, category => category.compareProperties)
    category: Category
    
    @ManyToOne(() => Category, category => category.impactCompareProperties)
    impactCategory: Category

    @OneToMany(() => ComparePropertyValue, value => value.property)
    values: ComparePropertyValue[]

    @OneToMany(() => ComponentCompareProperty, ccp => ccp.property)
    components: ComponentCompareProperty[]
}