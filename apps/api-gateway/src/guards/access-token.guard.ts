import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { VerifyAccessTokenInput } from 'shared/service-contracts/account/commands/verify-access-token/verify-access-token.input';
import { VerifyAccessTokenOutput } from 'shared/service-contracts/account/commands/verify-access-token/verify-access-token.output';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  public static ACCESS_TOKEN_PAYLOAD_KEY = 'accessTokenPayload';
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const accessToken = request.header('Authorization');
    const accessTokenPayload = await this.accountService
      .send<VerifyAccessTokenOutput, VerifyAccessTokenInput>(
        { cmd: AccountCommands.VERIFY_ACCESS_TOKEN },
        { accessToken },
      )
      .toPromise()
      .catch(() => {
        throw new UnauthorizedException(`Authorization token is invalid`);
      });

    Object.assign(request, {
      [AccessTokenGuard.ACCESS_TOKEN_PAYLOAD_KEY]: accessTokenPayload,
    });
    return true;
  }
}
