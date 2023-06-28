import { Repository } from 'typeorm';
import { User } from './ entities/entities';
export declare class UserService {
    private readonly user;
    constructor(user: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    login(param: any): Promise<User | null>;
    addUser(): Promise<User>;
    remove(id: number): Promise<void>;
}
