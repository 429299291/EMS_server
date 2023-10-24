import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const listenPort = 3000
const logger = new Logger("main.ts")
const MiddleWareAll =(req:any,res:any,next:any)=>{  
  // 全局中间件
  next()
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //swagger 
  const config = new DocumentBuilder()
  .setTitle('EMS 云平台API')
  .setDescription('EMS web以及app API文档')
  .setVersion('1.0')
  .addTag('ems')
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useStaticAssets(join(__dirname,'../files/images/avatar'),{
    // prefix:"api"
  })
  app.enableCors()//允许跨域
  app.use(MiddleWareAll)
  app.useGlobalPipes(new ValidationPipe())//管道验证
  app.enableCors();
  app.setGlobalPrefix("api")
  logger.log(`listen:http://localhost:${listenPort}----------------`)
  await app.listen(listenPort);
}
bootstrap();
