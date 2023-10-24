import { ApiProperty } from "@nestjs/swagger"

export class CreateEmailDto {}
export class CreateNotificationDTO {
  @ApiProperty({example:"12345@qq.com"})
  readonly email:string;
  @ApiProperty({example:"您的00003号设备运行故障,故障码为:003"})
  message:string;
  @ApiProperty({example:"旭衡电子设备故障"})
  title:string;
}
