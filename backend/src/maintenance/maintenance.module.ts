import { Module } from '@nestjs/common';
import { MaintenanceController } from './controller/maintenance.controller';
import { MaintenanceService } from './services/maintenance.service';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
import { Maintenance, MaintenanceSchema } from './entities/maintenance.entity';
=======
>>>>>>> Inventario-Fronted

import { MaintenanceSchema, Maintenance } from './entities/maintenance.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
<<<<<<< HEAD
      {
        name: Maintenance.name,
        schema: MaintenanceSchema,
      },
=======
      { name: Maintenance.name, schema: MaintenanceSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Maintenance.name, schema: MaintenanceSchema },
>>>>>>> Inventario-Fronted
    ]),
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
})
export class MaintenanceModule {}
