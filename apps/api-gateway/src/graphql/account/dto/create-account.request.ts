import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccountRequest {
  @Field()
  username: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  password: string;
}
