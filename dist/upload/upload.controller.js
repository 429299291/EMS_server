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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const create_upload_dto_1 = require("./dto/create-upload.dto");
const update_upload_dto_1 = require("./dto/update-upload.dto");
const platform_express_1 = require("@nestjs/platform-express");
const constants_1 = require("../constants");
const path_1 = require("path");
const compressing_1 = require("compressing");
const swagger_1 = require("@nestjs/swagger");
let UploadController = exports.UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    upload(file) {
        return {
            code: 200,
            message: "上传成功",
            data: `${constants_1.www}/home/files/images/avatar/${file.filename}`
        };
    }
    downloadAvatar(res) {
        const url = (0, path_1.join)(__dirname, '../files/images/avatar/1689863888602.png');
        res.download(url);
    }
    async downloadStream(res) {
        const url = (0, path_1.join)(__dirname, '../files/images/avatar/1689865626035.png');
        const tarStream = new compressing_1.zip.Stream();
        await tarStream.addEntry(url);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=xiaoman');
        tarStream.pipe(res);
    }
    create(createUploadDto) {
        return this.uploadService.create(createUploadDto);
    }
    findAll() {
        return this.uploadService.findAll();
    }
    findOne(id) {
        return this.uploadService.findOne(+id);
    }
    update(id, updateUploadDto) {
        return this.uploadService.update(+id, updateUploadDto);
    }
    remove(id) {
        return this.uploadService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('avatar'),
    (0, swagger_1.ApiTags)("profile"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)('avatar'),
    (0, swagger_1.ApiTags)("profile"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "downloadAvatar", null);
__decorate([
    (0, common_1.Get)('stream'),
    (0, swagger_1.ApiTags)("profile"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "downloadStream", null);
__decorate([
    (0, swagger_1.ApiTags)("profile"),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_upload_dto_1.CreateUploadDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiTags)("profile"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiTags)("profile"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiTags)("profile"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_upload_dto_1.UpdateUploadDto]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiTags)("profile"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "remove", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map