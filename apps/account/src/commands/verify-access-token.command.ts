import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { VerifyAccessTokenInput } from 'shared/service-contracts/account/commands/verify-access-token/verify-access-token.input';
import { VerifyAccessTokenOutput } from 'shared/service-contracts/account/commands/verify-access-token/verify-access-token.output';
import { AccountHelper } from '../helpers/account.helper';

@Controller()
export class VerifyAccessTokenCommand {
  constructor(private readonly accountHelper: AccountHelper) {}

  @MessagePattern({ cmd: AccountCommands.VERIFY_ACCESS_TOKEN })
  public async verifyAccessToken(
    verifyAccessTokenInput: VerifyAccessTokenInput,
  ): Promise<VerifyAccessTokenOutput> {
    try {
      const payload = await this.accountHelper.verifyAccessToken(
        verifyAccessTokenInput.accessToken,
      );
      return payload as VerifyAccessTokenOutput;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
