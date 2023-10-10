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
import { EmailModule } from './email/email.module';

//email
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';



const redisOptions:RedisModuleOptions={
  port:6379,
  host:"47.106.120.119",
  // host:"127.0.0.1",
  password:"xuheng8888!"
}

// @Module({
//   imports: [TypeOrmModule.forRoot({
//     type:"mysql",
//     host:"rm-cn-uqm3a2odq001d67o.rwlb.rds.aliyuncs.com",
//     port:3306,
//     username:"root",
//     password:"zhudong520!",
//     database:"ems",//数据库name
//     retryDelay:500,//重连接间隔
//     retryAttempts:1,//重连接次数
//     synchronize:true,//实体同步到数据库
//     autoLoadEntities:true//自动加载实体
//   }),DashboardModule,UserModule, AuthModule, UploadModule, MqttModule, TerminalModule,RedisModule.forRoot(redisOptions)],
// })
@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:"rm-cn-5yd3et1kl0001gno.rwlb.rds.aliyuncs.com",
    port:3306,
    username:"ems",
    password:"xuheng8888!",
    database:"ems",//数据库name
    retryDelay:500,//重连接间隔
    retryAttempts:1,//重连接次数
    synchronize:true,//实体同步到数据库
    // entities: [DashboardModule,UserModule],
    autoLoadEntities:true//自动加载实体
  }),
  MailerModule.forRoot({//邮箱服务
    transport: {
      host: 'smtp.exmail.qq.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: 'neuron@alwayscontrol.com.cn',
        pass: 'Xuheng8888',
      },
    },
    defaults: {
      from: '"旭衡科技" <neuron@alwayscontrol.com.cn>',
    },
    preview: false,
    template: {
      dir: process.cwd() + '/template/',
      adapter: new PugAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  }),
  DashboardModule,UserModule, AuthModule, UploadModule, MqttModule, TerminalModule,RedisModule.forRoot(redisOptions), EmailModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
