import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { Dashboard } from './dashboard/entities/ entities';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { MqttModule } from './mqtt/mqtt.module';
import { TerminalModule } from './terminal/device.module';
import { RedisModule,RedisModuleOptions } from '@jasonsoft/nestjs-redis';

const redisOptions:RedisModuleOptions={
  port:6379,
  // host:"47.106.120.119",
  host:"127.0.0.1",
  password:"xuheng8888!"
}

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:"rm-cn-uqm3a2odq001d67o.rwlb.rds.aliyuncs.com",
    port:3306,
    username:"root",
    password:"zhudong520!",
    database:"ems",//数据库name
    retryDelay:500,//重连接间隔
    retryAttempts:1,//重连接次数
    synchronize:true,//实体同步到数据库
    // entities: [DashboardModule,UserModule],
    autoLoadEntities:true//自动加载实体
  }),DashboardModule,UserModule, AuthModule, UploadModule, MqttModule, TerminalModule,RedisModule.forRoot(redisOptions)],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
