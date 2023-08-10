import { Device } from "src/device/entities/device.entity";
export declare class User {
    id: number;
    name: string;
    avatar: string;
    age: number;
    balance: number;
    phone: string;
    email: string;
    identity: string;
    accessPermissions: string[];
    date: Date;
    uuid: string;
    actived: boolean;
    password: string;
    location: {
        location: string;
    };
    device: Device[];
}
