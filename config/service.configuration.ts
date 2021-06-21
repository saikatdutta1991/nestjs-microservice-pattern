import { Transport } from '@nestjs/microservices';

export enum ServiceName {
  AUTH = 'auth_service',
}

export default () => ({
  services: {
    auth: {
      name: ServiceName.AUTH,
      transportOptions: {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.SERVICE_RMQ_URL],
          queue: ServiceName.AUTH,
        },
      },
    },
  },
});
