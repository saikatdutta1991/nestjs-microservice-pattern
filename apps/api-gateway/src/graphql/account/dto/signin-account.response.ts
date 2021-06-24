import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from '../models/account.model';

@ObjectType()
export class SigninAccountResponse {
  @Field(() => Account)
  account: Account;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
