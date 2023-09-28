import { TerminalService } from './device.service';
import { CreateDeviceDto, updateTerminalDTO } from './dto/create-device.dto';
import { Terminal } from './entities/device.entity';
export declare class TerminalController {
    private readonly deviceService;
    constructor(deviceService: TerminalService);
    create(createDeviceDto: CreateDeviceDto): Promise<import("../user/entities/entities").User | {
        code: number;
        message: string;
    }>;
    put(putDeviceDto: updateTerminalDTO): Promise<{
        code: number;
        message: string;
    }>;
    getDevices(createDeviceDto: CreateDeviceDto): Promise<{
        data: Terminal[];
        total: number;
        success: boolean;
    }>;
    findAll(): Promise<Terminal[]>;
    findOne(id: string): string;
    update(id: string, updateDeviceDto: updateTerminalDTO): string;
    remove(id: string): string;
}
