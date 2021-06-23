import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { CreateAccountInput } from 'shared/service-contracts/account/commands/create-account/create-account.input';
import { CreateAccountOutput } from 'shared/service-contracts/account/commands/create-account/create-account.output';
import { SigninAccountInput } from 'shared/service-contracts/account/commands/signin-account/signin-account.input';
import { SigninAccountOutput } from 'shared/service-contracts/account/commands/signin-account/signin-account.output';

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}

  @Post('/')
  public async createAccount(@Body() createAccountInput: CreateAccountInput) {
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
  public async signinAccount(@Body() signinAccountInput: SigninAccountInput) {
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
}
