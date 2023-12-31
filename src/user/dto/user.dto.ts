import { ApiProperty } from "@nestjs/swagger";

interface locationType {
  location:string
}
export class CreateUserDto {
  @ApiProperty({example:"Davis"})
  readonly name: string;
  @ApiProperty({example:18})
  readonly age: number;
  @ApiProperty({example:8888})
  readonly emailCode: number;
  @ApiProperty({example:"429299291@qq.com"})
  readonly email: string;
  @ApiProperty({example:15111111111})
  readonly phone: string;
  @ApiProperty({example:"xuheng8888"})
  readonly password:string;
  @ApiProperty({example:"sfssf.png"})
  readonly avatar:string;
  @ApiProperty({example:"admin"})
  readonly identity:string;
  @ApiProperty({example:0})
  readonly balance:number;
  @ApiProperty({example:true})
  readonly actived:boolean;
  @ApiProperty({example:{location:"深圳"}})
  readonly location:locationType;
  @ApiProperty({example:["dashboard","about"]})
  readonly accessPermissions:string[];
}
export class updateUserDto {
  @ApiProperty({example:"Davis"})
  readonly name: string;
  @ApiProperty({example:18})
  readonly age: number;
  @ApiProperty({example:"429299291@qq.com"})
  readonly email: string;
  @ApiProperty({example:15111111111})
  readonly phone: string;
  @ApiProperty({example:"sfssf.png"})
  readonly avatar:string;
  @ApiProperty({example:"admin"})
  readonly identity:string;
  @ApiProperty({example:0})
  readonly balance:number;
  @ApiProperty({example:true})
  readonly actived:boolean;
  @ApiProperty({example:{location:"深圳"}})
  readonly location:locationType;
  @ApiProperty({example:["dashboard","about"]})
  readonly accessPermissions:string[];
}
export class getUsersDto {
  @ApiProperty({example:"1"})
  readonly current: string;
  @ApiProperty({example:"10"})
  readonly pageSize: string;
}
