"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const upload_module_1 = require("./upload/upload.module");
const mqtt_module_1 = require("./mqtt/mqtt.module");
const device_module_1 = require("./terminal/device.module");
const nestjs_redis_1 = require("@jasonsoft/nestjs-redis");
const email_module_1 = require("./email/email.module");
const mailer_1 = require("@nestjs-modules/mailer");
const pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
const redisOptions = {
    port: 6379,
    host: "47.106.120.119",
    password: "xuheng8888!"
};
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "rm-cn-5yd3et1kl0001gno.rwlb.rds.aliyuncs.com",
                port: 3306,
                username: "ems",
                password: "xuheng8888!",
                database: "ems",
                retryDelay: 500,
                retryAttempts: 1,
                synchronize: true,
                autoLoadEntities: true
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.exmail.qq.com',
                    port: 465,
                    ignoreTLS: true,
                    secure: true,
                    auth: {
                        user: 'neuron@alwayscontrol.com.cn',
                        pass: 'Xuheng8888',
                    },
                },
                defaults: {
                    from: '"旭衡科技" <neuron@alwayscontrol.com.cn>',
                },
                preview: false,
                template: {
                    dir: process.cwd() + '/template/',
                    adapter: new pug_adapter_1.PugAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            dashboard_module_1.DashboardModule, user_module_1.UserModule, auth_module_1.AuthModule, upload_module_1.UploadModule, mqtt_module_1.MqttModule, device_module_1.TerminalModule, nestjs_redis_1.RedisModule.forRoot(redisOptions), email_module_1.EmailModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map