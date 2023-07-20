"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("./ entities/entities");
const keys = "secret";
const bcrypt = require('bcrypt');
let UserService = exports.UserService = class UserService {
    constructor(user) {
        this.user = user;
    }
    getUserAll() {
        return this.user.find();
    }
    getUserByName(name) {
        return this.user.find({
            where: {
                name: (0, typeorm_1.Like)(`%${name}%`)
            }
        });
    }
    getUserByEmail(email) {
        return this.user.findOne({
            where: {
                email: (0, typeorm_1.Like)(`%${email}%`)
            }
        });
    }
    findOne(email) {
        return this.user.findOneBy({ email });
    }
    login(body, res) {
        return this.user.findOneBy({ email: body.email })
            .then(user => {
            if (!user) {
                return {
                    code: 204,
                    message: "用户不存在"
                };
            }
        });
    }
    register(body, res) {
        return this.user.findOneBy({ email: body.email })
            .then(data => {
            const thisUSER = this.user;
            if (data) {
                res.json({
                    code: 204,
                    message: "已经注册了"
                });
            }
            else {
                let newUser = new entities_1.User();
                newUser = {
                    ...body
                };
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err)
                            throw err;
                        newUser.password = hash;
                        thisUSER.save(newUser).then((resolve) => {
                            res.json({
                                code: 200,
                                message: "注册成功"
                            });
                        });
                    });
                });
            }
        });
    }
    delUser(id) {
        return this.user.delete(id).then((resolve) => {
            if (resolve.affected > 0) {
                return {
                    code: 200,
                    message: "删除成功"
                };
            }
            else {
                return {
                    code: 204,
                    message: "删除失败"
                };
            }
        });
    }
    async updateUser(body) {
        if (body.password) {
            let newPassword = await bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(body.password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    body.password = hash;
                });
                return body;
            });
            body.password = newPassword;
        }
        return this.user.update(body.id, { ...body }).then(resolve => {
            if (resolve.affected == 1) {
                return {
                    code: 200,
                    message: "修改成功"
                };
            }
            else {
                return {
                    code: 204,
                    message: "修改失败"
                };
            }
        });
    }
    async remove(id) {
        await this.user.delete(id);
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map