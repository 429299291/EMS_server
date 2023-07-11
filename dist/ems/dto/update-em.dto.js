"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_em_dto_1 = require("./create-em.dto");
class UpdateEmDto extends (0, mapped_types_1.PartialType)(create_em_dto_1.CreateEmDto) {
}
exports.UpdateEmDto = UpdateEmDto;
//# sourceMappingURL=update-em.dto.js.map