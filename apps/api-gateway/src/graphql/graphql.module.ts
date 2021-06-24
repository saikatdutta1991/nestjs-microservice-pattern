import { Module } from '@nestjs/common';
import { GraphQLModule as NestJsGraphQLModule } from '@nestjs/graphql';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    AccountModule,
    NestJsGraphQLModule.forRoot({
      debug: true,
      playground: true,
      introspection: true,
      autoSchemaFile: true,
    }),
  ],
})
export class GraphQLModule {}
