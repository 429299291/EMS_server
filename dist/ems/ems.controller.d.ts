import { EmsService } from './ems.service';
import { CreateEmDto } from './dto/create-em.dto';
import { UpdateEmDto } from './dto/update-em.dto';
export declare class EmsController {
    private readonly emsService;
    constructor(emsService: EmsService);
    create(createEmDto: CreateEmDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEmDto: UpdateEmDto): string;
    remove(id: string): string;
}
