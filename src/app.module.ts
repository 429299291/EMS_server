import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    port:3000,
    username:"root",
    password:"",
    database:"库名",
    retryDelay:500,//重连接间隔
    retryAttempts:10,//重连接次数
    synchronize:true,//实体同步到数据库
    autoLoadEntities:true//自动加载实体
  }),DashboardModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
