import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Account, AccountDocument } from '../schemas/account.schema';
import { AUTH_TOKEN_EXPIRES_IN } from '../constants';
import { AccountType } from 'shared/service-contracts/account/account-type.';

@Injectable()
export class AccountHelper {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly configService: ConfigService,
  ) {}

  public async getAccountByUsername(
    username: string,
  ): Promise<AccountDocument> {
    return await this.accountModel.findOne({ username });
  }

  public async getAccountByRefreshToken(
    refreshToken: string,
  ): Promise<AccountDocument> {
    return await this.accountModel.findOne({ refreshToken });
  }

  public async createAccount(data: any): Promise<AccountDocument> {
    const account = new this.accountModel(data);
    return await account.save();
  }

  public async updateAccountById(
    accountId: string,
    data: any,
  ): Promise<AccountDocument> {
    return await this.accountModel.findOneAndUpdate({ _id: accountId }, data, {
      new: true,
    });
  }

  public async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  public async isPasswordMatch(password, hash): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public generateRefreshToken(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  public generateAccessToken(data: {
    accountId: string;
    username: string;
    type: AccountType;
  }): string {
    return jwt.sign(data, this.configService.get('jwtSecret'), {
      expiresIn: AUTH_TOKEN_EXPIRES_IN,
    });
  }

  //   private verifyAuthToken(token: string): jwt.JwtPayload {
  //     return jwt.verify(
  //       token,
  //       this.configService.get('jwtSecret'),
  //     ) as jwt.JwtPayload;
  //   }
}
