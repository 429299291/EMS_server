import { Controller, Get,Post,Request,Query,Body,Headers,Param,Response, UseGuards,ParseIntPipe  } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto,getUsersDto } from './dto/user.dto';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';
import { mathRand } from 'src/tool';
import { RedisCacheHelper } from '@jasonsoft/nestjs-redis';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService,
        private readonly emailService: EmailService,
        private readonly redisCacheHelper: RedisCacheHelper
    ){}
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
    @ApiTags("user")
    @UseGuards(AuthGuard)
    getUserAll(@Param("page",ParseIntPipe) page,@Param("pageSize",ParseIntPipe) pageSize):any{
        return this.userService.getUserAll({page,pageSize})
    }

    @Post('/getUsers')
    @ApiTags("user")
    @UseGuards(AuthGuard)
    getUsers(@Body() body:getUsersDto):any{
        return this.userService.getUsers(body)
    }
    @Get('/delete/:id')
    @ApiTags("user")
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
    updateUser(@Body() body:CreateUserDto,@Param() {id}):any{ 
        return this.userService.updateUser({id,...body})
    }

    @Post('/register')
    @ApiTags("user")
    public async register(@Body() body:CreateUserDto,@Response() res):Promise<any>{
        if(body.emailCode === await this.redisCacheHelper.getAsObj(`${body.email}`)){
            return this.userService.register(body,res)
        }else{
            res.json({
                code:400,
                massage:"验证码错误"
            })
        }
    }

    @Get('/registerEmail/:email')
    @ApiTags("user")
    public async registerEmail(@Param() {email},@Response() res):Promise<any>{           
        const emailCode = mathRand(1000,9999)+''     
        await this.redisCacheHelper.set(email,emailCode)
        const data = await this.emailService.example({
            to:email,
            subject:"旭衡科技注册验证码",
            text:emailCode,
            html:`注册验证码:<b>${emailCode}</b>`
          },res)
    }
}
