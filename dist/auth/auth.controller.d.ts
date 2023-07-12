import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>, res: any): Promise<{
        code: number;
        message: string;
    }>;
    getProfile(req: any): any;
}
