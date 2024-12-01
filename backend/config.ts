import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 27017,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'password',
      dbname: process.env.DB_NAME || 'forestaCTG',
      connection: process.env.DB_CONNECTION || 'mongodb',
    },
    databaseUrl:
      process.env.DATABASE_URL || 'mongodb://localhost:27017/forestaCTG',
  };
});
