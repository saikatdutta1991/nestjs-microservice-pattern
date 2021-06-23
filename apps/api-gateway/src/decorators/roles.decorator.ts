import { SetMetadata } from '@nestjs/common';
import { AccountRoles } from 'shared/service-contracts/account/account-roles.';

export const ROLES_KEY = 'accountRoles';

export const Roles = (...roles: AccountRoles[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
