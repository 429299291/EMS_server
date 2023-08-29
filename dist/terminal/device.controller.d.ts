import { TerminalService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
export declare class TerminalController {
    private readonly deviceService;
    constructor(deviceService: TerminalService);
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
