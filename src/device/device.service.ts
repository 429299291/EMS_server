import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { User } from 'src/user/entities/entities';
import { InjectRepository } from '@nestjs/typeorm';
import {JsonContains, Like, Repository} from 'typeorm'

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device) private readonly device:Repository<Device>,
    @InjectRepository(User) private readonly user:Repository<User>
  ){}
  async create(createDeviceDto: CreateDeviceDto) {  
    const device = await this.device.findOneBy({ deviceId:createDeviceDto.deviceId})    
    if(device !== null){
      return {code:200,message:"设备已经注册"}
    }else{
      const user = await this.user.findOneBy({ id:createDeviceDto.userId})    
      const deviceList:any[] = []      
      await this.device.save(createDeviceDto)
      deviceList.push(createDeviceDto)
      user.devices = deviceList
      return this.user.save(user) 
    }
  }

  findAll() {
    return this.device.find();
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
