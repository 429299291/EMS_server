import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,Generated} from "typeorm"

@Entity()
export class Dashboard{
    @PrimaryGeneratedColumn('uuid')  //自增  uuid 不重复
    id:number

    @Column({type:"varchar",length:255})
    name:string

    @Column({type:"int",length:11})
    age:number
    
    @CreateDateColumn({type:"timestamp"})
    date:Date

    @Generated('uuid')
    uuid:string
    
}