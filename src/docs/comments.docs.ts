import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommentModule } from 'src/comment/comment.module';

const options = new DocumentBuilder()
    .setTitle('Comments Example')
    .setDescription('The comments API documentation')
    .setVersion('1.0')
    .addTag('comment')
    .build();

export default (app: INestApplication) => {
    return SwaggerModule.createDocument(app, options, {
        include: [CommentModule],
    });
}