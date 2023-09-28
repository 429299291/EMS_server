import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { TerminalService } from './device.service';
import { CreateDeviceDto,updateTerminalDTO } from './dto/create-device.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Terminal } from './entities/device.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('terminal')
export class TerminalController {
  constructor(private readonly deviceService: TerminalService) {}

  @Post()
  @ApiTags("Terminal")
  // @UseGuards(AuthGuard)
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Put("")
  @ApiTags("Terminal")
  put(@Body() putDeviceDto: updateTerminalDTO) {    
    return this.deviceService.putTerminal(putDeviceDto);
  }

  @Post('terminals')
  @ApiTags("Terminal")
  @UseGuards(AuthGuard)
  getDevices(@Body() createDeviceDto: CreateDeviceDto) {    
    return this.deviceService.getDevices(createDeviceDto);
  }

  @Get()
  @ApiTags("Terminal")
  @UseGuards(AuthGuard)
  findAll() {
    return this.deviceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiTags("Terminal")
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Patch(':id')
  @ApiTags("Terminal")
  update(@Param('id') id: string, @Body() updateDeviceDto: updateTerminalDTO) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiTags("Terminal")
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}
