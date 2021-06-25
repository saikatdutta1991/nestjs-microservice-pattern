import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, RpcException } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from '@nestjs/common';
import { CustomRMQTransportStrategy } from 'lib/custom-rmq-transport.strategy';

async function bootstrap() {
  const temp = await NestFactory.create(AccountModule);
  const configService = temp.get<ConfigService>(ConfigService);
  const transportOptions = configService.get(
    'services.account.transportOptions',
  );
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AccountModule,
    {
      strategy: new CustomRMQTransportStrategy(transportOptions.options),
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
