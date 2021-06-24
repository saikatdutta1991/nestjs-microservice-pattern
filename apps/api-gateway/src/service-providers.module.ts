import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serviceConfiguration, {
  ServiceName,
} from 'config/service.configuration';
import { ClientProxyFactory } from '@nestjs/microservices';
import configuration from '../config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration, configuration],
    }),
  ],
  providers: [
    {
      provide: ServiceName.ACCOUNT,
      useFactory: (configService: ConfigService) => {
        const accountServiceOptions = configService.get(
          'services.account.transportOptions',
        );
        console.log({ accountServiceOptions });
        return ClientProxyFactory.create(accountServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ServiceName.ACCOUNT],
})
export class ServiceProvidersModule {}
