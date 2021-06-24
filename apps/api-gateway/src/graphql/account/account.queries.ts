import { BadRequestException, Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { AccountRoles } from 'shared/service-contracts/account/account-roles.';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { GetAccessTokenInput } from 'shared/service-contracts/account/commands/get-access-token/get-access-token.input';
import { GetAccessTokenOutput } from 'shared/service-contracts/account/commands/get-access-token/get-access-token.output';
import { GetAccountInput } from 'shared/service-contracts/account/commands/get-account/get-account.input';
import { Auth } from '../../decorators/auth.decorator';
import { Account } from './models/account.model';

@Resolver(() => Account)
export class AccountQueries {
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}

  @Query(() => Account)
  @Auth(AccountRoles.USER)
  public async getAccount(
    @Args('accountId') accountId: string,
  ): Promise<Account> {
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

  @Query(() => String)
  public async getAccessToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<string> {
    const { accessToken } = await this.accountService
      .send<GetAccessTokenOutput, GetAccessTokenInput>(
        { cmd: AccountCommands.ACCESS_TOKEN },
        { refreshToken },
      )
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });

    return accessToken;
  }
}
