import { AccountType } from './account-type.';

export interface Account {
  type: AccountType;
  username: string;
  name: string;
  passwordHash: string;
  refreshToken: string;
}
