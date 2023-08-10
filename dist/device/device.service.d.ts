import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';
export declare class DeviceService {
    private readonly device;
    constructor(device: Repository<Device>);
    create(createDeviceDto: CreateDeviceDto): Promise<(CreateDeviceDto & Device) | {
        code: number;
        message: string;
    }>;
    findAll(): Promise<Device[]>;
    findOne(id: number): string;
    update(id: number, updateDeviceDto: UpdateDeviceDto): string;
    remove(id: number): string;
}
