import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    create(createEmailDto: CreateEmailDto): string;
    findAll(res: any): string;
    findOne(id: string): string;
    update(id: string, updateEmailDto: UpdateEmailDto): string;
    remove(id: string): string;
}
