import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from 'src/user/user.module';

const options = new DocumentBuilder()
    .setTitle('Users Example')
    .setDescription('The users API documentation')
    .setVersion('1.0')
    .addTag('user')
    .build();

export default (app: INestApplication) => {
    return SwaggerModule.createDocument(app, options, {
        include: [UserModule],
    });
}