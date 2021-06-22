import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { AccountCommand } from 'shared/commands/account.command';
import { CreateAccountDto } from 'shared/dto/account/create-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}

  @Post('/')
  public async createAccount(@Body() createdAccountDto: CreateAccountDto) {
    return await this.accountService
      .send({ cmd: AccountCommand.CREATE }, createdAccountDto)
      .toPromise()
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }
}
