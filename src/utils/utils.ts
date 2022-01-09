import { ConfigService } from '@nestjs/config';

export const bullOptions = (configService: ConfigService) => ({
    redis: {
        host: configService.get<string>('database.redisHost'),
        port: configService.get<number>('database.redisPort'),
        username: configService.get<string>('database.redisUser'),
        password: configService.get<string>('database.redisPassword'),
    },
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
    },
    settings: {
        lockDuration: 300000,
        maxStalledCount: 2,
    },
});

export const jwtOptions = (configService: ConfigService) => ({
    secret: configService.get<string>('app.secret'),
    signOptions: {
        expiresIn: configService.get<number>('app.expiration'),
    }
});
