export enum ServiceName {
  ACCOUNT = 'account_service',
}

export default () => ({
  services: {
    account: {
      name: ServiceName.ACCOUNT,
      options: {
        urls: [process.env.SERVICE_RMQ_URL],
        queue: ServiceName.ACCOUNT,
        commonFanoutExchange: 'amq.fanout',
      },
    },
  },
});
