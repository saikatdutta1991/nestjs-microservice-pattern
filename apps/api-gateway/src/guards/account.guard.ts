import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { VerifyAccessTokenOutput } from 'shared/service-contracts/account/commands/verify-access-token/verify-access-token.output';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AccountGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessTokenPayload: VerifyAccessTokenOutput =
      request[AccessTokenGuard.ACCESS_TOKEN_PAYLOAD_KEY];
    const requestedAccountId =
      request?.params?.accountId || request?.body?.accountId;
    return accessTokenPayload?.accountId === requestedAccountId;
  }
}
