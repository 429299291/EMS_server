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
exports.MqttController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mqtt_service_1 = require("./mqtt.service");
const create_mqtt_dto_1 = require("./dto/create-mqtt.dto");
const update_mqtt_dto_1 = require("./dto/update-mqtt.dto");
const mqtt = require("mqtt");
let client;
let MqttController = exports.MqttController = class MqttController {
    constructor(mqttService) {
        this.mqttService = mqttService;
        client = mqtt.connect('mqtt://47.106.120.119', {
            username: "ems",
            password: "xuheng8888",
            protocolId: 'MQTT',
            clientId: 'EMS-12345',
        });
        client.on('connect', function () {
            client.subscribe(`HEMS`, function (err) {
                if (!err) {
                }
            });
        });
        client.on('message', (topic, message) => {
            this.mqttService.create(message);
        });
    }
    getDevices(body) {
        client.publish(`EMS/${(Math.random() * 100000).toFixed(0)}`, JSON.stringify({
            ...body,
            name: `EMS-110`,
            timeStamp: Math.floor(new Date().getTime() / 1000),
        }), { qos: 1, retain: true });
        return {
            success: true,
        };
    }
    findAlls(params) {
        return this.mqttService.findAll(params);
    }
    create(createMqttDto) {
        return this.mqttService.create(createMqttDto);
    }
    findOne(id) {
        return this.mqttService.findOne(id);
    }
    update(updateMqttDto) {
        return this.mqttService.update(updateMqttDto.id, updateMqttDto);
    }
    remove(id) {
        return this.mqttService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "getDevices", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "findAlls", null);
__decorate([
    (0, microservices_1.MessagePattern)('createMqtt'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mqtt_dto_1.CreateMqttDto]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneMqtt'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateMqtt'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_mqtt_dto_1.UpdateMqttDto]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeMqtt'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "remove", null);
exports.MqttController = MqttController = __decorate([
    (0, common_1.Controller)('ems'),
    __metadata("design:paramtypes", [mqtt_service_1.MqttService])
], MqttController);
//# sourceMappingURL=mqtt.controller.js.map