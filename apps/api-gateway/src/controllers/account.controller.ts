import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  Get,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { Account } from 'shared/service-contracts/account/account';
import { AccountRoles } from 'shared/service-contracts/account/account-roles.';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { CreateAccountInput } from 'shared/service-contracts/account/commands/create-account/create-account.input';
import { CreateAccountOutput } from 'shared/service-contracts/account/commands/create-account/create-account.output';
import { GetAccessTokenInput } from 'shared/service-contracts/account/commands/get-access-token/get-access-token.input';
import { GetAccessTokenOutput } from 'shared/service-contracts/account/commands/get-access-token/get-access-token.output';
import { GetAccountInput } from 'shared/service-contracts/account/commands/get-account/get-account.input';
import { SigninAccountInput } from 'shared/service-contracts/account/commands/signin-account/signin-account.input';
import { SigninAccountOutput } from 'shared/service-contracts/account/commands/signin-account/signin-account.output';
import { Auth } from '../decorators/auth.decorator';
import { SerializeOptions } from '../decorators/serialize.decorator';
import { AccountResponse } from '../dto/account.response';
import { SigninAccountResponse } from '../dto/signin-account.response';

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}

  @Post('/')
  @SerializeOptions({ transformClassRef: AccountResponse })
  public async createAccount(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<AccountResponse> {
    return await this.accountService
      .send<CreateAccountOutput, CreateAccountInput>(
        { cmd: AccountCommands.CREATE },
        createAccountInput,
      )
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  @Post('/signin')
  @SerializeOptions({ transformClassRef: SigninAccountResponse })
  public async signinAccount(
    @Body() signinAccountInput: SigninAccountInput,
  ): Promise<SigninAccountResponse> {
    return await this.accountService
      .send<SigninAccountOutput, SigninAccountInput>(
        { cmd: AccountCommands.SIGNIN },
        signinAccountInput,
      )
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

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
