import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountService } from './account.service';
import { CreateAccountDto } from '../../../shared/dto/account/create-account.dto';
import { AccountDocument } from './schemas/account.schema';
import { AccountCommand } from 'shared/commands/account.command';
import { SigninAccountDto } from 'shared/dto/account/signin-account.dto';
import { SigninAccountOutput } from 'shared/dto/account/signin-account.output';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern({ cmd: AccountCommand.CREATE })
  public async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<AccountDocument> {
    return await this.accountService.createAccount(createAccountDto);
  }

  @MessagePattern({ cmd: AccountCommand.SIGNIN })
  public async signinAccount(
    signinAccountDto: SigninAccountDto,
  ): Promise<SigninAccountOutput> {
    const { username, password } = signinAccountDto;
    return await this.accountService.signinAccount(username, password);
  }
}
