// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email, pass,res) {
    const user = await this.UserService.findOne(email)    
    if(user == null)return res.json({code:200,message:"用户不存在"})
    const payload = { sub: user.id, username: user.name };
    const tokenPay = await this.jwtService.signAsync(payload)    
    bcrypt.compare(pass, user.password,(err, result) =>{      
      if(result){ 
        res.json({
          code:200,
          access_token: tokenPay
        })
      }else{
        res.json({
          code:204,
          message:"密码错误"
        })           
        // throw new UnauthorizedException();
      }
    });

    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }
}