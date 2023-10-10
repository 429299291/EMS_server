import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/entities/entities';
import { Repository } from 'typeorm';
export declare class EmailService {
    private readonly mailerService;
    private readonly user;
    constructor(mailerService: MailerService, user: Repository<User>);
    example(emailData: {
        subject: string;
        text: string;
        html: string;
        to: string;
    }, res: any): Promise<void>;
    create(createEmailDto: CreateEmailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEmailDto: UpdateEmailDto): string;
    remove(id: number): string;
}
