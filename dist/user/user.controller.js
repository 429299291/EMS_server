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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_guard_1 = require("../auth/auth.guard");
const user_dto_1 = require("./dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
const email_service_1 = require("../email/email.service");
const tool_1 = require("../tool");
const nestjs_redis_1 = require("@jasonsoft/nestjs-redis");
let UserController = exports.UserController = class UserController {
    constructor(userService, emailService, redisCacheHelper) {
        this.userService = userService;
        this.emailService = emailService;
        this.redisCacheHelper = redisCacheHelper;
    }
    getUserByName(params) {
        let username = params.username;
        return this.userService.getUserByName(username);
    }
    currentUser({ email }) {
        return this.userService.getUserByEmail(email);
    }
    getUserAll(page, pageSize) {
        return this.userService.getUserAll({ page, pageSize });
    }
    getUsers(body) {
        return this.userService.getUsers(body);
    }
    delUser({ id }) {
        return this.userService.delUser(id);
    }
    updateUser(body, { id }) {
        return this.userService.updateUser({ id, ...body });
    }
    async register(body, res) {
        if (body.emailCode === await this.redisCacheHelper.getAsObj(`${body.email}`)) {
            return this.userService.register(body, res);
        }
        else {
            res.json({
                code: 400,
                massage: "验证码错误"
            });
        }
    }
    async registerEmail({ email }, res) {
        const emailCode = (0, tool_1.mathRand)(1000, 9999) + '';
        await this.redisCacheHelper.set(email, emailCode);
        const data = await this.emailService.example({
            to: email,
            subject: "旭衡科技注册验证码",
            text: emailCode,
            html: `注册验证码:<b>${emailCode}</b>`
        }, res);
    }
};
__decorate([
    (0, common_1.Get)('/getUserByName/:username'),
    (0, swagger_1.ApiTags)("user"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: "测试接口"
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUserByName", null);
__decorate([
    (0, common_1.Get)('/currentUser/:email'),
    (0, swagger_1.ApiTags)("user"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiParam)({
        name: "email",
        description: "email",
        required: true
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "currentUser", null);
__decorate([
    (0, common_1.Get)('/all/:page/:pageSize'),
    (0, swagger_1.ApiTags)("user"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)("page", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)("pageSize", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUserAll", null);
__decorate([
    (0, common_1.Post)('/getUsers'),
    (0, swagger_1.ApiTags)("user"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.getUsersDto]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/delete/:id'),
    (0, swagger_1.ApiTags)("user"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "delUser", null);
__decorate([
    (0, common_1.Post)('/update/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)("user"),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "用户ID",
        required: true
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, swagger_1.ApiTags)("user"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('/registerEmail/:email'),
    (0, swagger_1.ApiTags)("user"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerEmail", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        email_service_1.EmailService,
        nestjs_redis_1.RedisCacheHelper])
], UserController);
//# sourceMappingURL=user.controller.js.map