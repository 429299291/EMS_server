import { Injectable } from '@nestjs/common';
import { CreateEmailDto, CreateNotificationDTO } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/entities/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService,@InjectRepository(User) private readonly user:Repository<User>) {}
  //邮件发送
  public async example(emailData:{subject:string,text:string,html:string,to:string},res) {
    const currentUser = await this.user.findOneBy({email:emailData.to})    
    if(currentUser){
      res.json(
        {
          code:204,
          message:"用户已经注册!"
        }
      )}else{
      return this.mailerService
      .sendMail({
        // to: 'sandy_you@alwayscontrol.com.cn',
        to: emailData.to,
        from: 'neuron@alwayscontrol.com.cn',
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
      })
      .then((data) => {        
        res.json({
          code : 200,
          message:"邮件发送成功"
        })
      })
      .catch((err) => {        
        res.json ({
          code:204,
          message:"邮件发送失败"
        })
      });
    }
  }

  notification(notificationData: CreateNotificationDTO,res) {    
    return this.mailerService
    .sendMail({
      // to: 'sandy_you@alwayscontrol.com.cn',
      to: notificationData.email,
      from: 'neuron@alwayscontrol.com.cn',
      subject: notificationData.title,
      text: notificationData.message,
      html: notificationData.message,
    })
    .then((data) => {
      res.json({
        code : 200,
        message:"邮件发送成功"
      })
    })
    .catch((err) => {        
      res.json ({
        code:204,
        message:"邮件发送失败"
      })
    });
  }

  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
