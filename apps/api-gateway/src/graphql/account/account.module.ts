import { Module } from '@nestjs/common';
import { AccountMutations } from './account.mutations';
import { AccountQueries } from './account.queries';

@Module({
  providers: [AccountQueries, AccountMutations],
})
export class AccountModule {}
