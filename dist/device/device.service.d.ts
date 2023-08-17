import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { User } from 'src/user/entities/entities';
import { Repository } from 'typeorm';
export declare class DeviceService {
    private readonly device;
    private readonly user;
    constructor(device: Repository<Device>, user: Repository<User>);
    create(createDeviceDto: CreateDeviceDto): Promise<User | {
        code: number;
        message: string;
    }>;
    getDevices(body: any): Promise<{
        data: Device[];
        total: number;
        success: boolean;
    } | {
        data: Device;
        total: number;
        success: boolean;
    }>;
    findAll(): Promise<Device[]>;
    findOne(id: number): string;
    update(id: number, updateDeviceDto: UpdateDeviceDto): string;
    remove(id: number): string;
}
