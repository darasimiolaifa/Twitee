import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // port: Number(process.env.DATABASE_PORT),
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
