import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { ComponentProperty } from "./Properties/ComponentProperty"
import { Category } from "./Category"
import { ComponentCompareProperty } from "./Properties/CompareProperties/ComponentCompareProperty"
import { ComponentCountProperty } from "./Properties/CountProperties/ComponentCountProperty"

@Entity()
export class Component {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @Column({type:"character varying"})
    Description: string

    @Column({type:"character varying", array:true})
    Photos: string[]

    @Column({type:"money"})
    Price: number

    
    @OneToMany(() => ComponentProperty, component_property => component_property.component)
    properties: ComponentProperty[]
    
    @OneToMany(() => ComponentCompareProperty, ccp => ccp.component)
    compareProperties: ComponentCompareProperty[]
    
    @OneToMany(() => ComponentCountProperty, ccp => ccp.component)
    countProperties: ComponentCountProperty[]
    
    @ManyToOne(() => Category, category => category.components)
    category: Category


}
