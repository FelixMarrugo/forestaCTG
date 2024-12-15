import { Injectable } from '@nestjs/common';
import { ScheduledMaintenance } from '../entities/scheduled-maintenance.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import {
  CreateScheduledMaintenanceDto,
  UpdateScheduledMaintenanceDto,
} from '../dtos/scheduled-maintenance.dto';

@Injectable()
export class ScheduledMaintenanceService {
  constructor(
    @InjectModel(ScheduledMaintenance.name)
    private scheduledMaintenanceModel: Model<ScheduledMaintenance>,
  ) {}

  async getAll() {
    return await this.scheduledMaintenanceModel.find();
  }

  async findOne(idMaintenance: string) {
    const scheduledMaintenance = await this.scheduledMaintenanceModel.find({
      idMaintenance: idMaintenance,
    });
    if (!scheduledMaintenance) {
      throw new Error(`Tree with id ${idMaintenance} not found`);
    }
    return scheduledMaintenance;
  }

  async create(body: CreateScheduledMaintenanceDto) {
    const newScheduledMaintenance =
      await this.scheduledMaintenanceModel.insertMany([body]);
    return newScheduledMaintenance;
  }

  // FALTA POR IMPLEMENTAR
  async update(id: string, body: UpdateScheduledMaintenanceDto) {
    await this.scheduledMaintenanceModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: body },
    );
    return await this.scheduledMaintenanceModel.findById(id);
  }

  // FALTA POR IMPLEMENTAR
  async disable(id: string) {
    await this.scheduledMaintenanceModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: { state: false } },
    );
    return await this.scheduledMaintenanceModel.findById(id);
  }
}
