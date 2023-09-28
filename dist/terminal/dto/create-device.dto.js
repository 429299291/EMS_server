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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTerminalDTO = exports.CreateDeviceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateDeviceDto {
}
exports.CreateDeviceDto = CreateDeviceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "测试一号" }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "00007" }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: {
            location: "深圳",
            lat: 39.904989,
            lng: 116.405285,
            electrovalency: 0.53,
            maxElectrovalency: 0.78,
            minElectrovalency: 0.49,
            sunrise: "05:43",
            sunset: "17:09",
        } }),
    __metadata("design:type", Object)
], CreateDeviceDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "voltronicpower" }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "supplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, maximum: 3 }),
    __metadata("design:type", Number)
], CreateDeviceDto.prototype, "WorkingMode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "4636cb2b-435d-4cc9-a934-f33811511fbc" }),
    __metadata("design:type", String)
], CreateDeviceDto.prototype, "userId", void 0);
class updateTerminalDTO {
}
exports.updateTerminalDTO = updateTerminalDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "00007" }),
    __metadata("design:type", String)
], updateTerminalDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "测试一号" }),
    __metadata("design:type", String)
], updateTerminalDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], updateTerminalDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, maximum: 3 }),
    __metadata("design:type", Number)
], updateTerminalDTO.prototype, "WorkingMode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "00001" }),
    __metadata("design:type", String)
], updateTerminalDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "voltronicpower" }),
    __metadata("design:type", String)
], updateTerminalDTO.prototype, "supplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: {
            location: "深圳",
            lat: 39.904989,
            lng: 116.405285,
            electrovalency: 0.53,
            maxElectrovalency: 0.78,
            minElectrovalency: 0.49,
            sunrise: "05:43",
            sunset: "17:09",
        } }),
    __metadata("design:type", Object)
], updateTerminalDTO.prototype, "location", void 0);
//# sourceMappingURL=create-device.dto.js.map