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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const create_email_dto_1 = require("./dto/create-email.dto");
const update_email_dto_1 = require("./dto/update-email.dto");
const swagger_1 = require("@nestjs/swagger");
let EmailController = exports.EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    create(createEmailDto) {
        return this.emailService.create(createEmailDto);
    }
    findAll(res) {
        return this.emailService.findAll();
    }
    async notification(body, res) {
        this.emailService.notification(body, res);
    }
    findOne(id) {
        return this.emailService.findOne(+id);
    }
    update(id, updateEmailDto) {
        return this.emailService.update(+id, updateEmailDto);
    }
    remove(id) {
        return this.emailService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiTags)("email"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_email_dto_1.CreateEmailDto]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiTags)("email"),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/notification'),
    (0, swagger_1.ApiTags)("notification"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_email_dto_1.CreateNotificationDTO, Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "notification", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiTags)("email"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiTags)("email"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_email_dto_1.UpdateEmailDto]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiTags)("email"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "remove", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map