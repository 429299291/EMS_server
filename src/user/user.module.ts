import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/entities';
import { EmailModule } from 'src/email/email.module';
import { Terminal } from 'src/terminal/entities/device.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Terminal]),EmailModule],
  controllers: [UserController],
  exports:[UserService],//对外共享模块
  providers: [UserService]
})
export class UserModule {}
