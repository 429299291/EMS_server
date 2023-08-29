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
exports.MqttService = void 0;
const common_1 = require("@nestjs/common");
const mqtt_entity_1 = require("./entities/mqtt.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("../terminal/entities/device.entity");
let MqttService = exports.MqttService = class MqttService {
    constructor(ems, terminal) {
        this.ems = ems;
        this.terminal = terminal;
    }
    async create(createMqttDto) {
        let data = JSON.parse(createMqttDto.toString());
        console.log(data.id);
        return this.terminal.findOneBy({ id: data.id }).then(async (terminal) => {
            if (terminal) {
                try {
                    data.BAT = data.BAT.map(data => {
                        return JSON.stringify(data);
                    });
                    data.EV = data.EV ? data.EV.map(data => {
                        return JSON.stringify(data);
                    }) : [];
                    data.PV = data.PV.map(data => {
                        return JSON.stringify(data);
                    });
                    data.GRID = data.GRID.map(data => {
                        return JSON.stringify(data);
                    });
                    data.HOME = data.HOME.map(data => {
                        return JSON.stringify(data);
                    });
                    data.INV = data.INV ? data.INV.map(data => {
                        return JSON.stringify(data);
                    }) : [];
                    data.fault = data.fault.map(data => {
                        return JSON.stringify(data);
                    });
                }
                catch (error) {
                    throw error(error);
                }
                delete (data.id);
                const deviceList = [];
                deviceList.push(data);
                terminal.devices = deviceList;
                await this.ems.save(data);
                return this.terminal.save(terminal);
            }
        });
    }
    async findAll(id) {
        return this.ems.findBy(id);
    }
    findOne(id) {
        return `This action returns a #${id} mqtt`;
    }
    update(id, updateMqttDto) {
        return `This action updates a #${id} mqtt`;
    }
    remove(id) {
        return `This action removes a #${id} mqtt`;
    }
};
exports.MqttService = MqttService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mqtt_entity_1.EMS123)),
    __param(1, (0, typeorm_1.InjectRepository)(device_entity_1.Terminal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MqttService);
//# sourceMappingURL=mqtt.service.js.map