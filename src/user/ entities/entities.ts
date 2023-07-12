import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,Generated} from "typeorm"

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')  //自增  uuid 不重复
    id:number

    @Column({type:"varchar",length:255})
    name:string

    @Column({type:"varchar",length:255,default:null})
    avatar:string

    @Column({type:"int"})
    age:number

    @Column({type:"int",default:0})
    balance:number

    @Column({type:"varchar"})
    phone:string

    @Column({type:"varchar"})
    email:string

    @Column({type:"varchar",default:"nomal"})
    identity:string

    @Column("simple-array")
    accessPermissions:string[]
    
    @CreateDateColumn({type:"timestamp"})
    date:Date

    @Generated('uuid')
    uuid:string

    @Column({default:true})
    actived:boolean

    @Column({type:"varchar"})
    password:string
    
}