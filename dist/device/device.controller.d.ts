import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    create(createDeviceDto: CreateDeviceDto): Promise<import("../user/entities/entities").User | {
        code: number;
        message: string;
    }>;
    getDevices(createDeviceDto: CreateDeviceDto): Promise<{
        data: import("./entities/device.entity").Terminal[];
        total: number;
        success: boolean;
    }>;
    findAll(): Promise<import("./entities/device.entity").Terminal[]>;
    findOne(id: string): string;
    update(id: string, updateDeviceDto: UpdateDeviceDto): string;
    remove(id: string): string;
}
