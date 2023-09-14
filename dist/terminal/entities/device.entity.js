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
exports.Terminal = void 0;
const mqtt_entity_1 = require("../../mqtt/entities/mqtt.entity");
const entities_1 = require("../../user/entities/entities");
const typeorm_1 = require("typeorm");
let Terminal = exports.Terminal = class Terminal {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Terminal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)("terminalname-idx"),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, default: "user" }),
    __metadata("design:type", String)
], Terminal.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Terminal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-json"),
    __metadata("design:type", Object)
], Terminal.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: 'voltronicpower' }),
    __metadata("design:type", String)
], Terminal.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Terminal.prototype, "WorkingMode", void 0);
__decorate([
    (0, typeorm_1.Index)("date-idx"),
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Terminal.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, user => user.terminals),
    __metadata("design:type", entities_1.User)
], Terminal.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mqtt_entity_1.EMS123, EMS123 => EMS123.terminal, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Terminal.prototype, "devices", void 0);
exports.Terminal = Terminal = __decorate([
    (0, typeorm_1.Entity)()
], Terminal);
//# sourceMappingURL=device.entity.js.map