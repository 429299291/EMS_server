"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const upload_controller_1 = require("./upload.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let UploadModule = exports.UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (0, path_1.join)(__dirname, '../files/images/avatar'),
                    filename: (_, file, callback) => {
                        const fileName = `${new Date().getTime() + (0, path_1.extname)(file.originalname)}`;
                        return callback(null, fileName);
                    }
                })
            })],
        controllers: [upload_controller_1.UploadController],
        providers: [upload_service_1.UploadService]
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map