import { Injectable } from '@nestjs/common';
import { Maintenance } from '../entities/maintenance.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from '../dtos/maintenance.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectModel(Maintenance.name) private maintenanceModel: Model<Maintenance>,
  ) {}

  async getAll(filter: object) {
    return await this.maintenanceModel.find(filter);
  }

  async findOne(id: string) {
    const maintenance = await this.maintenanceModel.findById(id);
    if (!maintenance) {
      throw new Error(`Tree with id ${id} not found`);
    }
    return maintenance;
  }

  async create(body: CreateMaintenanceDto) {
    const newMaintenance = await this.maintenanceModel.insertMany([body]);
    return newMaintenance;
  }

  async update(id: string, body: UpdateMaintenanceDto) {
    await this.maintenanceModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: body },
    );
    return await this.maintenanceModel.findById(id);
  }

  async disable(id: string) {
    await this.maintenanceModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: { state: false } },
    );
    return await this.maintenanceModel.findById(id);
  }
}
