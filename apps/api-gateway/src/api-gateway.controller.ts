import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';

@Controller()
export class ApiGatewayController {
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}

  @Get(':name')
  public async getHello(@Param('name') name = 'Default'): Promise<string> {
    return await this.accountService
      .send({ cmd: 'getHello' }, name)
      .toPromise();
  }
}
