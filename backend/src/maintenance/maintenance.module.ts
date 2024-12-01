import { Module } from '@nestjs/common';
import { MaintenanceController } from './controller/maintenance.controller';
import { MaintenanceService } from './services/maintenance.service';

@Module({
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
})
export class MaintenanceModule {}
