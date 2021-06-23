import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountRoles } from 'shared/service-contracts/account/account-roles.';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ type: AccountRoles, enum: AccountRoles, default: AccountRoles.USER })
  role: AccountRoles;

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
