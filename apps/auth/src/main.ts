import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get<ConfigService>(ConfigService);
  const transportOptions = configService.get('services.auth.transportOptions');
  app.use(compression());
  app.connectMicroservice(transportOptions);
  app.listen(configService.get('services.auth.port'), () =>
    console.log('Auth microservice is listening'),
  );
}
bootstrap();
