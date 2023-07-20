import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { Response } from "express"
import { www } from '../constants';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {    
    return {
      code:200,
      message:"上传成功",
      data:`${www}/home/files/images/avatar/${file.filename}`
    }
  }
  //简单下载
  @Get('avatar')
  downloadAvatar(@Res() res:Response) {   
    const url = join(__dirname,'../files/images/avatar/1689863888602.png') 
    res.download(url)
  }
  //二进制流下载
  @Get('stream')
  async downloadStream(@Res() res:Response) {
    const url = join(__dirname,'../files/images/avatar/1689865626035.png') 
    const tarStream = new zip.Stream()
    await tarStream.addEntry(url)
    //固定格式请求头
    res.setHeader('Content-Type', 'application/octet-stream') ;
    res.setHeader(
    'Content-Disposition',
    'attachment; filename=xiaoman')
    tarStream.pipe(res)
  }

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
