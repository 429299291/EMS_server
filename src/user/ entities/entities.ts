import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,Generated} from "typeorm"

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')  //自增  uuid 不重复
    id:number

    @Column({type:"varchar",length:255})
    username:string

    @Column({type:"int"})
    age:number
    
    @CreateDateColumn({type:"timestamp"})
    date:Date

    @Generated('uuid')
    uuid:string

    @Column({type:"varchar"})
    password:string
    
}