import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Maintenance extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  neighborhood: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  state: boolean;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
