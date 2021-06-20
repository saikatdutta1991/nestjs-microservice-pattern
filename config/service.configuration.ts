import { Transport } from '@nestjs/microservices';

export enum ServiceName {
  AUTH = 'AUTH_SERVICE',
}

export default () => ({
  services: {
    ['api-gateway']: {
      port:
        parseInt(
          process.env.SERVICE_API_GATEWAY_PORT ||
            process.env.SERVICE_DEFAULT_PORT,
        ) || 3000,
    },
    auth: {
      name: ServiceName.AUTH,
      transportOptions: {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.SERVICE_RMQ_URL],
          queue: 'auth_service_queue',
        },
      },
    },
  },
});
