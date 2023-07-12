import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { Dashboard } from './dashboard/entities/ entities';
import { EmsModule } from './ems/ems.module';
import { AuthModule } from './auth/auth.module';

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
  }),DashboardModule,UserModule, EmsModule, AuthModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
