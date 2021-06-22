import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountCommand } from 'shared/commands/account.command';
import { CreateAccountInput } from '../dto/account/create-account.input';
import { AccountHelper } from '../helpers/account.helper';
import { Account, AccountDocument } from '../schemas/account.schema';

@Controller()
export class CreateAccountCommand {
  constructor(
    private readonly accountHelper: AccountHelper,
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  @MessagePattern({ cmd: AccountCommand.CREATE })
  public async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<AccountDocument> {
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

    const account = new this.accountModel(createAccountInput);
    return await account.save();
  }
}
