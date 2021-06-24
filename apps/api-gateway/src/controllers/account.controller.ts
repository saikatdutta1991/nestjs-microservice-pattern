import {
  BadRequestException,
  Controller,
  Inject,
  Headers,
  Get,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { Account } from 'shared/service-contracts/account/account';
import { AccountRoles } from 'shared/service-contracts/account/account-roles.';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { GetAccessTokenInput } from 'shared/service-contracts/account/commands/get-access-token/get-access-token.input';
import { GetAccessTokenOutput } from 'shared/service-contracts/account/commands/get-access-token/get-access-token.output';
import { GetAccountInput } from 'shared/service-contracts/account/commands/get-account/get-account.input';
import { Auth } from '../decorators/auth.decorator';
import { SerializeOptions } from '../decorators/serialize.decorator';
import { AccountResponse } from '../dto/account.response';

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}

  @Get('/access-token')
  public async getAccessToken(@Headers('refresh-token') refreshToken: string) {
    return await this.accountService
      .send<GetAccessTokenOutput, GetAccessTokenInput>(
        { cmd: AccountCommands.ACCESS_TOKEN },
        { refreshToken },
      )
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  @Get('/:accountId')
  @Auth(AccountRoles.USER)
  @SerializeOptions({ transformClassRef: AccountResponse })
  public async getAccountById(
    @Param('accountId') accountId: string,
  ): Promise<AccountResponse> {
    return await this.accountService
      .send<Account, GetAccountInput>(
        { cmd: AccountCommands.GET_ACCOUNT },
        { accountId },
      )
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }
}
