"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMqttDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mqtt_dto_1 = require("./create-mqtt.dto");
class UpdateMqttDto extends (0, mapped_types_1.PartialType)(create_mqtt_dto_1.CreateMqttDto) {
}
exports.UpdateMqttDto = UpdateMqttDto;
//# sourceMappingURL=update-mqtt.dto.js.map