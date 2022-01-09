import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const options = new DocumentBuilder()
    .setTitle('Posts Example')
    .setDescription('The posts API documentation')
    .setVersion('1.0')
    .addTag('posts')
    .build();

export default (app: INestApplication) => {
    return SwaggerModule.createDocument(app, options, {
        include: [],
    });
}
