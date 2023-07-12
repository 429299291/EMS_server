import { Repository } from 'typeorm';
import { User } from './ entities/entities';
export declare class UserService {
    private readonly user;
    constructor(user: Repository<User>);
    getUserAll(): Promise<User[]>;
    getUserByName(name: string): Promise<User[]>;
    getUserByEmail(email: string): Promise<User[]>;
    findOne(email: string): Promise<User | null>;
    login(body: any, res: any): Promise<{
        code: number;
        message: string;
    }>;
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
