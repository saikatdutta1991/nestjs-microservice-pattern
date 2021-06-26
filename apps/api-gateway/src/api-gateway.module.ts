import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceClientModule } from '@app/service-client';
import serviceConfiguration, {
  ServiceName,
} from 'config/service.configuration';
import configuration from '../config/configuration';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration, configuration],
    }),
    ServiceClientModule.register({
      services: [ServiceName.ACCOUNT],
    }),
    GraphQLModule,
  ],
})
export class ApiGatewayModule {}
