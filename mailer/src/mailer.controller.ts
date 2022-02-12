import { MailerService } from '@nest-modules/mailer';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Config } from './config/config';
import { EmailDto } from './dto/email.dto';
import { response } from './lib/response';
import { PR } from './lib/response/type';
import { SEND } from './messages/mailer.message';

@Controller()
export class MailerController {
  constructor(private readonly mailer: MailerService, private readonly config: Config) {}

  @MessagePattern('hello_mailer')
  getHello(): string {
    return 'Hello from Mailer';
  }

  @MessagePattern(SEND)
  async mailSend(data: EmailDto): PR {
    if (this.config.get('isEmailDisabled')) return response(SEND, 0, { sent: false });

    try {
      await this.mailer.sendMail({
        ...data,
        context: data.templated && data.templated.context,
        template: data.templated && `./${data.templated.template}`,
      });

      return response(SEND, HttpStatus.OK, { sent: true });
    } catch {
      return response(SEND, HttpStatus.INTERNAL_SERVER_ERROR, { sent: false });
    }
  }
}
