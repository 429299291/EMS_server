import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/entities';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports:[UserService],//对外共享模块
  providers: [UserService]
})
export class UserModule {}
