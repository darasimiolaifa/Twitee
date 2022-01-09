import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    url: process.env.DATABASE_URL,
    synchronize: process.env.SYNCHRONIZE,
    redisHost: process.env.REDIS_HOST || '127.0.0.1',
    redisPort: process.env.REDIS_PORT || 6379,
    redisPassword: process.env.REDIS_PASSWORD || '',
    redisUser: process.env.REDIS_USER || '',
}));
