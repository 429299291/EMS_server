"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUploadDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_upload_dto_1 = require("./create-upload.dto");
class UpdateUploadDto extends (0, mapped_types_1.PartialType)(create_upload_dto_1.CreateUploadDto) {
}
exports.UpdateUploadDto = UpdateUploadDto;
//# sourceMappingURL=update-upload.dto.js.map