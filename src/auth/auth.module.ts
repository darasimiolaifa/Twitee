import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { MAIL_QUEUE } from 'src/utils/constants';
import { bullOptions, jwtOptions } from 'src/utils/utils';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { MailProcessor } from './mail-queue.processor';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    BullModule.registerQueueAsync({
      name: MAIL_QUEUE,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<BullModuleOptions> => ({
          ...bullOptions(configService)
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...jwtOptions(configService),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    MailProcessor,
    MailService,
  ],
  exports: [PassportModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
