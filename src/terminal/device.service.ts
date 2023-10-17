import { Injectable } from '@nestjs/common';
import { CreateDeviceDto,updateTerminalDTO } from './dto/create-device.dto';
import { Terminal } from './entities/device.entity';
import { User } from 'src/user/entities/entities';
import { InjectRepository } from '@nestjs/typeorm';
import {JsonContains, Like, Repository,Not} from 'typeorm'

@Injectable()
export class TerminalService {
  constructor(
    @InjectRepository(Terminal) private readonly terminal:Repository<Terminal>,
    @InjectRepository(User) private readonly user:Repository<User>
  ){}
  async create(createDeviceDto: CreateDeviceDto) {  
    const device = await this.terminal.findOneBy({ id:createDeviceDto.id})
    if(!createDeviceDto.userId){
      return {
        code:204,
        message:"userid 必须传递"
      }
    }
    if(device !== null){
      return {code:200,message:"设备已经注册"}
    }else{
      const user = await this.user.findOne({
        // id:createDeviceDto.userId
        where: { id: createDeviceDto.userId},
        relations: ['terminals'],
      })    
      const deviceList:any[] = []      
      console.log(createDeviceDto);
      
      await this.terminal.save(createDeviceDto)
      deviceList.push(createDeviceDto)      
      if(user){//注册到同一个人名下
        user.terminals = [...user.terminals,...deviceList]
      }      
      return this.user.save(user) 
    }
  }
  async putTerminal(putDeviceDto:updateTerminalDTO){    
    const terminal = await this.terminal.findOneBy({ id:putDeviceDto.id})
    if(terminal){
      this.terminal.update(putDeviceDto.id,{...putDeviceDto})
      // if(putDeviceDto.userId){
      //   // 暂时无法修改userid
      //   const currentUser =await this.user.findOneBy({id:putDeviceDto.userId})
      //   this.user.save(terminal)
      // }
      return { code:200,message:"修改成功"}
    }else{
      return { code :204,message:"无效ID"}
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
  }else if(body.id&&body.id!==''){        
    // const data = await this.terminal.findOneBy({id:body.id},)    
    const data = await this.terminal.findOne({
      where: { id: body.id},
      relations: ['devices'],
    })
    const total = await this.terminal.countBy({id:body.id})         
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

  update(id: number, updateDeviceDto: updateTerminalDTO) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
