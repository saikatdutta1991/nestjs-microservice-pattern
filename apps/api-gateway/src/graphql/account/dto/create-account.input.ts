import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  password: string;
}
