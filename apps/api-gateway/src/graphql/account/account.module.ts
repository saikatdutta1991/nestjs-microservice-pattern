import { Module } from '@nestjs/common';
import { AccountQueries } from './account.queries';

@Module({
  providers: [AccountQueries],
})
export class AccountModule {}
