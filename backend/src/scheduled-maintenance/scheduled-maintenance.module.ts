import { Module } from '@nestjs/common';
import { ScheduledMaintenanceController } from './controller/scheduled-maintenance.controller';
import { ScheduledMaintenanceService } from './services/scheduled-maintenance.service';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ScheduledMaintenance,
  ScheduledMaintenanceSchema,
} from './entities/scheduled-maintenance.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ScheduledMaintenance.name,
        schema: ScheduledMaintenanceSchema,
      },
      { name: ScheduledMaintenance.name, schema: ScheduledMaintenanceSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: ScheduledMaintenance.name, schema: ScheduledMaintenanceSchema },
    ]),
  ],
  controllers: [ScheduledMaintenanceController],
  providers: [ScheduledMaintenanceService],
})
export class ScheduledMaintenanceModule {}
