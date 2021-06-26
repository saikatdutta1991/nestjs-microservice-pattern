import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, RpcException } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from '@nestjs/common';
import { CustomServerRMQ } from '@app/custom-microservice/server/custom-server-rmq';
import { ServiceName } from 'config/service.configuration';

async function bootstrap() {
  const temp = await NestFactory.create(AccountModule);
  const configService = temp.get<ConfigService>(ConfigService);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AccountModule,
    {
      strategy: new CustomServerRMQ(
        configService.get(`services.${ServiceName.ACCOUNT}.options`),
      ),
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new RpcException(validationErrors);
      },
    }),
  );
  app.listen(() => console.log('Account microservice is listening'));
}
bootstrap();
