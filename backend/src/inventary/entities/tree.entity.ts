import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tree extends Document {
  @Prop()
  location: string;

  @Prop({ required: true })
  commonName: string;

  @Prop({ required: true })
  scientificName: string;

  @Prop()
  neighborhood: string;

  @Prop({ required: true })
  locality: string;

  @Prop()
  physicalDescription: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  state: boolean;
}

export const TreeSchema = SchemaFactory.createForClass(Tree);
