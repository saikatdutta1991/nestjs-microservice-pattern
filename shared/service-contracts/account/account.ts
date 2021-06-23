import { AccountRoles } from './account-roles.';

export interface Account {
  role: AccountRoles;
  username: string;
  name: string;
  passwordHash: string;
  refreshToken: string;
}
