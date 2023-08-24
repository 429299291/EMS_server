import { Device } from "src/device/entities/device.entity";
interface bat {
    id: string;
    volt: number;
    power: number;
    SOC: number;
    SOH?: number;
    maxTemp?: number;
    minTemp?: number;
}
interface ev {
    id: string;
    status?: number;
    volt: number;
    power: number;
    electricCurrent: number;
}
interface grid {
    power: number;
    volt: number;
}
interface pv {
    id?: string;
    power: number;
    volt: number;
}
interface inv {
    id: string;
    power: number;
    electricCurrent: number;
    volt: number;
}
interface home {
    power: number;
    volt: number;
}
interface fault {
    id: string;
    name: string;
    errorCode: number;
}
export declare class EMS123 {
    id: number;
    name: string;
    WorkingMode: number;
    BAT: bat[];
    EV: ev[];
    GRID: grid[];
    PV: pv[];
    HOME: home[];
    INV?: inv[];
    fault: fault[];
    timeStamp: number;
    device: Device;
}
export {};
