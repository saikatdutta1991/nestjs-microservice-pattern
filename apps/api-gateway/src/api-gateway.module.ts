import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayController } from './api-gateway.controller';
import serviceConfiguration from 'config/service.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration],
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [],
})
export class ApiGatewayModule {}
