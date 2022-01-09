import {
    OnQueueCompleted,
    OnQueueFailed,
    Process,
    Processor,
} from '@nestjs/bull';
import { BadRequestException, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MailService } from 'src/mail/mail.service';
import { MAIL_QUEUE, SEND_MAIL } from 'src/utils/constants';

@Processor(MAIL_QUEUE)
export class MailProcessor {
    constructor(private readonly mailService: MailService) {}

    private readonly logger = new Logger(MailProcessor.name);

    @Process(SEND_MAIL)
    async registrationMail(job: Job) {
        const { data: { receiver, message, name, template, subject }} = job;

        if (!receiver || !message || !template || !subject) {
			throw new BadRequestException('Missing params of job');
		}

        this.logger.log(`Sending registration mail to ${receiver}`);

        return await this.mailService.mailer(receiver, { message, username: name }, template, subject);
    }

    @OnQueueCompleted()
    complete() {
        this.logger.log('Mail sent sucessfully.');
    }

    @OnQueueFailed()
    failed(job: Job, error: Error) {
        this.logger.log('Mail not sent.');
        this.logger.log(error);
    }
}