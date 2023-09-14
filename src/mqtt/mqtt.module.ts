import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EMS123 } from './entities/mqtt.entity';
import { Terminal } from 'src/terminal/entities/device.entity';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports:[TypeOrmModule.forFeature([EMS123,Terminal]),ScheduleModule.forRoot()],
  controllers: [MqttController],
  providers: [MqttService]
})
export class MqttModule {}
