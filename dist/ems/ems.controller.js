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
exports.EmsController = void 0;
const common_1 = require("@nestjs/common");
const ems_service_1 = require("./ems.service");
const create_em_dto_1 = require("./dto/create-em.dto");
const update_em_dto_1 = require("./dto/update-em.dto");
let EmsController = exports.EmsController = class EmsController {
    constructor(emsService) {
        this.emsService = emsService;
    }
    create(createEmDto) {
        return this.emsService.create(createEmDto);
    }
    findAll() {
        return "EMS云平台系统";
        return this.emsService.findAll();
    }
    findOne(id) {
        return this.emsService.findOne(+id);
    }
    update(id, updateEmDto) {
        return this.emsService.update(+id, updateEmDto);
    }
    remove(id) {
        return this.emsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_em_dto_1.CreateEmDto]),
    __metadata("design:returntype", void 0)
], EmsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_em_dto_1.UpdateEmDto]),
    __metadata("design:returntype", void 0)
], EmsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmsController.prototype, "remove", null);
exports.EmsController = EmsController = __decorate([
    (0, common_1.Controller)('ems'),
    __metadata("design:paramtypes", [ems_service_1.EmsService])
], EmsController);
//# sourceMappingURL=ems.controller.js.map