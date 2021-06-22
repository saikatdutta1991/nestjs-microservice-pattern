import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountCommand } from 'shared/commands/account.command';
import { SigninAccountInput } from '../dto/signin-account.input';
import { AccountHelper } from '../helpers/account.helper';
import { Account, AccountDocument } from '../schemas/account.schema';

@Controller()
export class SigninAccountCommand {
  constructor(
    private readonly accountHelper: AccountHelper,
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  @MessagePattern({ cmd: AccountCommand.SIGNIN })
  public async signinAccount(signinAccountInput: SigninAccountInput): Promise<{
    account: AccountDocument;
    authToken: string;
    refreshToken: string;
  }> {
    const { username, password } = signinAccountInput;

    const account = await this.accountHelper.getAccountByUsername(username);
    if (
      !account ||
      !this.accountHelper.isPasswordMatch(password, account.passwordHash)
    ) {
      throw new RpcException('Invalid username or password');
    }

    const refreshToken =
      account.refreshToken || this.accountHelper.generateRefreshToken();
    const updatedAccount = await this.accountHelper.updateAccountById(
      account._id,
      { refreshToken },
    );

    const authToken = this.accountHelper.generateAuthToken({
      accountId: updatedAccount._id,
      username: updatedAccount.username,
    });

    return {
      account: updatedAccount,
      authToken,
      refreshToken,
    };
  }
}
