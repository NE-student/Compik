import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { PropertyToType } from "./PropertyToType";

@Entity()
export class Type {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"character varying", unique:true, length:100})
    Name: string

    @OneToMany(() => PropertyToType, propertyToType => propertyToType.type)
    public propertyToTypes: PropertyToType[];
}
