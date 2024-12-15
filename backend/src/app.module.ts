import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { InventaryModule } from './inventary/inventary.module';
import { DatabaseModule } from './database/database.module';
import { environment } from 'enviroments';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ScheduledMaintenanceController } from './scheduled-maintenance/controller/scheduled-maintenance.controller';
import { ScheduledMaintenanceService } from './scheduled-maintenance/services/scheduled-maintenance.service';
import config from 'config';
import { ScheduledMaintenanceModule } from './scheduled-maintenance/scheduled-maintenance.module';

@Module({
  imports: [
    UsersModule,
    InventaryModule,
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MaintenanceModule,
    ScheduledMaintenanceModule,
  ],
  controllers: [AppController, ScheduledMaintenanceController],
  providers: [AppService, ConfigService, ScheduledMaintenanceService],
})
export class AppModule {}
