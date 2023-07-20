import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
export declare class UploadService {
    create(createUploadDto: CreateUploadDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUploadDto: UpdateUploadDto): string;
    remove(id: number): string;
}
