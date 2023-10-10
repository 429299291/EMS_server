import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Response
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/create-auth.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiTags("login")
  signIn(@Body() signInDto: loginDTO,@Response() res) {       
    return this.authService.signIn(signInDto.email, signInDto.password,res);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiTags("login")
  getProfile(@Request() req) {
    return req.user;
  }
}