import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    environment: process.env.NODE_ENV  || 'development',
    apiName: process.env.API_NAME || 'Twitee',
    port: process.env.PORT || 5000,
    secret: process.env.SECRET || '',
    sgApiKey: process.env.SENDGRID_API_KEY,
    expiration: process.env.TOKEN_EXPIRATION || (3600 * 24)
}));
