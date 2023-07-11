import { CreateEmDto } from './dto/create-em.dto';
import { UpdateEmDto } from './dto/update-em.dto';
export declare class EmsService {
    create(createEmDto: CreateEmDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEmDto: UpdateEmDto): string;
    remove(id: number): string;
}
