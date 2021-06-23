import { AccountType } from '../../account-type.';

export class SigninAccountOutput {
  account: {
    type: AccountType;
    username: string;
    name: string;
    passwordHash: string;
    refreshToken: string;
  };
  authToken: string;
  refreshToken: string;
}