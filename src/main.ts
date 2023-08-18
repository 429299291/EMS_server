import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
const MiddleWareAll =(req:any,res:any,next:any)=>{
  console.log('全局中间件');  
  next()
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,'../files/images/avatar'),{
    // prefix:"api"
  })
  app.enableCors()//允许跨域
  app.use(MiddleWareAll)
  app.useGlobalPipes(new ValidationPipe())//管道验证
  app.enableCors();
  app.setGlobalPrefix("api")
  await app.listen(3000);
}
bootstrap();
