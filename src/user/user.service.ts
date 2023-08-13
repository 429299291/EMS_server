import { Injectable } from '@nestjs/common';
import {JsonContains, Like, Repository,LessThanOrEqual, MoreThan, Not} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import { User } from './entities/entities';
import { log } from 'console';
const keys = "secret"
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly user:Repository<User>){}
    async getUserAll(body) {        
        const data = await this.user.find({
            relations:["devices"],
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
    getUserByName(name:string) {
        return this.user.find({
            where:{
                name:Like(`%${name}%`)
            }
        });
    }
    getUserByEmail(email:string) {
        return this.user.findOne({
            where:{
                email:Like(`%${email}%`)
            }
        });
    }

    findOne(email: string): Promise<User | null> {
        return this.user.findOneBy({ email });
    }

    login(body:any,res) {
          //查询数据库
        return this.user.findOneBy({email:body.email})
        .then(user =>{           
            if(!user){
                return {
                    code:204,
                    message:"用户不存在"
                }
            }
            //密码匹配
            // bcrypt.compare(body.password, user.password,(err, result) => {          
            //     if(result){ 
            //         const rule = {id:user.id,name:user.name}
            //         // jwt.sign('规则','加密名字','过期时间','箭头函数')
            //         jwt.sign(rule,keys,{expiresIn:3600000},(err,token) =>{
            //             if(err) throw err;
            //             res.json({
            //                 success:true,
            //                 code:200,
            //                 message:"登录成功",
            //                 token:"Bearer "+token
            //             })
            //         })
            //     }else{                    
            //         res.json({
            //             code:204,
            //             message:"密码错误"
            //         })
            //     }
            // });

        })
    }
    register(body:any,res) {            
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
                            message:"注册成功"
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
