import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Configuration } from "./Configuration"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true})
    Nickname: string

    @Column({type:"character varying", unique:true})
    email: string

    @Column("character varying")
    password: string

    @Column({type:"character varying",nullable: true})
    emailToken: string

    @Column("boolean")
    isVerified: boolean

    @Column("boolean")
    isAdmin: boolean

    @OneToMany(() => Configuration, configuration => configuration.author)
    configurations: Configuration[]

}
