import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from '../../../shared/dto/account/create-account.dto';
import { Account, AccountDocument } from './schemas/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  public async getAccountByUsername(
    username: string,
  ): Promise<AccountDocument> {
    return await this.accountModel.findOne({ username });
  }

  public async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<AccountDocument> {
    const { username } = createAccountDto;

    const existingAccount = await this.getAccountByUsername(username);
    if (existingAccount) {
      throw new RpcException(`${username} already exists.`);
    }

    const account = new this.accountModel(createAccountDto);
    return await account.save();
  }
}
