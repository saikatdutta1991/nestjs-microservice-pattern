import { BadRequestException, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { CreateAccountInput } from 'shared/service-contracts/account/commands/create-account/create-account.input';
import { CreateAccountOutput } from 'shared/service-contracts/account/commands/create-account/create-account.output';
import { SigninAccountInput } from 'shared/service-contracts/account/commands/signin-account/signin-account.input';
import { SigninAccountOutput } from 'shared/service-contracts/account/commands/signin-account/signin-account.output';
import { CreateAccountRequest } from './dto/create-account.request';
import { SigninAccountRequest } from './dto/signin-account.request';
import { SigninAccountResponse } from './dto/signin-account.response';
import { Account } from './models/account.model';

@Resolver(() => Account)
export class AccountMutations {
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}

  @Mutation(() => Account)
  public async createAccount(
    @Args('createAccountRequest') createAccountRequest: CreateAccountRequest,
  ): Promise<Account> {
    return await this.accountService
      .send<CreateAccountOutput, CreateAccountInput>(
        { cmd: AccountCommands.CREATE },
        createAccountRequest,
      )
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  @Mutation(() => SigninAccountResponse)
  public async signinAccount(
    @Args('signinAccountRequest') signinAccountRequest: SigninAccountRequest,
  ): Promise<SigninAccountResponse> {
    return await this.accountService
      .send<SigninAccountOutput, SigninAccountInput>(
        { cmd: AccountCommands.SIGNIN },
        signinAccountRequest,
      )
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }
}
