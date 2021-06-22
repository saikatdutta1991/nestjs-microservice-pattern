import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateAccountDto } from '../../../shared/dto/account/create-account.dto';
import { Account, AccountDocument } from './schemas/account.schema';
import { ConfigService } from '@nestjs/config';
import { AUTH_TOKEN_EXPIRES_IN } from './constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly configService: ConfigService,
  ) {}

  public async createAccount(
    createAccountDto: CreateAccountDto,
  ): Promise<AccountDocument> {
    const { username, password } = createAccountDto;

    const existingAccount = await this.getAccountByUsername(username);
    if (existingAccount) {
      throw new RpcException(`${username} already exists.`);
    }

    Object.assign(createAccountDto, {
      passwordHash: await this.hashPassword(password),
    });

    const account = new this.accountModel(createAccountDto);
    return await account.save();
  }

  public async getAccountByUsername(
    username: string,
  ): Promise<AccountDocument> {
    return await this.accountModel.findOne({ username });
  }

  public async signinAccount(username: string, password: string) {
    const account = await this.getAccountByUsername(username);
    if (!account || !this.isPasswordMatch(password, account.passwordHash)) {
      throw new RpcException('Invalid username or password');
    }

    const refreshToken = account.refreshToken || this.generateRefreshToken();
    await this.accountModel.findOneAndUpdate(
      { _id: account._id },
      { refreshToken },
    );

    const authToken = this.generateAuthToken({
      accountId: account._id,
      username: account.username,
    });

    return {
      account,
      authToken,
      refreshToken,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  public async isPasswordMatch(password, hash): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private generateRefreshToken(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  private generateAuthToken(data: {
    accountId: string;
    username: string;
  }): string {
    return jwt.sign(data, this.configService.get('jwtSecret'), {
      expiresIn: AUTH_TOKEN_EXPIRES_IN,
    });
  }

  private verifyAuthToken(token: string): jwt.JwtPayload {
    return jwt.verify(
      token,
      this.configService.get('jwtSecret'),
    ) as jwt.JwtPayload;
  }
}
