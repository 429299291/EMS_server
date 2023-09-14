import { AuthService } from './auth.service';
import { loginDTO } from './dto/create-auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: loginDTO, res: any): Promise<any>;
    getProfile(req: any): any;
}
