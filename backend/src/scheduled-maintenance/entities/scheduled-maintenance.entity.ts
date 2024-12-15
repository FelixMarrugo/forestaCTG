import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ScheduledMaintenance extends Document {
  @Prop({ required: true })
  idMaintenance: string;

  @Prop({ required: true })
  idTree: string;

  @Prop({ required: true })
  description: string;
}

export const ScheduledMaintenanceSchema =
  SchemaFactory.createForClass(ScheduledMaintenance);
