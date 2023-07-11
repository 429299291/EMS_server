import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,Generated} from "typeorm"

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')  //自增  uuid 不重复
    id:number

    @Column({type:"varchar",length:255})
    name:string

    @Column({type:"int"})
    age:number

    @Column({type:"varchar"})
    phone:string

    @Column({type:"varchar"})
    email:string

    @Column({type:"varchar"})
    identity:string
    
    @CreateDateColumn({type:"timestamp"})
    date:Date

    @Generated('uuid')
    uuid:string

    @Column({type:"varchar"})
    password:string
    
}