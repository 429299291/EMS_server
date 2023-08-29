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
exports.EMS123 = void 0;
const device_entity_1 = require("../../terminal/entities/device.entity");
const typeorm_1 = require("typeorm");
let EMS123 = exports.EMS123 = class EMS123 {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EMS123.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, default: "user" }),
    __metadata("design:type", String)
], EMS123.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], EMS123.prototype, "WorkingMode", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Array)
], EMS123.prototype, "BAT", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Array)
], EMS123.prototype, "EV", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Array)
], EMS123.prototype, "GRID", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Array)
], EMS123.prototype, "PV", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Array)
], EMS123.prototype, "HOME", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-json"),
    __metadata("design:type", Array)
], EMS123.prototype, "INV", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Array)
], EMS123.prototype, "fault", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: null }),
    __metadata("design:type", Number)
], EMS123.prototype, "timeStamp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_entity_1.Terminal, terminal => terminal.devices),
    __metadata("design:type", device_entity_1.Terminal)
], EMS123.prototype, "terminal", void 0);
exports.EMS123 = EMS123 = __decorate([
    (0, typeorm_1.Entity)()
], EMS123);
//# sourceMappingURL=mqtt.entity.js.map