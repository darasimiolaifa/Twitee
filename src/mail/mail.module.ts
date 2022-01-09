import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule],
  providers: [MailService, ConfigService],
  exports: [MailService],
})
export class MailModule {}
