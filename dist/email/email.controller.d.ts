import { EmailService } from './email.service';
import { CreateEmailDto, CreateNotificationDTO } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    create(createEmailDto: CreateEmailDto): string;
    findAll(res: any): string;
    notification(body: CreateNotificationDTO, res: any): Promise<any>;
    findOne(id: string): string;
    update(id: string, updateEmailDto: UpdateEmailDto): string;
    remove(id: string): string;
}
