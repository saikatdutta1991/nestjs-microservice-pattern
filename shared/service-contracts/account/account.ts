import { AccountRoles } from './account-roles.';

export interface Account {
  _id: string;
  role: AccountRoles;
  username: string;
  name: string;
  passwordHash: string;
  refreshToken: string;
}
