import { Injectable } from '@nestjs/common';
import { CreateMqttDto, dashboardElectricityDTO } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';
import { EMS123 } from './entities/mqtt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Between, JsonContains, Like, Repository} from 'typeorm'
import { Terminal } from 'src/terminal/entities/device.entity';
import * as moment from 'moment';
import { Cron } from '@nestjs/schedule';
import { InjectRedis, Redis, RedisCacheHelper } from '@jasonsoft/nestjs-redis';

@Injectable()
export class MqttService {
  private bufferList= new Set()
  constructor(
    @InjectRepository(EMS123) private readonly ems:Repository<EMS123>,
    @InjectRepository(Terminal) private readonly terminal:Repository<Terminal>,
    // @InjectRedis() private readonly redis:Redis,
    private readonly redisCacheHelper: RedisCacheHelper
  ){
  }
  async create(createMqttDto: CreateMqttDto) {        
    let data:any = JSON.parse(createMqttDto.toString())            
    return await this.terminal.findOne({
      where: { id: data.id},
      relations: ['devices'],
    }).then(async terminalA=>{      
      if(terminalA){                
        try{
          data.BAT = data.BAT.map(data=>{
            return JSON.stringify(data)
          })
          data.EV = data.EV?data.EV.map(data=>{
            return JSON.stringify(data)
          }):[]
          data.PV = data.PV.map(data=>{
            return JSON.stringify(data)
          })
          // data.GRID = data.GRID.map(data=>{
          //   return JSON.stringify(data)
          // })
          // data.HOME = data.HOME.map(data=>{
          //   return JSON.stringify(data)
          // })
          data.INV = data.INV?data.INV.map(data=>{
            return JSON.stringify(data)
          }):[]
          data.fault = data.fault.map(data=>{
            return JSON.stringify(data)
          })
          } catch(error){
            throw error(error)
          }
          const deviceList:any[] = []   
          deviceList.push(data)  
          terminalA.devices = [...terminalA.devices,...deviceList]
          data.terminalIDuse= data.id
          delete(data.id)
        //一对多,一个terminal对应多个devices
          this.bufferList.add(data.terminalIDuse)
          // await this.redisCacheHelper.set(data.terminalIDuse,terminalA)
          await this.redisCacheHelper.set(data.terminalIDuse,terminalA)        

          // return this.terminal.save(terminalA) //存储第二条,第一条devices的 terminalID就会被覆盖掉
      }else{
        console.log(`无效ID:${data.id}`);
      }
    })
  }
  // @Cron("* */5 * * * *")
  @Cron("0 */5 * * * *")
  async saveEMS123(id) {
    this.bufferList.forEach(async data=>{
      const timeStamps:number = parseInt(moment().format("X"))      
      let newdata:any = await this.redisCacheHelper.getAsObj(`${data}`)
      if(newdata){
        if(timeStamps-(newdata.devices[newdata.devices.length-1].timeStamp)<300){
          newdata.devices[newdata.devices.length-1].timeStamp=timeStamps
          this.terminal.save(newdata)
          this.redisCacheHelper.del(`${data}`)
        }
      }        
    })
    this.bufferList.clear()
  }
  async findAll(id):Promise<EMS123[]> {
    return this.ems.findBy(id);
  }
  async getHomeElectricity(body,res){  //历史图表信息    
    let batteryDataIn:number=0
    let preBatteryDataIn:number=0
    let batteryDataOut:number=0
    let preBatteryDataOut:number=0
    let solarData:number=0
    let preSolarData:number=0
    let gridDataIn:number=0
    let gridDataOut:number=0
    let evData:number=0
    let homeData:number=0
    let preHomeData:number=0
    const CalculateArea = (pre,cur)=>{
      return (Math.min(pre,cur)+Math.abs(cur-pre)/2)/12
    }
    if(body.startTime&& body.endTime){
      let newdata:dashboardElectricityDTO={
        HOMEdata:[],
        EVdata:[],
        GRIDdata:[],
        PVdata:[],
        BATdata:[]
      }
      const datas = await this.ems.find({
        where:{
          terminalIDuse:body.id,
          timeStamp:Between(body.startTime,body.endTime)
        },
        order:{
          timeStamp:"ASC"
        }
        // skip:(body.current-1)* body.pageSize,       //分页
        // take:body.pageSize
    })
    if(!datas.length){return res.json({code:200,message:"无数据"})}
    datas.map((val,index)=>{
      let newpv=0
      let newev=0
      let newbat=0
      for (let i=0;i<val.PV.length/3 ;i++){
        let data:any = ''.concat(`${val.PV[i*3]},`,`${val.PV[i*3+1]},`,`${val.PV[i*3+2]}`)             
        data = JSON.parse(data)
        newpv+= data.power
        // solarData += newpv
      }

      for (let i=0;i<val.EV.length/5 ;i++){
        let data:any = ''.concat(`${val.EV[i*5]},`,`${val.EV[i*5+1]},`,`${val.EV[i*5+2]},`,`${val.EV[i*5+3]},`,`${val.EV[i*5+4]}`)     
        data = JSON.parse(data)
        newev+= data.power
        evData += newev
      }
      for (let i=0;i<val.BAT.length/7 ;i++){
        let data:any = ''.concat(`${val.BAT[i*7]},`,`${val.BAT[i*7+1]},`,`${val.BAT[i*7+2]},`,`${val.BAT[i*7+3]},`,`${val.BAT[i*7+4]},`,`${val.BAT[i*7+5]},`,`${val.BAT[i*7+6]}`)     
        data = JSON.parse(data)
        newbat += data.power
        if(data.power>0){
          batteryDataOut += data.power
        }else{
          batteryDataIn -= data.power
        }
      }
      newdata.HOMEdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,parseFloat((val.HOME.home.power+val.HOME.critical.power).toFixed(2))])
      newdata.GRIDdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,val.GRID.power])
      newdata.PVdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,newpv])
      newdata.EVdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,newev])
      newdata.BATdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,newbat])
      if(val.GRID.power>0){
        gridDataOut += val.GRID.power
      }else{
        gridDataIn -= val.GRID.power
      }
      // homeData += val.HOME.home.power+val.HOME.critical.power
      homeData += CalculateArea(val.HOME.home.power+val.HOME.critical.power,preHomeData)
      preHomeData = CalculateArea(val.HOME.home.power+val.HOME.critical.power,preHomeData)
      //计算光伏总用电
      solarData += CalculateArea(newpv,preSolarData)
      preSolarData = newpv
    })
    res.json({
      data:{
        ...newdata,
        // solarData:parseFloat((solarData/12).toFixed(2)),
        solarData:parseFloat((solarData).toFixed(2)),
        gridDataIn:parseFloat((gridDataIn/12).toFixed(2)),
        gridDataOut:parseFloat((gridDataOut/12).toFixed(2)),
        batteryDataIn:parseFloat((batteryDataIn/12).toFixed(2)),
        batteryDataOut:parseFloat((batteryDataOut/12).toFixed(2)),
        evData:parseFloat((evData/12).toFixed(2)),
        // homeData:parseFloat((homeData/12).toFixed(2))
        homeData:parseFloat((homeData).toFixed(2))
      },
      code:200,
      length:datas.length
    })
    
    }else{
      
    }
  }
  
  findOne(id: number) {
    return `This action returns a #${id} mqtt`;
  }

  update(id: number, updateMqttDto: UpdateMqttDto) {
    return `This action updates a #${id} mqtt`;
  }

  remove(id: number) {
    return `This action removes a #${id} mqtt`;
  }
}
