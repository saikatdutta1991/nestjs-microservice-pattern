import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountController } from './account.controller';
import serviceConfiguration from 'config/service.configuration';
import configuration from '../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './account.service';
import { Account, AccountSchema } from './schemas/account.schema';

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
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
