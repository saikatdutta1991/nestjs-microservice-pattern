import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiGatewayController } from './api-gateway.controller';
import serviceConfiguration, {
  ServiceName,
} from 'config/service.configuration';
import configuration from '../config/configuration';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration, configuration],
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [
    {
      provide: ServiceName.ACCOUNT,
      useFactory: (configService: ConfigService) => {
        const accountServiceOptions = configService.get(
          'services.account.transportOptions',
        );
        return ClientProxyFactory.create(accountServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class ApiGatewayModule {}
