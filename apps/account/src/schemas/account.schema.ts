import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountType } from 'shared/enums/account-type.enum';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ type: AccountType, enum: AccountType, default: AccountType.USER })
  type: AccountType;

  @Prop({ required: true })
  username: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  refreshToken: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
