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
exports.TerminalController = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
const create_device_dto_1 = require("./dto/create-device.dto");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let TerminalController = exports.TerminalController = class TerminalController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    create(createDeviceDto) {
        return this.deviceService.create(createDeviceDto);
    }
    put(putDeviceDto) {
        return this.deviceService.putTerminal(putDeviceDto);
    }
    getDevices(createDeviceDto) {
        return this.deviceService.getDevices(createDeviceDto);
    }
    findAll() {
        return this.deviceService.findAll();
    }
    findOne(id) {
        return this.deviceService.findOne(+id);
    }
    update(id, updateDeviceDto) {
        return this.deviceService.update(+id, updateDeviceDto);
    }
    remove(id) {
        return this.deviceService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiTags)("Terminal"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_dto_1.CreateDeviceDto]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(""),
    (0, swagger_1.ApiTags)("Terminal"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_dto_1.updateTerminalDTO]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "put", null);
__decorate([
    (0, common_1.Post)('terminals'),
    (0, swagger_1.ApiTags)("Terminal"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_dto_1.CreateDeviceDto]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "getDevices", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiTags)("Terminal"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)("Terminal"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiTags)("Terminal"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_device_dto_1.updateTerminalDTO]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiTags)("Terminal"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "remove", null);
exports.TerminalController = TerminalController = __decorate([
    (0, common_1.Controller)('terminal'),
    __metadata("design:paramtypes", [device_service_1.TerminalService])
], TerminalController);
//# sourceMappingURL=device.controller.js.map