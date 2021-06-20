import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const temp = await NestFactory.create(AuthModule);
  const configService = temp.get<ConfigService>(ConfigService);
  const transportOptions = configService.get('services.auth.transportOptions');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    transportOptions,
  );
  app.listen(() => console.log('Auth microservice is listening'));
}
bootstrap();
