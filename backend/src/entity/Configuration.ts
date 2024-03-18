import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import { PropertyToType } from "./PropertyToType";
import { Component } from "./Сomponent";
import { User } from "./User";

@Entity()
export class Configuration {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @Column({type:"character varying", unique:true})
    Description: string

    @Column({type:"int", unique:true})
    Rate: string

    @Column({type:"money", unique:true})
    Price: number

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @ManyToMany(() => Component)
    @JoinTable()
    components: Component[]

    @ManyToOne(() => User, user => user.configurations)
    author: User

    // @OneToMany(() => PropertyToType, propertyToType => propertyToType.type)
    // public propertyToTypes: PropertyToType[];
}
