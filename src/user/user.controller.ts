import { Controller, Get,Post,Request,Query,Body,Headers,Param,Response  } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get('/getUserByName/:username')
    getUserByName(@Param() params):any{     
        let username = params.username
        return this.userService.getUserByName(username)
        // return this.userService.findAll()
    }
    @Get('/all')
    getUserAll():any{
        return this.userService.getUserAll()
    }
    @Get('/delete/:id')
    delUser(@Param() {id}):any{      
        return this.userService.delUser(id)
    }
    @Post('/update/:id')
    updateUser(@Body() body,@Param() {id}):any{ 
        return this.userService.updateUser({id,...body})
    }
    @Post('/register')
    register(@Body() body,@Response() res):any{              
        return this.userService.register(body,res)
    }
    @Post('/login')
    login(@Body() body,@Response() res):any{              
        return this.userService.login(body,res)
    }
}
