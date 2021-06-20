import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import serviceConfiguration from 'config/service.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfiguration],
    }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
