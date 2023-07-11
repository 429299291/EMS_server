import { PartialType } from '@nestjs/mapped-types';
import { CreateEmDto } from './create-em.dto';

export class UpdateEmDto extends PartialType(CreateEmDto) {}
