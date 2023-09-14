import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TerminalService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('terminal')
export class TerminalController {
  constructor(private readonly deviceService: TerminalService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Post('terminals')
  @UseGuards(AuthGuard)
  getDevices(@Body() createDeviceDto: CreateDeviceDto) {    
    return this.deviceService.getDevices(createDeviceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.deviceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
