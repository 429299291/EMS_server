import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserByName(params: any): any;
    currentUser({ email }: {
        email: any;
    }): any;
    getUserAll(page: any, pageSize: any): any;
    getUsers(body: any): any;
    delUser({ id }: {
        id: any;
    }): any;
    updateUser(body: CreateUserDto, { id }: {
        id: any;
    }): any;
    register(body: CreateUserDto, res: any): any;
    login(body: any, res: any): any;
}
