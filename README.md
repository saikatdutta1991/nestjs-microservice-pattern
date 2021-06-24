# nestjs-microservice-pattern

NestJS sample blogging app using & features

- Microservice Architechture
- Monorepo Directory Structure
- Interservice communication backed by RabbitMQ message broker
- No service discovery required
- Graphql
- Auth token guard
- Account role guard

Since, this is a monorepo paradigm, the microservices are expected to be written in NodeJS/NestJS

## Creating new microservice

```sh
# Inside root directory of the repository
> nest generate app [microservice-name]
```

## Starting development

```sh
> docker-compose -f docker-compose.dev.yml up
```

## Build production docker image

```sh
> docker build -f apps/account/Dockerfile -t account-service .
```

## Sample Graphql queries/mutations

```javascript
mutation createAccount {
  createAccount(
    createAccountRequest: {
      username: "saikatdutta199112"
      password: "1234"
      name: "Saikat Dutta"
    }
  ) {
    _id
    username
    name
    role
    __typename
  }
}

mutation signinAccount {
  signinAccount(
    signinAccountRequest: { username: "saikatdutta199112", password: "1234" }
  ) {
    account {
      _id
      username
      name
      role
      __typename
    }
    accessToken
    refreshToken
  }
}

query getAccessToken {
  getAccessToken(
    refreshToken: "ad3ebe282aab02676d88899ce5bf4f79e150aa868eb02c3e3b318bd15f754abc1934a0443026edbf"
  )
}

query getAccount {
  getAccount(accountId: "60d492d41bf291002e8f66bb") {
    _id
    username
    name
    role
    __typename
  }
}

```
