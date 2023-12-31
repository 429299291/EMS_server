import { MqttService } from './mqtt.service';
import { CreateMqttDto, commendDTO } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';
import { getDashboardElectricityDTO } from './dto/create-mqtt.dto';
export declare class MqttController {
    private readonly mqttService;
    constructor(mqttService: MqttService);
    getDevices(body: commendDTO): {
        success: boolean;
    };
    getHomeElectricity(body: getDashboardElectricityDTO, res: any): Promise<any>;
    findAlls(params: any): Promise<import("./entities/mqtt.entity").EMS123[]>;
    create(createMqttDto: CreateMqttDto): Promise<void>;
    findOne(id: number): string;
    update(updateMqttDto: UpdateMqttDto): string;
    remove(id: number): string;
}
