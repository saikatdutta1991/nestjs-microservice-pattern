export class SigninAccountOutput {
  account: {
    username: string;
    name?: string;
  };
  authToken: string;
  refreshToken: string;
}
