import { Type } from 'class-transformer';
import { AccountDto } from './account.dto';

export class SigninAccountDto {
  @Type(() => AccountDto)
  account: AccountDto;
  accessToken: string;
  refreshToken: string;
}
