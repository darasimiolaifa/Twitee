import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from 'src/auth/auth.module';

const options = new DocumentBuilder()
    .setTitle('Authentication Example')
    .setDescription('The authentication API documentation')
    .setVersion('1.0')
    .addTag('auth')
    .build();

export default (app: INestApplication) => {
    return SwaggerModule.createDocument(app, options, {
        include: [AuthModule],
    });
}
