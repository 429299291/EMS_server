import { EMS123 } from "src/mqtt/entities/mqtt.entity";
import { User } from "src/user/entities/entities";
export declare class Device {
    id: number;
    name: string;
    deviceId: string;
    location: string;
    supplier: string;
    WorkingMode: number;
    date: Date;
    user: User;
    terminal: EMS123[];
}
