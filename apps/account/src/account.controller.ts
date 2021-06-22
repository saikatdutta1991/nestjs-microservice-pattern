import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountService } from './account.service';
import { CreateAccountDto } from '../../../shared/dto/account/create-account.dto';
import { AccountDocument } from './schemas/account.schema';
import { AccountCommand } from 'shared/commands/account.command';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @MessagePattern({ cmd: AccountCommand.CREATE })
  public async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<AccountDocument> {
    return await this.accountService.createAccount(createAccountDto);
  }
}
