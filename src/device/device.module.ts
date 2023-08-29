import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { Terminal } from './entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/entities';

@Module({
  imports:[TypeOrmModule.forFeature([Terminal,User])],
  controllers: [DeviceController],
  providers: [DeviceService]
})
export class DeviceModule {}
