import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Dashboard } from './entities/ entities';

@Module({
  imports:[TypeOrmModule.forFeature([Dashboard])],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
