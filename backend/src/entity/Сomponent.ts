import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { PropertyToType } from "./PropertyToType";
import { CategoryToProperty } from "./CategoryToProperty";

@Entity()
export class Component {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @Column({type:"character varying", unique:true})
    Description: string

    @Column({type:"character varying", unique:true, array:true})
    Photo: string

    @Column({type:"int", unique:true})
    Rate: string

    @Column({type:"money", unique:true})
    Price: number

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @ManyToMany(() => CategoryToProperty)
    @JoinTable()
    categoryProperties: CategoryToProperty[]

}
