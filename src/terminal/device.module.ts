import { Module } from '@nestjs/common';
import { TerminalService } from './device.service';
import { TerminalController } from './device.controller';
import { Terminal } from './entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/entities';

@Module({
  imports:[TypeOrmModule.forFeature([Terminal,User])],
  controllers: [TerminalController],
  providers: [TerminalService],
  exports:[TerminalService]
})
export class TerminalModule {}
