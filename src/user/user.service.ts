import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import { User } from './ entities/entities';
import { json } from 'stream/consumers';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly user:Repository<User>){}
    findAll(): Promise<User[]> {
        return this.user.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.user.findOneBy({ id });
    }

    login(param): Promise<User | null> {
    this.user.findOneBy({ id:param.id })
    return 
    }

    addUser() {
        const data = new User()
        data.username = 'sdfsdf'
        data.age = 19  
        data.password ='s9dfs9df9sdf9s9'
        return this.user.save(data);
    }

    async remove(id: number): Promise<void> {
        await this.user.delete(id);
    }
}
