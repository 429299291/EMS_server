import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Response } from "express";
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    upload(file: any): {
        code: number;
        message: string;
        data: string;
    };
    downloadAvatar(res: Response): void;
    downloadStream(res: Response): Promise<void>;
    create(createUploadDto: CreateUploadDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUploadDto: UpdateUploadDto): string;
    remove(id: string): string;
}
