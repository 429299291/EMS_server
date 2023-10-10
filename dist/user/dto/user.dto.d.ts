interface locationType {
    location: string;
}
export declare class CreateUserDto {
    readonly name: string;
    readonly age: number;
    readonly emailCode: number;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly avatar: string;
    readonly identity: string;
    readonly balance: number;
    readonly actived: boolean;
    readonly location: locationType;
    readonly accessPermissions: string[];
}
export declare class updateUserDto {
    readonly name: string;
    readonly age: number;
    readonly email: string;
    readonly phone: string;
    readonly avatar: string;
    readonly identity: string;
    readonly balance: number;
    readonly actived: boolean;
    readonly location: locationType;
    readonly accessPermissions: string[];
}
export declare class getUsersDto {
    readonly current: string;
    readonly pageSize: string;
}
export {};
