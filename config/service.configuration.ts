import { Transport } from '@nestjs/microservices';

export enum ServiceName {
  ACCOUNT = 'account_service',
}

export default () => ({
  services: {
    account: {
      name: ServiceName.ACCOUNT,
      transportOptions: {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.SERVICE_RMQ_URL],
          queue: ServiceName.ACCOUNT,
        },
      },
    },
  },
});
