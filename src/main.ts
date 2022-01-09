import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import postsDocument from './docs/posts.docs';
import usersDocument from './docs/users.docs';
import commentsDocument from './docs/comments.docs';
import authDocument from './docs/auth.docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = app.get<Logger>(Logger);

  const envType = configService.get<string>('app.environment');
  const apiName = configService.get<string>('app.apiName');
  const port = configService.get<string>('app.port');

  app.enableCors();

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  SwaggerModule.setup('api/v1/docs/auth', app, authDocument(app));
  SwaggerModule.setup('api/v1/docs/posts', app, postsDocument(app));
  SwaggerModule.setup('api/v1/docs/users', app, usersDocument(app));
  SwaggerModule.setup('api/v1/docs/comments', app, commentsDocument(app));

  await app.listen(port, () => {
    logger.log(
      `******* Started the ${apiName} on port ${port} for ${envType} *******`,
    );
  });
}
bootstrap();
