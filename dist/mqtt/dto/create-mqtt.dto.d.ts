export declare class CreateMqttDto {
}
export declare class commendDTO {
    WorkingMode: number;
    id: string;
}
export declare class getDashboardElectricityDTO {
    id: string;
    startTime: number;
    endTime: number;
}
export declare class dashboardElectricityDTO {
    HOMEdata: [string, number][];
    GRIDdata: [string, number][];
    BATdata: [string, number][];
    PVdata: [string, number][];
    EVdata: [string, number][];
}
