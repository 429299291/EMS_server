import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmsService } from './ems.service';
import { CreateEmDto } from './dto/create-em.dto';
import { UpdateEmDto } from './dto/update-em.dto';

@Controller('ems')
export class EmsController {
  constructor(private readonly emsService: EmsService) {}

  @Post()
  create(@Body() createEmDto: CreateEmDto) {
    return this.emsService.create(createEmDto);
  }

  @Get()
  findAll() {
    return "EMS云平台系统"
    return this.emsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmDto: UpdateEmDto) {
    return this.emsService.update(+id, updateEmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emsService.remove(+id);
  }
}
