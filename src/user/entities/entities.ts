import { Terminal } from "src/terminal/entities/device.entity"
import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,Generated, OneToMany, JoinColumn, Index} from "typeorm"

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')  //自增  uuid 不重复
    id:string

    @Index("username-idx")
    @Column({type:"varchar",length:255,default:"user"})
    name:string

    @Column({type:"varchar",length:255,default:null})
    avatar:string

    @Column({type:"int"})
    age:number

    @Column({type:"int",default:0})
    balance:number

    @Index("phone-idx")
    @Column({type:"varchar"})
    phone:string

    @Index("email-idx")
    @Column({type:"varchar",nullable:true})
    email:string

    @Column({type:"varchar",default:"nomal"})
    identity:string

    @Column("simple-array")
    accessPermissions:string[]
    
    @CreateDateColumn({type:"timestamp"})
    date:Date

    @Generated('uuid')
    uuid:string

    @Column({default:true,comment:"激活状态"})
    actived:boolean

    @Column({type:"varchar",select:true,nullable:true})
    password:string

    @Column("simple-json")
    location:{
        location:string,
    }
    
    @OneToMany(()=>Terminal,Terminal=>Terminal.user)
    @JoinColumn()
    terminals:Terminal[]
}