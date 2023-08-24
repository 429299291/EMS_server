import { MqttService } from './mqtt.service';
import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';
export declare class MqttController {
    private readonly mqttService;
    constructor(mqttService: MqttService);
    getDevices(body: any): {
        success: boolean;
    };
    findAlls(params: any): Promise<import("./entities/mqtt.entity").EMS123[]>;
    create(createMqttDto: CreateMqttDto): Promise<any>;
    findOne(id: number): string;
    update(updateMqttDto: UpdateMqttDto): string;
    remove(id: number): string;
}
