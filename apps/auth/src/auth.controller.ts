import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
  @Get()
  getHello(): string {
    return 'Auth service';
  }
}
