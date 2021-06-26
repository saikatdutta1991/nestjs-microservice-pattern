import { CustomClientRMQ } from '@app/custom-microservice';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serviceConfiguration, {
  ServiceName,
} from 'config/service.configuration';

export interface ServiceClientModuleRegisterOptions {
  services: ServiceName[];
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration],
    }),
  ],
})
export class ServiceClientModule {
  public static register(
    options: ServiceClientModuleRegisterOptions,
  ): DynamicModule {
    const exports = options.services;
    const providers = (exports || []).map((serviceName: ServiceName) => ({
      provide: serviceName,
      useFactory: (configService: ConfigService) => {
        const options = configService.get(`services.${serviceName}.options`);
        return new CustomClientRMQ(options);
      },
      inject: [ConfigService],
    }));

    return {
      global: true,
      module: ServiceClientModule,
      providers,
      exports: exports,
    };
  }
}
