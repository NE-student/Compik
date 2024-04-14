import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CompareProperty } from "./CompareProperty";
import { ComponentCompareProperty } from "./ComponentCompareProperty";



@Entity()
export class ComparePropertyValue{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying"})
    value: string

    @OneToMany(() => ComponentCompareProperty, ccp => ccp.value)
    componentsCompareProperty: ComponentCompareProperty[]

    @ManyToOne(() => CompareProperty, property => property.values)
    property: CompareProperty
}