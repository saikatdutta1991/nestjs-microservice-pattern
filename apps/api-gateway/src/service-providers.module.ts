import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serviceConfiguration, {
  ServiceName,
} from 'config/service.configuration';
import { CustomClientRMQ } from '@app/custom-microservice/client/custom-client-rmq';
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
        const options = configService.get('services.account.options');
        return new CustomClientRMQ(options);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ServiceName.ACCOUNT],
})
export class ServiceProvidersModule {}
