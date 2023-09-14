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
exports.dashboardElectricityDTO = exports.getDashboardElectricityDTO = exports.CreateMqttDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateMqttDto {
}
exports.CreateMqttDto = CreateMqttDto;
class getDashboardElectricityDTO {
}
exports.getDashboardElectricityDTO = getDashboardElectricityDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "0000007" }),
    __metadata("design:type", String)
], getDashboardElectricityDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1693564868 }),
    __metadata("design:type", Number)
], getDashboardElectricityDTO.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1693564869 }),
    __metadata("design:type", Number)
], getDashboardElectricityDTO.prototype, "endTime", void 0);
class dashboardElectricityDTO {
}
exports.dashboardElectricityDTO = dashboardElectricityDTO;
//# sourceMappingURL=create-mqtt.dto.js.map