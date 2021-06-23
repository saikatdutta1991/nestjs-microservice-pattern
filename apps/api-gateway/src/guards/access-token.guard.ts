import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceName } from 'config/service.configuration';
import { AccountCommands } from 'shared/service-contracts/account/commands/account.commands';
import { VerifyAccessTokenInput } from 'shared/service-contracts/account/commands/verify-access-token/verify-access-token.input';
import { VerifyAccessTokenOutput } from 'shared/service-contracts/account/commands/verify-access-token/verify-access-token.output';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(ServiceName.ACCOUNT) private readonly accountService: ClientProxy,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
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

    Object.assign(request, { accessTokenPayload });
    return true;
  }
}
