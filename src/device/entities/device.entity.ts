import { EMS123 } from "src/mqtt/entities/mqtt.entity"
import { User } from "src/user/entities/entities"
import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,Generated,OneToMany, JoinColumn, OneToOne, ManyToOne} from "typeorm"
@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')  //自增  uuid 不重复
  id:number

  @Column({type:"varchar",length:255,default:"user"})
  name:string

  @Column({type:"varchar",length:255,default:null})
  deviceId:string

  @Column({type:"int"})
  status:number

  @Column("simple-json")
  location:{
      location:string,
      lng:number,
      lat:number,
      electrovalency:number,
      maxElectrovalency:number,
      minElectrovalency:number
  }

  @Column({type:"varchar",default:'voltronicpower'})
  supplier:string

  @Column({type:"int"})
  WorkingMode:number

  @CreateDateColumn({type:"timestamp"})
  date:Date


  @ManyToOne(()=>User,user=>user.devices)
  user:User


  // @OneToOne(()=>EMS123)
  // @JoinColumn()
  // terminal:EMS123

  @OneToMany(()=>EMS123,EMS123=>EMS123.device)
  @JoinColumn()
  terminal:EMS123[]
  // @Column("simple-array")
  // BAT:bat[]
}
