import { Controller, Get,Post,Request,Query,Body,Headers,Param,Response, UseGuards  } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get('/getUserByName/:username')
    getUserByName(@Param() params):any{     
        let username = params.username
        return this.userService.getUserByName(username)
        // return this.userService.findAll()
    }
    @Get('/currentUser/:email')
    currentUser(@Param() {email}):any{             
        return this.userService.getUserByEmail(email)
    }
    
    @Get('/all')
    @UseGuards(RoleGuard)
    getUserAll():any{
        return this.userService.getUserAll()
    }
    @Get('/delete/:id')
    @UseGuards(AuthGuard)
    delUser(@Param() {id}):any{      
        return this.userService.delUser(id)
    }
    @Post('/update/:id')
    @UseGuards(AuthGuard)
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
