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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const entities_1 = require("../user/entities/entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EmailService = exports.EmailService = class EmailService {
    constructor(mailerService, user) {
        this.mailerService = mailerService;
        this.user = user;
    }
    async example(emailData, res) {
        const currentUser = await this.user.findOneBy({ email: emailData.to });
        if (currentUser) {
            res.json({
                code: 204,
                message: "用户已经注册!"
            });
        }
        else {
            return this.mailerService
                .sendMail({
                to: emailData.to,
                from: 'neuron@alwayscontrol.com.cn',
                subject: emailData.subject,
                text: emailData.text,
                html: emailData.html,
            })
                .then((data) => {
                res.json({
                    code: 200,
                    message: "邮件发送成功"
                });
            })
                .catch((err) => {
                res.json({
                    code: 204,
                    message: "邮件发送失败"
                });
            });
        }
    }
    notification(notificationData, res) {
        return this.mailerService
            .sendMail({
            to: notificationData.email,
            from: 'neuron@alwayscontrol.com.cn',
            subject: notificationData.title,
            text: notificationData.message,
            html: notificationData.message,
        })
            .then((data) => {
            res.json({
                code: 200,
                message: "邮件发送成功"
            });
        })
            .catch((err) => {
            res.json({
                code: 204,
                message: "邮件发送失败"
            });
        });
    }
    create(createEmailDto) {
        return 'This action adds a new email';
    }
    findAll() {
        return `This action returns all email`;
    }
    findOne(id) {
        return `This action returns a #${id} email`;
    }
    update(id, updateEmailDto) {
        return `This action updates a #${id} email`;
    }
    remove(id) {
        return `This action removes a #${id} email`;
    }
};
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [mailer_1.MailerService, typeorm_2.Repository])
], EmailService);
//# sourceMappingURL=email.service.js.map