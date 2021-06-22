import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serviceConfiguration, {
  ServiceName,
} from 'config/service.configuration';
import configuration from '../config/configuration';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AccountController } from './account.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration, configuration],
    }),
  ],
  controllers: [AccountController],
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
