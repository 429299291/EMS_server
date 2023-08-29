import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';
import { EMS123 } from './entities/mqtt.entity';
import { Repository } from 'typeorm';
import { Terminal } from 'src/terminal/entities/device.entity';
export declare class MqttService {
    private readonly ems;
    private readonly terminal;
    constructor(ems: Repository<EMS123>, terminal: Repository<Terminal>);
    create(createMqttDto: CreateMqttDto): Promise<Terminal>;
    findAll(id: any): Promise<EMS123[]>;
    findOne(id: number): string;
    update(id: number, updateMqttDto: UpdateMqttDto): string;
    remove(id: number): string;
}
