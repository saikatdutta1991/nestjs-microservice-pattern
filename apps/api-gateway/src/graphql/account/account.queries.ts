import { Query, Resolver } from '@nestjs/graphql';
import { Account } from './models/account.model';

@Resolver(() => Account)
export class AccountQueries {
  @Query(() => Account)
  public async getAccount(): Promise<Account> {
    return {
      _id: 'new-id',
      role: 1,
      name: 'Saikat',
      username: 'saikatdutta1991',
    };
  }
}
