import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AccountRoles } from 'shared/service-contracts/account/account-roles.';

registerEnumType(AccountRoles, { name: 'AccountRoles' });

@ObjectType()
export class Account {
  @Field()
  _id: string;

  @Field(() => AccountRoles)
  role: AccountRoles;

  @Field()
  username: string;

  @Field({ nullable: true })
  name: string;
}
