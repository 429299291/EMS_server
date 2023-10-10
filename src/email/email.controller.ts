import { Controller, Get, Post, Body, Patch, Param, Delete,Response } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @ApiTags("email")
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Get()
  @ApiTags("email")
  findAll(@Response() res) {
    return this.emailService.findAll();
  }

  @Get(':id')
  @ApiTags("email")
  findOne(@Param('id') id: string) {
    return this.emailService.findOne(+id);
  }

  @Patch(':id')
  @ApiTags("email")
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(+id, updateEmailDto);
  }

  @Delete(':id')
  @ApiTags("email")
  remove(@Param('id') id: string) {
    return this.emailService.remove(+id);
  }
}
