import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private UserService;
    private jwtService;
    constructor(UserService: UserService, jwtService: JwtService);
    signIn(email: any, pass: any, res: any): Promise<any>;
}
