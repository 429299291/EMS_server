import { error } from "console"
import { Device } from "src/device/entities/device.entity"
import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,Generated,ManyToOne} from "typeorm"
interface bat {     //电池
    id:string,
    isOn:boolean,
    power:number,     //功率
    SOC:number,     //电池容量
    SOH:number,     //电池健康度
    maxTemp:number,    //电池温度
    minTemp:number,    //电池温度
}
interface ev {
    id:string,
    status:string,
    power:number,
    electricCurrent:number,     
}
interface grid {
    power:number,       //正负值,正是买电,负值是卖电
    volt:number,        //电压0 停电
}
interface pv {
    id:string,
    isOn:boolean,
    power:number,        //0为不发电
}
interface inv {     //逆变器----123取消
    id:string,
    isOn:boolean,
    power:number,
    electricCurrent:number,
    volt:number
}

interface home {
    isOn:boolean,
    power:number,
}
interface fault {
    id:string,
    name:string,
    errorCode:number,
    // status:string            服务器处理
}

@Entity()
export class EMS123{
    @PrimaryGeneratedColumn('uuid')  //自增  uuid 不重复
    id:number

    @Column({type:"varchar",length:255,default:"user"})
    name:string

    // @Column({type:"varchar",length:255,default:null})
    // userId:string

    // @Column({type:"varchar",default:''})
    // location:string

    @Column({type:"int"})
    WorkingMode:number

    @Column("simple-array")
    BAT:bat[]

    @Column("simple-array")
    EV:ev[]

    @Column("simple-array")
    GRID:grid[]

    @Column("simple-array")
    PV:pv[]

    @Column("simple-array")
    HOME:home[]

    @Column("simple-json")
    INV:inv[]

    @Column("simple-array")
    fault:fault[]
    
    @Column({type:"int",default:null})
    timeStamp:number

    @ManyToOne(()=>Device,Device=>Device.terminal)
    device:Device

    // @CreateDateColumn({type:"timestamp"})
    // date:Date

    // @Column("simple-json")
    // location:{
    //     location:string,
    // }
    
}