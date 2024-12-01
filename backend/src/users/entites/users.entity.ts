import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class User {
  @Prop({ required: true })
  id: string;

  @Prop()
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  avatar: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
