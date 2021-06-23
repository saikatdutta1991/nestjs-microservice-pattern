import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { GetAccessTokenInput } from 'shared/service-contracts/account/commands/get-access-token/get-access-token.input';
import { GetAccessTokenOutput } from 'shared/service-contracts/account/commands/get-access-token/get-access-token.output';
import { AccountHelper } from '../helpers/account.helper';

@Controller()
export class GetAccessTokenCommand {
  constructor(private readonly accountHelper: AccountHelper) {}

  @MessagePattern({ cmd: AccountCommands.ACCESS_TOKEN })
  public async getAccessToken(
    getAccessTokenInput: GetAccessTokenInput,
  ): Promise<GetAccessTokenOutput> {
    const account = await this.accountHelper.getAccountByRefreshToken(
      getAccessTokenInput.refreshToken,
    );

    if (!account) {
      throw new RpcException('Invalid refresh token');
    }

    return {
      accessToken: this.accountHelper.generateAccessToken({
        accountId: account._id,
        username: account.username,
        type: account.type,
      }),
    };
  }
}
