import { Injectable } from '@nestjs/common';
import {JsonContains, Like, Repository,LessThanOrEqual, MoreThan, Not} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import { User } from './entities/entities';
import { resType } from 'src/constants/apiType';
import { CreateUserDto } from './dto/user.dto';
const keys = "secret"
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
    // private esponse:Iresponse
    constructor(
        @InjectRepository(User) private readonly user:Repository<User>
    ){}
    async getUserAll(body) {     
        const data = await this.user.find({
            relations:["terminals"],
            where:{
                age:Not(0)
            },
            skip:(body.page-1)* body.pageSize,       //分页
            take:body.pageSize
        })

        const total = await this.user.count({
            where:{
                age:Not(0)
            },
        })
        return {
            data,
            total
        }
    }
    async getUsers(body):Promise<resType>{
        if(body.name){
            const data = await this.user.find({
                relations:["terminals"],
                where:{
                    name:Like(`%${body.name}%`)
                },
                skip:(body.current-1)* body.pageSize,       //分页
                take:body.pageSize
            })
            const total = await this.user.count({
                where:{
                    name:Like(`%${body.name}%`)
                },
            })
            return {
                data,
                code:200,
                message:"success",
                total
            }
        }else if(body.email){            
            const data = await this.user.find({
                relations:["terminals"],
                where:{
                    email:Like(`%${body.email}%`)
                },
                skip:(body.current-1)* body.pageSize,       //分页
                take:body.pageSize
            })
            const total = await this.user.count({
                where:{
                    email:Like(`%${body.email}%`)
                },
            })            
            return {
                data,
                total,
                code:200,
                message:"success"
            }
        }else{            
            const data = await this.user.find({
                relations:["terminals"],
                where:{
                    age:Not(999)
                },
                skip:(body.current-1)* body.pageSize,       //分页
                take:body.pageSize
            })            
            const total = await this.user.count({
                where:{
                    age:Not(999)
                },
            })
            return {
                data,
                code:200,
                message:"success",
                total
            }
        }
    }
    getUserByName(name:string) {
        return this.user.find({
            where:{
                name:Like(`%${name}%`)
            }
        });
    }
    getUserByEmail(email:string) {
        return this.user.findOne({
            relations:["terminals"],
            where:{
                email:Like(`%${email}%`)
            }
        });
    }

    findOne(email: string): Promise<User | null> {
        return this.user.findOneBy({ email });
    }
    register(body,res) {
       return this.user.findOneBy({email:body.email})
        .then(data=>{
            const thisUSER = this.user            
          if(data){
            res.json({
                code:204,
                message:"已经注册了"
            })
          }else{
            let newUser = new User()
            //发送邮件
            newUser = {
                ...body
            }
            // 密码加密模式
            bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // Store hash in your password DB.
                    if(err) throw err
                    newUser.password = hash;//加密过的密码                    
                    thisUSER.save(newUser).then((resolve)=>{                        
                        res.json({
                            code:200,
                            message:"注册成功",
                        })
                    })
                });
            });
          }
        })    
    }
    delUser(id:string) {
        return this.user.delete(id).then((resolve)=>{
            if(resolve.affected>0){
                return{
                    code:200,
                    message:"删除成功"
                }
            }else{
                return{
                    code:204,
                    message:"删除失败"
                }
            }
        });
    }
    async updateUser(body) {
        if(body.password){
            // 密码加密模式
            let newPassword = await bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(body.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if(err) throw err
                        body.password = hash;//加密过的密码                                            
                    });
                    return body
                });
                body.password = newPassword
        }
        return this.user.update(body.id,{...body}).then(resolve=>{
            if(resolve.affected==1){
                return{
                    code:200,
                    message:"修改成功"
                }
            }else{
                return{
                    code:204,
                    message:"修改失败"
                }
            }
            
        });
    }

    async remove(id: number): Promise<void> {
        await this.user.delete(id);
    }
}
