import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailData } from '@sendgrid/helpers/classes/mail';
import * as sendgrid from '@sendgrid/mail';
import { Liquid } from 'liquidjs';
import { resolve } from 'path';

@Injectable()
export class MailService {
    constructor(configService: ConfigService) {
        sendgrid.setApiKey(configService.get<string>('app.sgApiKey') || '');
    }

    async send(emailTemplate, mailData: MailData) {
        const parsedTemplate = await this.parseTemplate(emailTemplate);

        try {
            return sendgrid.send({
                ...mailData,
                html: parsedTemplate || '',
            });
        } catch (error) {
            console.error({ mailError: error });
        }
    }

    private async parseTemplate(emailTemplate) {
        const liquidEngine = new Liquid({
            root: resolve(__dirname, './templates'),
            extname: '.liquid',
        });

        return liquidEngine.renderFile(emailTemplate.name, emailTemplate.data);
    }

    async mailer(receiver: string, payload: any, template: string, subject: string) {
        return await this.send(
            {
                name: template,
                data: {
                    ...payload
                },
            },
            {
                from: 'Twitee Support <darnifconcepts@gmail.com>',
                to: receiver,
                subject
            },
        )
        .then(() => console.log({ success: `Mail sent to ${receiver} successfully.`}))
        .catch(error => { throw error });
    }
}
