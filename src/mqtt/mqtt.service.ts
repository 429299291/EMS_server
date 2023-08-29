import { Injectable } from '@nestjs/common';
import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';
import { EMS123 } from './entities/mqtt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {JsonContains, Like, Repository} from 'typeorm'
import { Terminal } from 'src/terminal/entities/device.entity';

@Injectable()
export class MqttService {
  constructor(
    @InjectRepository(EMS123) private readonly ems:Repository<EMS123>,
    @InjectRepository(Terminal) private readonly terminal:Repository<Terminal>
  ){}

  async create(createMqttDto: CreateMqttDto) {        
    let data:any = JSON.parse(createMqttDto.toString())
    console.log(data.id);
    
    return this.terminal.findOneBy({id:data.id}).then(async terminal=>{
      if(terminal){
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
          data.GRID = data.GRID.map(data=>{
            return JSON.stringify(data)
          })
          data.HOME = data.HOME.map(data=>{
            return JSON.stringify(data)
          })
          data.INV = data.INV?data.INV.map(data=>{
            return JSON.stringify(data)
          }):[]
          data.fault = data.fault.map(data=>{
            return JSON.stringify(data)
          })
          } catch(error){
            throw error(error)
          }
          delete(data.id)
          const deviceList:any[] = []      
          deviceList.push(data)
          terminal.devices = deviceList
          await this.ems.save(data)
          return this.terminal.save(terminal)
      }
      
    })
  }

  async findAll(id):Promise<EMS123[]> {        
    return this.ems.findBy(id);
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
