import { Type } from 'class-transformer';
import { AccountResponse } from './account.response';

export class SigninAccountResponse {
  @Type(() => AccountResponse)
  account: AccountResponse;
  accessToken: string;
  refreshToken: string;
}
