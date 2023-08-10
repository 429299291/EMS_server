import { Repository } from 'typeorm';
import { User } from './entities/entities';
export declare class UserService {
    private readonly user;
    constructor(user: Repository<User>);
    getUserAll(body: any): {
        then<TResult1 = User[], TResult2 = never>(onfulfilled?: (value: User[]) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<User[] | TResult>;
        finally(onfinally?: () => void): Promise<User[]>;
        [Symbol.toStringTag]: string;
    };
    getUserByName(name: string): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
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
