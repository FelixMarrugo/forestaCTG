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

  async getAll(filter: object) {
    return await this.scheduledMaintenanceModel.find(filter);
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

  async update(id: string, body: UpdateScheduledMaintenanceDto) {
    console.log('update', id, body);
    await this.scheduledMaintenanceModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: body },
    );
    return await this.scheduledMaintenanceModel.findById(id);
  }
}
