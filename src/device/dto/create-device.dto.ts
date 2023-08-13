export class CreateDeviceDto {
  readonly name: string;
  readonly deviceId: string;
  readonly location: object;
  readonly supplier: string;
  readonly WorkingMode: number;
  readonly userId:string;
}
