import { ApiProperty } from "@nestjs/swagger";

interface locationType {
  location:string
}
export class CreateUserDto {
  @ApiProperty({example:"Davis"})
  readonly name: string;
  @ApiProperty({example:18})
  readonly age: number;
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
  // readonly id:string;
  // readonly date:string;
  // readonly uuid:string;
  // @ApiProperty({example:["dashboard","liveView"]})
  // readonly terminals:any[];
  @ApiProperty({example:{location:"深圳"}})
  readonly location:locationType;
  @ApiProperty({example:["dashboard","about"]})
  readonly accessPermissions:string[];
}
