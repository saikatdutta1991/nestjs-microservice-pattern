# nestjs-sample-blogging-app

NestJS sample blogging app using

- Microservice Architechture
- Monorepo Directory Structure
- Interservice communication backed by RabbitMQ message broker
- No service discovery required

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
> docker build -f apps/auth/Dockerfile -t auth-service .
```
