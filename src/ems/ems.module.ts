import { Module } from '@nestjs/common';
import { EmsService } from './ems.service';
import { EmsController } from './ems.controller';

@Module({
  controllers: [EmsController],
  providers: [EmsService]
})
export class EmsModule {}
