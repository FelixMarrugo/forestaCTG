import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './../config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}
  getHello(): string {
    const apiKey = this.configService.databaseUrl;
    return `This app is in development! ${apiKey}`;
  }

  getTree() {
    const collection = this.database.collection('trees');
    return collection.find().toArray();
  }
}
