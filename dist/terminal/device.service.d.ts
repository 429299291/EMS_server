import { CreateDeviceDto, updateTerminalDTO } from './dto/create-device.dto';
import { Terminal } from './entities/device.entity';
import { User } from 'src/user/entities/entities';
import { Repository } from 'typeorm';
export declare class TerminalService {
    private readonly terminal;
    private readonly user;
    constructor(terminal: Repository<Terminal>, user: Repository<User>);
    create(createDeviceDto: CreateDeviceDto): Promise<User | {
        code: number;
        message: string;
    }>;
    putTerminal(putDeviceDto: updateTerminalDTO): Promise<{
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
    update(id: number, updateDeviceDto: updateTerminalDTO): string;
    remove(id: number): string;
}
