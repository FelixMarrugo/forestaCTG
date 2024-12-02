import { Module } from '@nestjs/common';
import { MaintenanceController } from './controller/maintenance.controller';
import { MaintenanceService } from './services/maintenance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Maintenance, MaintenanceSchema } from './entities/maintenance.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Maintenance.name,
        schema: MaintenanceSchema,
      },
    ]),
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
})
export class MaintenanceModule {}
