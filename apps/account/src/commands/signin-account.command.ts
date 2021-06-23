import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { SigninAccountInput } from 'shared/service-contracts/account/commands/signin-account/signin-account.input';
import { SigninAccountOutput } from 'shared/service-contracts/account/commands/signin-account/signin-account.output';
import { AccountHelper } from '../helpers/account.helper';

@Controller()
export class SigninAccountCommand {
  constructor(private readonly accountHelper: AccountHelper) {}

  @MessagePattern({ cmd: AccountCommands.SIGNIN })
  public async signinAccount(
    signinAccountInput: SigninAccountInput,
  ): Promise<SigninAccountOutput> {
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

    const accessToken = this.accountHelper.generateAccessToken({
      accountId: updatedAccount._id,
      username: updatedAccount.username,
    });

    return {
      account: updatedAccount,
      accessToken,
      refreshToken,
    };
  }
}
