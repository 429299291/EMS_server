import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';
import { EMS123 } from './entities/mqtt.entity';
import { Repository } from 'typeorm';
import { Terminal } from 'src/terminal/entities/device.entity';
import { RedisCacheHelper } from '@jasonsoft/nestjs-redis';
export declare class MqttService {
    private readonly ems;
    private readonly terminal;
    private readonly redisCacheHelper;
    private bufferList;
    constructor(ems: Repository<EMS123>, terminal: Repository<Terminal>, redisCacheHelper: RedisCacheHelper);
    create(createMqttDto: CreateMqttDto): Promise<void>;
    saveEMS123(id: any): Promise<void>;
    findAll(id: any): Promise<EMS123[]>;
    getHomeElectricity(body: any, res: any): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateMqttDto: UpdateMqttDto): string;
    remove(id: number): string;
}
