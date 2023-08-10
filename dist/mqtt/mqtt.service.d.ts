import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';
import { EMS123 } from './entities/mqtt.entity';
import { Repository } from 'typeorm';
export declare class MqttService {
    private readonly ems;
    constructor(ems: Repository<EMS123>);
    create(createMqttDto: CreateMqttDto): Promise<any>;
    findAll(): Promise<EMS123[]>;
    findOne(id: number): string;
    update(id: number, updateMqttDto: UpdateMqttDto): string;
    remove(id: number): string;
}
