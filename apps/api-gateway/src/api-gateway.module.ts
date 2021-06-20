import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiGatewayController } from './api-gateway.controller';
import serviceConfiguration, {
  ServiceName,
} from 'config/service.configuration';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration],
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [
    {
      provide: ServiceName.AUTH,
      useFactory: (configService: ConfigService) => {
        const authSvcOptions = configService.get(
          'services.auth.transportOptions',
        );
        return ClientProxyFactory.create(authSvcOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class ApiGatewayModule {}
