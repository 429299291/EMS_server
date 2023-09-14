import { Controller, Get,Post,Request,Query,Body,Headers,Param,Response, UseGuards,ParseIntPipe  } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/user.dto';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get('/getUserByName/:username')
    @ApiTags("user")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary:"测试接口"
    })
    getUserByName(@Param() params):any{     
        let username = params.username
        return this.userService.getUserByName(username)
        // return this.userService.findAll()
    }

    @Get('/currentUser/:email')
    @ApiTags("user")
    @UseGuards(AuthGuard)
    @ApiParam({
        name:"email",
        description:"email",
        required:true
    })
    currentUser(@Param() {email}):any{        
        return this.userService.getUserByEmail(email)        
    }
    
    @Get('/all/:page/:pageSize')
    @UseGuards(AuthGuard)
    getUserAll(@Param("page",ParseIntPipe) page,@Param("pageSize",ParseIntPipe) pageSize):any{
        return this.userService.getUserAll({page,pageSize})
    }

    @Post('/getUsers')
    @UseGuards(AuthGuard)
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
    @ApiTags("user")
    @ApiParam({
        name:"id",
        description:"用户ID",
        required:true
    })
    updateUser(@Body() body,@Param() {id}):any{ 
        return this.userService.updateUser({id,...body})
    }

    @Post('/register')
    @ApiTags("user")
    public register(@Body() body:CreateUserDto,@Response() res):any{                      
        return this.userService.register(body,res)
    }

    @Post('/login')
    login(@Body() body,@Response() res):any{              
        return this.userService.login(body,res)
    }
}
