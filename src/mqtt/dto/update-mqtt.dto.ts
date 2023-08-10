import { PartialType } from '@nestjs/mapped-types';
import { CreateMqttDto } from './create-mqtt.dto';

export class UpdateMqttDto extends PartialType(CreateMqttDto) {
  id: number;
}
