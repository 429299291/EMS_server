import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Terminal } from './entities/device.entity';
import { User } from 'src/user/entities/entities';
import { InjectRepository } from '@nestjs/typeorm';
import {JsonContains, Like, Repository,Not} from 'typeorm'

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Terminal) private readonly terminal:Repository<Terminal>,
    @InjectRepository(User) private readonly user:Repository<User>
  ){}
  async create(createDeviceDto: CreateDeviceDto) {  
    const device = await this.terminal.findOneBy({ terminalID:createDeviceDto.terminalID})    
    if(device !== null){
      return {code:200,message:"设备已经注册"}
    }else{
      const user = await this.user.findOneBy({ id:createDeviceDto.userId})    
      const deviceList:any[] = []      
      await this.terminal.save(createDeviceDto)
      deviceList.push(createDeviceDto)
      user.terminals = deviceList
      return this.user.save(user) 
    }
  }
  async getDevices(body) {
    if(body.name&&body.name !==''){
        const data = await this.terminal.find({
            // relations:["devices"],
            where:{
                name:Like(`%${body.name}%`)
            },
            skip:(body.current-1)* body.pageSize,       //分页
            take:body.pageSize
        })
        const total = await this.terminal.count({
            where:{
                name:Like(`%${body.name}%`)
            },
        })
        return {
            data,
            total,
            success:data?true:false
          }
    }else if(body.location&& body.location!==''){
      const data = await this.terminal.find({
          // relations:["devices"],
          where:{
              location:Like(`%${body.location}%`)
          },
          skip:(body.current-1)* body.pageSize,       //分页
          take:body.pageSize
      })
      const total = await this.terminal.count({
          where:{
              location:Like(`%${body.location}%`)
          },
      })            
      return {
          data,
          total,
          success:data?true:false
        }
  }else if(body.terminalID&&body.terminalID!==''){        
    const data = await this.terminal.findOneBy({terminalID:body.terminalID})
    const total = await this.terminal.countBy({terminalID:body.terminalID})         
    return {
        data:[data],
        total,
        success:data?true:false
    }
}else{              
        const data = await this.terminal.find({
            // relations:["devices"],
            where:{
              WorkingMode:Not(9)
            },
            skip:(body.current-1)* body.pageSize,       //分页
            take:body.pageSize
        })            
        const total = await this.terminal.count({
            where:{
                WorkingMode:Not(9)
            },
        })
        return {
            data,
            total,
            success:data?true:false
          }
    }
}
  findAll() {    
    return this.terminal.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
