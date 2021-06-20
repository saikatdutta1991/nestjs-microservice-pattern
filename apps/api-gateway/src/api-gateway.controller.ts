import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiGatewayController {
  @Get()
  getHello(): string {
    return 'Api gateway';
  }
}
