import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: configService.get<string>('database.url'),
        // port: configService.get<number>('database.port'),
        // username: configService.get<string>('database.username'),
        // password: configService.get<string>('database.password'),
        // database: configService.get<string>('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*.ts'],
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        cli: {
          migrationsDir: './migrations',
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MailModule,
    AuthModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
