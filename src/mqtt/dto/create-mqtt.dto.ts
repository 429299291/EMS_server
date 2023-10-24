import { ApiProperty } from "@nestjs/swagger";

export class CreateMqttDto {}
export class commendDTO {
  @ApiProperty({example:0})
  WorkingMode:number;
  @ApiProperty({example:"00007"})
  id:string
}
export class getDashboardElectricityDTO{
  @ApiProperty({example:"0000007"})
  id:string;
  @ApiProperty({example:1693564868})
  startTime:number;
  @ApiProperty({example:1693564869})
  endTime:number;
}
export class dashboardElectricityDTO{
  HOMEdata:[string,number][];
  GRIDdata:[string,number][];
  BATdata:[string,number][];
  PVdata:[string,number][];
  EVdata:[string,number][];
}