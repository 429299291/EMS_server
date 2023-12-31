import { Repository } from 'typeorm';
import { User } from './entities/entities';
import { resType } from 'src/constants/apiType';
export declare class UserService {
    private readonly user;
    constructor(user: Repository<User>);
    getUserAll(body: any): Promise<{
        data: User[];
        total: number;
    }>;
    getUsers(body: any): Promise<resType>;
    getUserByName(name: string): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
    findOne(email: string): Promise<User | null>;
    register(body: any, res: any): Promise<void>;
    delUser(id: string): Promise<{
        code: number;
        message: string;
    }>;
    updateUser(body: any): Promise<{
        code: number;
        message: string;
    }>;
    remove(id: number): Promise<void>;
}
