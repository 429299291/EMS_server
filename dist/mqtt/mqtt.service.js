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
const moment = require("moment");
const schedule_1 = require("@nestjs/schedule");
const nestjs_redis_1 = require("@jasonsoft/nestjs-redis");
let MqttService = exports.MqttService = class MqttService {
    constructor(ems, terminal, redisCacheHelper) {
        this.ems = ems;
        this.terminal = terminal;
        this.redisCacheHelper = redisCacheHelper;
        this.bufferList = new Set();
    }
    async create(createMqttDto) {
        let data = JSON.parse(createMqttDto.toString());
        return await this.terminal.findOne({
            where: { id: data.id },
            relations: ['devices'],
        }).then(async (terminalA) => {
            if (terminalA) {
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
                const deviceList = [];
                deviceList.push(data);
                terminalA.devices = [...terminalA.devices, ...deviceList];
                data.terminalIDuse = data.id;
                delete (data.id);
                this.bufferList.add(data.terminalIDuse);
                await this.redisCacheHelper.set(data.terminalIDuse, terminalA);
            }
            else {
                console.log(`无效ID:${data.id}`);
            }
        });
    }
    async saveEMS123(id) {
        this.bufferList.forEach(async (data) => {
            const timeStamps = parseInt(moment().format("X"));
            let newdata = await this.redisCacheHelper.getAsObj(`${data}`);
            if (newdata) {
                if (timeStamps - (newdata.devices[newdata.devices.length - 1].timeStamp) < 300) {
                    newdata.devices[newdata.devices.length - 1].timeStamp = timeStamps;
                    this.terminal.save(newdata);
                    this.redisCacheHelper.del(`${data}`);
                }
            }
        });
        this.bufferList.clear();
    }
    async findAll(id) {
        return this.ems.findBy(id);
    }
    async getHomeElectricity(body, res) {
        let batteryDataIn = 0;
        let preBatteryDataIn = 0;
        let batteryDataOut = 0;
        let preBatteryDataOut = 0;
        let solarData = 0;
        let preSolarData = 0;
        let gridDataIn = 0;
        let gridDataOut = 0;
        let evData = 0;
        let homeData = 0;
        let preHomeData = 0;
        let newMonthdatas = {};
        let newYearDatas = {};
        let monthBatteryDataIn;
        let currentMonthBatteryDataIn = 0;
        let monthGridDataIn;
        let currentMonthGridDataIn = 0;
        let monthHomeData = [];
        let currentMonthHomeData = 0;
        let dayGridReturnDataOut = [];
        let dayGridReturnDataIn = [];
        let dayBatteryReturnDataIn = [];
        let dayBatteryReturnDataOut = [];
        let daySolarReturnData = [];
        let dayHomeReturnData = [];
        let dayEVReturnData = [];
        const dayTime = (body.endTime - body.startTime) / 86400;
        for (let i = 0; i < dayTime; i++) {
            if (dayTime > 13 && dayTime < 32) {
                if (!newMonthdatas[0]) {
                    newMonthdatas[i + 1] = [];
                }
            }
            else {
                newYearDatas = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] };
            }
        }
        const CalculateArea = (...argument) => {
            const currentElectricity = argument.reduce((total, currentValue, index, arr) => {
                return total + (Math.min(arr[index ? index - 1 : 0], currentValue) + Math.abs(currentValue - arr[index ? index - 1 : 0]) / 2) / 12;
            }, 0);
            return currentElectricity;
        };
        if (body.startTime && body.endTime) {
            let newdata = {
                HOMEdata: [],
                EVdata: [],
                GRIDdata: [],
                PVdata: [],
                BATdata: []
            };
            const datas = await this.ems.find({
                where: {
                    terminalIDuse: body.id,
                    timeStamp: (0, typeorm_2.Between)(body.startTime, body.endTime)
                },
                order: {
                    timeStamp: "ASC"
                }
            });
            if (!datas.length) {
                return res.json({ code: 200, message: "无数据" });
            }
            datas.map((val, index) => {
                let newpv = 0;
                let newev = 0;
                let newbat = 0;
                let pvdataold;
                let evdataold;
                let batdataold;
                if (val.EV) {
                    for (let i = 0; i < val.EV.length / 5; i++) {
                        evdataold = ''.concat(`${val.EV[i * 5]},`, `${val.EV[i * 5 + 1]},`, `${val.EV[i * 5 + 2]},`, `${val.EV[i * 5 + 3]},`, `${val.EV[i * 5 + 4]}`);
                        evdataold = [JSON.parse(evdataold)];
                        for (i = 0; i < evdataold.length; i++) {
                            newev += evdataold[i].power;
                            evData += evdataold[i].power;
                        }
                    }
                    dayEVReturnData.push(newev);
                }
                for (let i = 0; i < val.BAT.length / 7; i++) {
                    batdataold = ''.concat(`${val.BAT[i * 7]},`, `${val.BAT[i * 7 + 1]},`, `${val.BAT[i * 7 + 2]},`, `${val.BAT[i * 7 + 3]},`, `${val.BAT[i * 7 + 4]},`, `${val.BAT[i * 7 + 5]},`, `${val.BAT[i * 7 + 6]}`);
                    batdataold = [JSON.parse(batdataold)];
                    for (i = 0; i < batdataold.length; i++) {
                        newbat += batdataold[i].power;
                        if (batdataold[i].power > 0) {
                            batteryDataOut += batdataold[i].power;
                            dayBatteryReturnDataOut.push(batdataold[i].power);
                        }
                        else {
                            batteryDataIn -= batdataold[i].power;
                            dayBatteryReturnDataIn.push(batdataold[i].power);
                        }
                    }
                }
                for (let i = 0; i < val.PV.length / 3; i++) {
                    pvdataold = ''.concat(`${val.PV[i * 3]},`, `${val.PV[i * 3 + 1]},`, `${val.PV[i * 3 + 2]}`);
                    pvdataold = [JSON.parse(pvdataold)];
                    for (i = 0; i < pvdataold.length; i++) {
                        newpv += pvdataold[i].power;
                        if (batdataold[0].power >= 0) {
                            daySolarReturnData.push(newpv);
                        }
                        else {
                            daySolarReturnData.push(newpv + batdataold[i].power);
                        }
                    }
                }
                if (val.GRID.power > 0) {
                    dayGridReturnDataOut.push(val.GRID.power);
                }
                else {
                    dayGridReturnDataIn.push(val.GRID.power);
                }
                dayHomeReturnData.push(val.HOME.home.power + val.HOME.critical.power);
                if (dayTime <= 1) {
                    newdata.HOMEdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`, parseFloat((val.HOME.home.power + val.HOME.critical.power).toFixed(2))]);
                    newdata.GRIDdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`, val.GRID.power]);
                    newdata.PVdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`, newpv]);
                    newdata.EVdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`, newev]);
                    newdata.BATdata.push([`${moment(val.timeStamp * 1000).format('HH:mm')}`, newbat]);
                }
                else if (dayTime <= 31) {
                    newMonthdatas[moment(val.timeStamp * 1000).date()].push(val.HOME.home.power + val.HOME.critical.power);
                }
                else {
                    newYearDatas[moment(val.timeStamp * 1000).month() + 1].push(val.HOME.home.power + val.HOME.critical.power);
                }
            });
            gridDataOut = CalculateArea(...dayGridReturnDataOut);
            gridDataIn = CalculateArea(...dayGridReturnDataIn);
            batteryDataIn = CalculateArea(...dayBatteryReturnDataIn);
            batteryDataOut = CalculateArea(...dayBatteryReturnDataOut);
            homeData = CalculateArea(...dayHomeReturnData);
            solarData = CalculateArea(...daySolarReturnData);
            evData = CalculateArea(...dayEVReturnData);
            if (dayTime <= 1) {
                res.json({
                    data: {
                        ...newdata,
                        solarData: parseFloat((solarData).toFixed(2)),
                        gridDataIn: parseFloat(gridDataIn.toFixed(2)),
                        gridDataOut: parseFloat(gridDataOut.toFixed(2)),
                        batteryDataIn: parseFloat(batteryDataIn.toFixed(2)),
                        batteryDataOut: parseFloat(batteryDataOut.toFixed(2)),
                        evData: parseFloat(evData.toFixed(2)),
                        homeData: parseFloat(homeData.toFixed(2))
                    },
                    code: 200,
                    length: datas.length
                });
            }
            else if (3 < dayTime && dayTime <= 32) {
                let monthReturnData = [];
                Object.keys(newMonthdatas).map(key => {
                    const data = CalculateArea(...newMonthdatas[key]);
                    monthReturnData.push(data);
                });
                res.json({
                    monthHomeData: monthReturnData,
                    solarData: parseFloat((solarData).toFixed(2)),
                    gridDataIn: parseFloat(gridDataIn.toFixed(2)),
                    gridDataOut: parseFloat(gridDataOut.toFixed(2)),
                    batteryDataIn: parseFloat(batteryDataIn.toFixed(2)),
                    batteryDataOut: parseFloat(batteryDataOut.toFixed(2)),
                    evData: parseFloat(evData.toFixed(2)),
                    homeData: parseFloat(homeData.toFixed(2)),
                    code: 200,
                    length: Math.round(dayTime)
                });
            }
            else {
                let yearReturnData = [];
                Object.keys(newYearDatas).map(key => {
                    const data = CalculateArea(...newYearDatas[key]);
                    yearReturnData.push(data);
                });
                res.json({
                    yearHomeData: yearReturnData,
                    solarData: parseFloat((solarData).toFixed(2)),
                    gridDataIn: parseFloat(gridDataIn.toFixed(2)),
                    gridDataOut: parseFloat(gridDataOut.toFixed(2)),
                    batteryDataIn: parseFloat(batteryDataIn.toFixed(2)),
                    batteryDataOut: parseFloat(batteryDataOut.toFixed(2)),
                    evData: parseFloat(evData.toFixed(2)),
                    homeData: parseFloat(homeData.toFixed(2)),
                    code: 200,
                    length: Math.round(dayTime)
                });
            }
        }
        else {
        }
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
__decorate([
    (0, schedule_1.Cron)("0 */5 * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MqttService.prototype, "saveEMS123", null);
exports.MqttService = MqttService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mqtt_entity_1.EMS123)),
    __param(1, (0, typeorm_1.InjectRepository)(device_entity_1.Terminal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        nestjs_redis_1.RedisCacheHelper])
], MqttService);
//# sourceMappingURL=mqtt.service.js.map