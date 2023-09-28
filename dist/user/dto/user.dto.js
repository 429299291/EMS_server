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
exports.updateUserDto = exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Davis" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 18 }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "429299291@qq.com" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15111111111 }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "xuheng8888" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "sfssf.png" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "admin" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "identity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "actived", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { location: "深圳" } }),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["dashboard", "about"] }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "accessPermissions", void 0);
class updateUserDto {
}
exports.updateUserDto = updateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Davis" }),
    __metadata("design:type", String)
], updateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 18 }),
    __metadata("design:type", Number)
], updateUserDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "429299291@qq.com" }),
    __metadata("design:type", String)
], updateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15111111111 }),
    __metadata("design:type", String)
], updateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "sfssf.png" }),
    __metadata("design:type", String)
], updateUserDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "admin" }),
    __metadata("design:type", String)
], updateUserDto.prototype, "identity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], updateUserDto.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], updateUserDto.prototype, "actived", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { location: "深圳" } }),
    __metadata("design:type", Object)
], updateUserDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["dashboard", "about"] }),
    __metadata("design:type", Array)
], updateUserDto.prototype, "accessPermissions", void 0);
//# sourceMappingURL=user.dto.js.map