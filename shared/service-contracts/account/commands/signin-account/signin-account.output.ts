import { Account } from '../../account';

export interface SigninAccountOutput {
  account: Account;
  accessToken: string;
  refreshToken: string;
}
