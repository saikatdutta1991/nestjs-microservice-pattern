import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.use(compression());

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port');
  await app.listen(port, () => console.log('Api gateway is listening'));
}
bootstrap();
