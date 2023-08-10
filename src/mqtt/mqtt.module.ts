import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EMS123 } from './entities/mqtt.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EMS123])],
  controllers: [MqttController],
  providers: [MqttService]
})
export class MqttModule {}
