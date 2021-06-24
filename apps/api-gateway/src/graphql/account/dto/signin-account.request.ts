import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SigninAccountRequest {
  @Field()
  username: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  password: string;
}
