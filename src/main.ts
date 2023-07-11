import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const MiddleWareAll =(req:any,res:any,next:any)=>{
  console.log('全局中间件');
  console.log(req.path);
  
  next()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(MiddleWareAll)
  app.enableCors();
  app.setGlobalPrefix("api")
  await app.listen(3000);
}
bootstrap();
