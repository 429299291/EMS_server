import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";

export class CreateDeviceDto {
  @ApiProperty({example:"测试一号"})
  readonly name: string;
  @ApiProperty({example:"00007"})
  readonly id: string;
  @ApiProperty({example:1})
  readonly status: number;
  @ApiProperty({example:{
    location:"深圳",
    lat:39.904989,
    lng:116.405285,
    electrovalency:0.53,
    maxElectrovalency:0.78,
    minElectrovalency:0.49,
    sunrise:"05:43",
    sunset:"17:09",    
  }})
  readonly location: object;
  @ApiProperty({example:"voltronicpower"})
  readonly supplier: string;
  @ApiProperty({example:0,maximum:3})
  readonly WorkingMode: number;
  @ApiProperty({example:"4636cb2b-435d-4cc9-a934-f33811511fbc"})
  readonly userId:string;
}
type location={
  location:string,
  lat:number,
  lng:number,
  electrovalency:number,
  maxElectrovalency:number,
  minElectrovalency:number,
  sunrise:string,
  sunset:string
}
export class updateTerminalDTO{
  @ApiProperty({example:"00007"})
  id:string;
  @ApiProperty({example:"测试一号"})
  name:string;
  @ApiProperty({example:1})
  status:number;
  @ApiProperty({example:0,maximum:3})
  WorkingMode:number;
  @ApiProperty({example:"00001"})
  userId:string;
  @ApiProperty({example:"voltronicpower"})
  supplier:string;
  @ApiProperty({example:{
    location:"深圳",
    lat:39.904989,
    lng:116.405285,
    electrovalency:0.53,
    maxElectrovalency:0.78,
    minElectrovalency:0.49,
    sunrise:"05:43",
    sunset:"17:09",    
  }})
  location:location;
  // @ApiProperty({example:"00001"})
  // userId:string;
  // @ApiProperty({example:"00001"})
  // userId:string;
  // @ApiProperty({example:"00001"})
  // userId:string;
}