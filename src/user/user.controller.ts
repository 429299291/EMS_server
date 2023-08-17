import { Controller, Get,Post,Request,Query,Body,Headers,Param,Response, UseGuards,ParseIntPipe  } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { log } from 'console';
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
    
    @Get('/all/:page/:pageSize')
    // @UseGuards(RoleGuard)
    getUserAll(@Param("page",ParseIntPipe) page,@Param("pageSize",ParseIntPipe) pageSize):any{
        return this.userService.getUserAll({page,pageSize})
    }
    @Post('/getUsers')
    @UseGuards(RoleGuard)
    getUsers(@Body() body):any{
        return this.userService.getUsers(body)
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
