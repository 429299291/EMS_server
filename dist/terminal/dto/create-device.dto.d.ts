export declare class CreateDeviceDto {
    readonly name: string;
    readonly id: string;
    readonly status: number;
    readonly location: object;
    readonly supplier: string;
    readonly WorkingMode: number;
    readonly userId: string;
}
type location = {
    location: string;
    lat: number;
    lng: number;
    electrovalency: number;
    maxElectrovalency: number;
    minElectrovalency: number;
    sunrise: string;
    sunset: string;
};
export declare class updateTerminalDTO {
    id: string;
    name: string;
    status: number;
    WorkingMode: number;
    userId: string;
    supplier: string;
    location: location;
}
export {};
