import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccountRoles } from 'shared/service-contracts/account/account-roles.';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { AccountRolesGuard } from '../guards/account-roles.guard';
import { AccountGuard } from '../guards/account.guard';
import { Roles } from './roles.decorator';

export function Auth(...roles: AccountRoles[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AccessTokenGuard, AccountRolesGuard, AccountGuard),
  );
}
