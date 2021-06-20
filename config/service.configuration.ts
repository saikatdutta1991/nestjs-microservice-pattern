import { Transport } from '@nestjs/microservices';

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
      name: 'AUTH_SERVICE',
      transportOptions: {
        transport: Transport.NATS,
        options: {
          url: process.env.SERVICE_NATS_URL,
        },
      },
      port: 0,
    },
  },
});
