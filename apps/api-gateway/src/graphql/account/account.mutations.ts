import { BadRequestException, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { CreateAccountInput as CreateAccountSharedInput } from 'shared/service-contracts/account/commands/create-account/create-account.input';
import { CreateAccountOutput } from 'shared/service-contracts/account/commands/create-account/create-account.output';
import { CreateAccountInput } from './dto/create-account.input';
import { Account } from './models/account.model';

@Resolver(() => Account)
export class AccountMutations {
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}

  @Mutation(() => Account)
  public async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ): Promise<Account> {
    return await this.accountService
      .send<CreateAccountOutput, CreateAccountSharedInput>(
        { cmd: AccountCommands.CREATE },
        createAccountInput,
      )
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }
}
