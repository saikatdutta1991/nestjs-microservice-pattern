import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { VerifyAccessTokenOutput } from 'shared/service-contracts/account/commands/verify-access-token/verify-access-token.output';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AccountGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const accessTokenPayload: VerifyAccessTokenOutput =
      request[AccessTokenGuard.ACCESS_TOKEN_PAYLOAD_KEY];
    const args = gqlContext.getArgs();

    return accessTokenPayload?.accountId === args.accountId;
  }
}
