import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  username: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
