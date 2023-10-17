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
import { type } from 'os';

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
        // console.log(`无效ID:${data.id}`);
      }
    })
  }
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
    //month
    let newMonthdatas:object = {}
    let newYearDatas:object = {}
       //零时统计数据
    let monthBatteryDataIn:number[]
    let currentMonthBatteryDataIn:number=0
    let monthGridDataIn:number[]
    let currentMonthGridDataIn:number=0
    let monthHomeData:number[]=[]
    let currentMonthHomeData:number=0
    let dayGridReturnDataOut = []
    let dayGridReturnDataIn = []
    let dayBatteryReturnDataIn = []
    let dayBatteryReturnDataOut = []
    let daySolarReturnData = []
    let dayHomeReturnData = []
    let dayEVReturnData = []
    const dayTime = (body.endTime-body.startTime)/86400   //一天时间    
    for(let i=0;i<dayTime;i++){
      if(dayTime>13&& dayTime<32){//月统计
        if(!newMonthdatas[0]){
          newMonthdatas[i+1] = []
        }
      }else{//年统计
        newYearDatas = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]}
      }
    }    
    const CalculateArea = (...argument: number[])=>{   //传入功率kw,计算出每五分钟的用电量
      const currentElectricity = argument.reduce((total:number,currentValue:number,index:number,arr:number[])=>{
      return total+ (Math.min(arr[index?index-1:0],currentValue)+Math.abs(currentValue-arr[index?index-1:0])/2)/12
    },0)
      return currentElectricity
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
      let newpv=0   //统计图表时间后的数据
      let newev=0
      let newbat=0
      let pvdataold:any     //原始数据json转换后
      let evdataold:any
      let batdataold:any

      if(val.EV){
        for (let i=0;i<val.EV.length/5 ;i++){
          evdataold = ''.concat(`${val.EV[i*5]},`,`${val.EV[i*5+1]},`,`${val.EV[i*5+2]},`,`${val.EV[i*5+3]},`,`${val.EV[i*5+4]}`)     
          evdataold = [JSON.parse(evdataold)]                    
          for(i=0;i<evdataold.length;i++){
            newev+= evdataold[i].power
            evData += evdataold[i].power
          }
        }
        dayEVReturnData.push(newev)
      }

      for (let i=0;i<val.BAT.length/7 ;i++){
        batdataold = ''.concat(`${val.BAT[i*7]},`,`${val.BAT[i*7+1]},`,`${val.BAT[i*7+2]},`,`${val.BAT[i*7+3]},`,`${val.BAT[i*7+4]},`,`${val.BAT[i*7+5]},`,`${val.BAT[i*7+6]}`)     
        batdataold = [JSON.parse(batdataold)] //每一个电池
        for(i=0;i<batdataold.length;i++){
          newbat += batdataold[i].power
          if(batdataold[i].power>0){
            batteryDataOut += batdataold[i].power
            dayBatteryReturnDataOut.push(batdataold[i].power)
          }else{
            batteryDataIn -= batdataold[i].power
            dayBatteryReturnDataIn.push(batdataold[i].power)
          }
        }
      }      
      
      for (let i=0;i<val.PV.length/3 ;i++){
        pvdataold = ''.concat(`${val.PV[i*3]},`,`${val.PV[i*3+1]},`,`${val.PV[i*3+2]}`)             
        pvdataold = [JSON.parse(pvdataold)]
        for(i=0;i<pvdataold.length;i++){
          newpv+= pvdataold[i].power
          
          if(batdataold[0].power>=0){//???
            daySolarReturnData.push(newpv)
            // solarData += CalculateArea(newpv,preSolarData)
            // preSolarData = newpv
          }else{
            // solarData += CalculateArea(newpv+batdataold[i].power,preSolarData)
            // preSolarData = newpv+batdataold[i].power
            daySolarReturnData.push(newpv+batdataold[i].power)
          }
        }
      }
      if(val.GRID.power>0){
        dayGridReturnDataOut.push(val.GRID.power)
        // gridDataOut += val.GRID.power
      }else{
        dayGridReturnDataIn.push(val.GRID.power)
        // gridDataIn -= val.GRID.power
      }
      dayHomeReturnData.push(val.HOME.home.power+val.HOME.critical.power)
      // homeData += CalculateArea(val.HOME.home.power+val.HOME.critical.power,preHomeData)
      // preHomeData = CalculateArea(val.HOME.home.power+val.HOME.critical.power,preHomeData)
      

      //日统计
      if(dayTime<=1){
        newdata.HOMEdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,parseFloat((val.HOME.home.power+val.HOME.critical.power).toFixed(2))])
        newdata.GRIDdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,val.GRID.power])
        newdata.PVdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,newpv])
        newdata.EVdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,newev])
        newdata.BATdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`,newbat])     
      }else if(dayTime<=31){//月统计
        newMonthdatas[moment(val.timeStamp*1000).date()].push(val.HOME.home.power+val.HOME.critical.power)
      }else{  //年统计
        newYearDatas[moment(val.timeStamp*1000).month()+1].push(val.HOME.home.power+val.HOME.critical.power)
      }
    })
    gridDataOut = CalculateArea(...dayGridReturnDataOut)
    gridDataIn = CalculateArea(...dayGridReturnDataIn)
    batteryDataIn = CalculateArea(...dayBatteryReturnDataIn)
    batteryDataOut = CalculateArea(...dayBatteryReturnDataOut)
    homeData = CalculateArea(...dayHomeReturnData)
    solarData = CalculateArea(...daySolarReturnData)
    evData = CalculateArea(...dayEVReturnData)
    if(dayTime<=1){
      res.json({
        data:{
          ...newdata,
          // solarData:parseFloat((solarData/12).toFixed(2)),
          solarData:parseFloat((solarData).toFixed(2)),
          gridDataIn:parseFloat(gridDataIn.toFixed(2)),
          gridDataOut:parseFloat(gridDataOut.toFixed(2)),
          batteryDataIn:parseFloat(batteryDataIn.toFixed(2)),
          batteryDataOut:parseFloat(batteryDataOut.toFixed(2)),
          evData:parseFloat(evData.toFixed(2)),
          homeData:parseFloat(homeData.toFixed(2))
        },
        code:200,
        length:datas.length
      })
    }else if(3<dayTime && dayTime<=32){      
      let monthReturnData = []
      Object.keys(newMonthdatas).map(key=>{     
        const data = CalculateArea(...newMonthdatas[key])
        monthReturnData.push(data)
      })
      res.json({
          monthHomeData:monthReturnData,
          solarData:parseFloat((solarData).toFixed(2)),
          gridDataIn:parseFloat(gridDataIn.toFixed(2)),
          gridDataOut:parseFloat(gridDataOut.toFixed(2)),
          batteryDataIn:parseFloat(batteryDataIn.toFixed(2)),
          batteryDataOut:parseFloat(batteryDataOut.toFixed(2)),
          evData:parseFloat(evData.toFixed(2)),
          homeData:parseFloat(homeData.toFixed(2)),
          code:200,
          length:Math.round(dayTime)
      })
    }else{//年统计
      let yearReturnData = []
      Object.keys(newYearDatas).map(key=>{             
        const data = CalculateArea(...newYearDatas[key])        
        yearReturnData.push(data)
      })      
      res.json({
          yearHomeData:yearReturnData,
          solarData:parseFloat((solarData).toFixed(2)),
          gridDataIn:parseFloat(gridDataIn.toFixed(2)),
          gridDataOut:parseFloat(gridDataOut.toFixed(2)),
          batteryDataIn:parseFloat(batteryDataIn.toFixed(2)),
          batteryDataOut:parseFloat(batteryDataOut.toFixed(2)),
          evData:parseFloat(evData.toFixed(2)),
          homeData:parseFloat(homeData.toFixed(2)),
          code:200,
          length:Math.round(dayTime)
      })
    }
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
