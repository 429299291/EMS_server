import { Controller, Get,Post,Request,Query,Body,Headers,Param  } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get('/add')
    addUser():any{      
        return this.userService.addUser()
        // return this.userService.findAll()
    }
    @Post('/login')
    login(param):any{      
        return this.userService.findOne(param)
        // return this.userService.findAll()
    }
}
