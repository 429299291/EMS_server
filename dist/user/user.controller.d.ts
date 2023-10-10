import { UserService } from './user.service';
import { CreateUserDto, getUsersDto } from './dto/user.dto';
import { EmailService } from 'src/email/email.service';
import { RedisCacheHelper } from '@jasonsoft/nestjs-redis';
export declare class UserController {
    private userService;
    private readonly emailService;
    private readonly redisCacheHelper;
    constructor(userService: UserService, emailService: EmailService, redisCacheHelper: RedisCacheHelper);
    getUserByName(params: any): any;
    currentUser({ email }: {
        email: any;
    }): any;
    getUserAll(page: any, pageSize: any): any;
    getUsers(body: getUsersDto): any;
    delUser({ id }: {
        id: any;
    }): any;
    updateUser(body: CreateUserDto, { id }: {
        id: any;
    }): any;
    register(body: CreateUserDto, res: any): Promise<any>;
    registerEmail({ email }: {
        email: any;
    }, res: any): Promise<any>;
}
