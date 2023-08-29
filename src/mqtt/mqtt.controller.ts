import { Controller, Get,Post,Body, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';
import * as mqtt from "mqtt"
let client 
@Controller('ems')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {
    // this.mqttService.create({name:"ems111"})'
    client  = mqtt.connect('mqtt://47.106.120.119',{
    username:"ems",
    password:"xuheng8888",
    protocolId:'MQTT',
    clientId: 'EMS-12345',
  })
    client.on('connect', function () {
      client.subscribe(`HEMS`, function (err) {
        if (!err) {
            // client.publish(`EMS/${(Math.random()*100000).toFixed(0)}`,JSON.stringify({
            //   name:`EMS-23`,
            //   userId:'1b68ccbb-f276-4a98-9523-156fc412ab51',  //终端所有权ID
            //   id:(Math.random()*100000).toFixed(0),//终端识别ID
            //   timeStamp:Math.floor(new Date().getTime()/1000),
            //   location:"深圳",
            //   supplier:'voltronicpower',
            //   WorkingMode:Math.ceil(Math.random()*4-1),
            // }),{qos:1,retain:true})

          // client.publish('HEMS', JSON.stringify(
          //   {
          //     name:`EMS123-1`,
          //     userId:'1b68ccbb-f276-4a98-9523-156fc412ab51',  //终端所有权ID
          //     // id:(Math.random()*100000).toFixed(0),//终端识别ID
          //     timeStamp:1690774581,    //时间戳十位
          //     WorkingMode:1,
          //     BAT:[
          //       {     //电池
          //         id:'bat001',  
          //         power:19,     //功率  
          //         volt:22,
          //         SOC:60,     //电池容量
          //         SOH:88,     //电池健康度
          //         maxTemp:40,    //电池温度 
          //         minTemp:20,
          //       },
          //         ],
          //     EV:[{     //充电桩
          //       id:'ev001',
          //       status:0,
          //       volt:40,
          //       power:16,
          //       electricCurrent:40,   //电流
          //     }],
          //     GRID:[{
          //       power:2,
          //       volt:22    //并网离网   日月元没有提供
          //     }],
          //     PV:[{      //光伏
          //       id:'ev001',
          //       volt:65,
          //       power:14,
          //     }],
          //     HOME:[{
          //       volt:40,
          //       power:11
          //     }],
          //     INV:[{     //逆变器----可能取消
          //       id:'home001',
          //       volt:40,
          //       power:10,
          //       // electricCurrent:25,   //电流
          //       // volt:400   //电压
          //     }],
          //     fault:[
          //       {
          //         id:'213123',
          //         name:'光伏1号',
          //         errorCode:204,
          //         // status:"正在维修"   //不确定
          //       },
          //       {
          //         id:"434242",
          //         name:'充电桩2号',
          //         errorCode:204,
          //         // status:"维修等待",
          //       }            
          //     ],
          //   }
          // ),{qos:1,retain:false})
        }
      })
    })
    
    client.on('message', (topic, message)=> {
      // message is Buffer      
      // console.log(message);
      // console.log(message.toString());
      this.mqttService.create(message)
      // client.end()
    })    
  }  

  @Post()
  getDevices(@Body() body) {    
    client.publish(`EMS/${(Math.random()*100000).toFixed(0)}`,JSON.stringify({
      ...body,
      name:`EMS-110`,
      timeStamp:Math.floor(new Date().getTime()/1000),
    }),{qos:1,retain:true})
    return {
      success:true,
    }
  }

  @Get(":id")
  findAlls(@Param() params) {    
    return this.mqttService.findAll(params);
  }

  @MessagePattern('createMqtt')
  create(@Payload() createMqttDto: CreateMqttDto) {
    return this.mqttService.create(createMqttDto);
  }  

  // @MessagePattern('findAllMqtt')
  // findAll() {
  //   return this.mqttService.findAll();
  // }

  @MessagePattern('findOneMqtt')
  findOne(@Payload() id: number) {
    return this.mqttService.findOne(id);
  }

  @MessagePattern('updateMqtt')
  update(@Payload() updateMqttDto: UpdateMqttDto) {
    return this.mqttService.update(updateMqttDto.id, updateMqttDto);
  }

  @MessagePattern('removeMqtt')
  remove(@Payload() id: number) {
    return this.mqttService.remove(id);
  }
}


