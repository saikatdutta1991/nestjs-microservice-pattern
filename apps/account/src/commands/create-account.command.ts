import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { CreateAccountInput } from 'shared/service-contracts/account/commands/create-account/create-account.input';
import { CreateAccountOutput } from 'shared/service-contracts/account/commands/create-account/create-account.output';
import { AccountHelper } from '../helpers/account.helper';

@Controller()
export class CreateAccountCommand {
  constructor(private readonly accountHelper: AccountHelper) {}

  @MessagePattern({ cmd: AccountCommands.CREATE })
  public async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    const { username, password } = createAccountInput;

    const existingAccount = await this.accountHelper.getAccountByUsername(
      username,
    );
    if (existingAccount) {
      throw new RpcException(`${username} already exists.`);
    }

    Object.assign(createAccountInput, {
      passwordHash: await this.accountHelper.hashPassword(password),
    });

    return this.accountHelper.createAccount(createAccountInput);
  }
}
