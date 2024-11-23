import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, username, password, host, port, dbname } =
          configService.database;
        return {
          uri: `${connection}://${username}:${password}@${host}:${port}/${dbname}?authSource=admin`,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, username, password, host, port, dbname } =
          configService.database;
        const uri = `${connection}://${username}:${password}@${host}:${port}/${dbname}?authSource=admin`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbname);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
