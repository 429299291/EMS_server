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
exports.TerminalService = void 0;
const common_1 = require("@nestjs/common");
const device_entity_1 = require("./entities/device.entity");
const entities_1 = require("../user/entities/entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TerminalService = exports.TerminalService = class TerminalService {
    constructor(terminal, user) {
        this.terminal = terminal;
        this.user = user;
    }
    async create(createDeviceDto) {
        const device = await this.terminal.findOneBy({ id: createDeviceDto.id });
        if (!createDeviceDto.userId) {
            return {
                code: 204,
                message: "userid 必须传递"
            };
        }
        if (device !== null) {
            return { code: 200, message: "设备已经注册" };
        }
        else {
            const user = await this.user.findOne({
                where: { id: createDeviceDto.userId },
                relations: ['terminals'],
            });
            const deviceList = [];
            console.log(createDeviceDto);
            await this.terminal.save(createDeviceDto);
            deviceList.push(createDeviceDto);
            if (user) {
                user.terminals = [...user.terminals, ...deviceList];
            }
            return this.user.save(user);
        }
    }
    async putTerminal(putDeviceDto) {
        const terminal = await this.terminal.findOneBy({ id: putDeviceDto.id });
        if (terminal) {
            this.terminal.update(putDeviceDto.id, { ...putDeviceDto });
            return { code: 200, message: "修改成功" };
        }
        else {
            return { code: 204, message: "无效ID" };
        }
    }
    async getDevices(body) {
        if (body.name && body.name !== '') {
            const data = await this.terminal.find({
                where: {
                    name: (0, typeorm_2.Like)(`%${body.name}%`)
                },
                skip: (body.current - 1) * body.pageSize,
                take: body.pageSize
            });
            const total = await this.terminal.count({
                where: {
                    name: (0, typeorm_2.Like)(`%${body.name}%`)
                },
            });
            return {
                data,
                total,
                success: data ? true : false
            };
        }
        else if (body.location && body.location !== '') {
            const data = await this.terminal.find({
                where: {
                    location: (0, typeorm_2.Like)(`%${body.location}%`)
                },
                skip: (body.current - 1) * body.pageSize,
                take: body.pageSize
            });
            const total = await this.terminal.count({
                where: {
                    location: (0, typeorm_2.Like)(`%${body.location}%`)
                },
            });
            return {
                data,
                total,
                success: data ? true : false
            };
        }
        else if (body.id && body.id !== '') {
            const data = await this.terminal.findOne({
                where: { id: body.id },
                relations: ['devices'],
            });
            const total = await this.terminal.countBy({ id: body.id });
            return {
                data: [data],
                total,
                success: data ? true : false
            };
        }
        else {
            const data = await this.terminal.find({
                where: {
                    WorkingMode: (0, typeorm_2.Not)(9)
                },
                skip: (body.current - 1) * body.pageSize,
                take: body.pageSize
            });
            const total = await this.terminal.count({
                where: {
                    WorkingMode: (0, typeorm_2.Not)(9)
                },
            });
            return {
                data,
                total,
                success: data ? true : false
            };
        }
    }
    findAll() {
        return this.terminal.find();
    }
    findOne(id) {
        return `This action returns a #${id} device`;
    }
    update(id, updateDeviceDto) {
        return `This action updates a #${id} device`;
    }
    remove(id) {
        return `This action removes a #${id} device`;
    }
};
exports.TerminalService = TerminalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Terminal)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TerminalService);
//# sourceMappingURL=device.service.js.map