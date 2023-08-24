import { EMS123 } from "src/mqtt/entities/mqtt.entity";
import { User } from "src/user/entities/entities";
export declare class Device {
    id: number;
    name: string;
    deviceId: string;
    status: number;
    location: {
        location: string;
        lng: number;
        lat: number;
        electrovalency: number;
        maxElectrovalency: number;
        minElectrovalency: number;
        sunrise: string;
        sunset: string;
    };
    supplier: string;
    WorkingMode: number;
    date: Date;
    user: User;
    terminal: EMS123[];
}
