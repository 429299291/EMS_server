import { Injectable } from '@nestjs/common';
import { CreateEmDto } from './dto/create-em.dto';
import { UpdateEmDto } from './dto/update-em.dto';

@Injectable()
export class EmsService {
  create(createEmDto: CreateEmDto) {
    return 'This action adds a new em';
  }

  findAll() {
    return `This action returns all ems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} em`;
  }

  update(id: number, updateEmDto: UpdateEmDto) {
    return `This action updates a #${id} em`;
  }

  remove(id: number) {
    return `This action removes a #${id} em`;
  }
}
