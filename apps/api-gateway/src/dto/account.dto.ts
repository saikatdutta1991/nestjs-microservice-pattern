import { Exclude } from 'class-transformer';
import { AccountRoles } from 'shared/service-contracts/account/account-roles.';

export class AccountDto {
  role: AccountRoles;

  username: string;

  name: string;

  @Exclude()
  passwordHash: string;

  @Exclude()
  refreshToken: string;
}
