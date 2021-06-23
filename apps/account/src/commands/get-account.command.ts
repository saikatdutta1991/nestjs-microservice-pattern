import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Account } from 'shared/service-contracts/account/account';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { GetAccountInput } from 'shared/service-contracts/account/commands/get-account/get-account.input';
import { AccountHelper } from '../helpers/account.helper';

@Controller()
export class GetAccountCommand {
  constructor(private readonly accountHelper: AccountHelper) {}

  @MessagePattern({ cmd: AccountCommands.GET_ACCOUNT })
  public async getAccount(getAccountInput: GetAccountInput): Promise<Account> {
    const { accountId } = getAccountInput;
    return await this.accountHelper.getAccountById(accountId);
  }
}
