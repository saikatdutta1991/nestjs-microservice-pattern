import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AccountController {
  @MessagePattern({ cmd: 'getHello' })
  getHello(name: string): string {
    return `Hello ${name}!`;
  }
}
