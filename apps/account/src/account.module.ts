import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serviceConfiguration from 'config/service.configuration';
import configuration from '../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/account.schema';
import { AccountHelper } from './helpers/account.helper';
import { CreateAccountCommand } from './commands/create-account.command';
import { SigninAccountCommand } from './commands/signin-account.command';
import { GetAccessTokenCommand } from './commands/get-access-token.command';
import { GetAccountCommand } from './commands/get-account.command';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration, configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongodbUri'),
      }),
    }),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  providers: [AccountHelper],
  controllers: [
    CreateAccountCommand,
    SigninAccountCommand,
    GetAccessTokenCommand,
    GetAccountCommand,
  ],
})
export class AccountModule {}
