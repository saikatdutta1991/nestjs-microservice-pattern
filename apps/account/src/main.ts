import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const temp = await NestFactory.create(AccountModule);
  const configService = temp.get<ConfigService>(ConfigService);
  const transportOptions = configService.get(
    'services.account.transportOptions',
  );
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AccountModule,
    transportOptions,
  );
  app.listen(() => console.log('Account microservice is listening'));
}
bootstrap();
