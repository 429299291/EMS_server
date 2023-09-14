import { EMS123 } from "src/mqtt/entities/mqtt.entity"
import { User } from "src/user/entities/entities"
import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,Generated,OneToMany, JoinColumn, OneToOne, ManyToOne, Index} from "typeorm"
@Entity()
export class Terminal {
  @PrimaryGeneratedColumn('uuid')  //自增  uuid 不重复
  id:string

  @Index("terminalname-idx")
  @Column({type:"varchar",length:255,default:"user"})
  name:string

  @Column({type:"int"})
  status:number

  @Column("simple-json")
  location:{
      location:string,
      lng:number,
      lat:number,
      electrovalency:number,//电价
      maxElectrovalency:number,
      minElectrovalency:number,
      sunrise:string,
      sunset:string,
  }

  @Column({type:"varchar",default:'voltronicpower'})
  supplier:string

  @Column({type:"int"})
  WorkingMode:number

  @Index("date-idx")
  @CreateDateColumn({type:"timestamp"})
  date:Date


  @ManyToOne(()=>User,user=>user.terminals)
  user:User


  // @OneToOne(()=>EMS123)
  // @JoinColumn()
  // terminal:EMS123

  @OneToMany(()=>EMS123,EMS123=>EMS123.terminal,{
    cascade:true
  })
  // @JoinColumn()
  devices:EMS123[]
  // @Column("simple-array")
  // BAT:bat[]
}
