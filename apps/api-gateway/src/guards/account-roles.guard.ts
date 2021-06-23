import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { AccountRoles } from 'shared/service-contracts/account/account-roles.';
import { VerifyAccessTokenOutput } from 'shared/service-contracts/account/commands/verify-access-token/verify-access-token.output';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AccountRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessTokenPayload: VerifyAccessTokenOutput =
      request[AccessTokenGuard.ACCESS_TOKEN_PAYLOAD_KEY];
    const roles =
      this.reflector.get<AccountRoles[]>(ROLES_KEY, context.getHandler()) ||
      this.reflector.get<AccountRoles[]>(ROLES_KEY, context.getClass());

    return roles.includes(accessTokenPayload.role);
  }
}
