import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import serviceConfiguration from 'config/service.configuration';
import configuration from '../config/configuration';
import { AccountController } from './controllers/account.controller';
import { GraphQLModule } from './graphql/graphql.module';
import { ServiceProvidersModule } from './service-providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration, configuration],
    }),
    ServiceProvidersModule,
    GraphQLModule,
  ],
  controllers: [AccountController],
})
export class ApiGatewayModule {}
