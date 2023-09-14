import { ApiProperty } from "@nestjs/swagger"

export class CreateAuthDto {}
export class loginDTO {
  @ApiProperty({example:"Davis@qq.com"})
  email:string;
  @ApiProperty({example:"xuheng8888"})
  password:string;
}
