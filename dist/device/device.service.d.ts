import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Terminal } from './entities/device.entity';
import { User } from 'src/user/entities/entities';
import { Repository } from 'typeorm';
export declare class DeviceService {
    private readonly terminal;
    private readonly user;
    constructor(terminal: Repository<Terminal>, user: Repository<User>);
    create(createDeviceDto: CreateDeviceDto): Promise<User | {
        code: number;
        message: string;
    }>;
    getDevices(body: any): Promise<{
        data: Terminal[];
        total: number;
        success: boolean;
    }>;
    findAll(): Promise<Terminal[]>;
    findOne(id: number): string;
    update(id: number, updateDeviceDto: UpdateDeviceDto): string;
    remove(id: number): string;
}
