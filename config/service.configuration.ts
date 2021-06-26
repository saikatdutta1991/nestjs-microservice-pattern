export enum ServiceName {
  ACCOUNT = 'accountService',
  COMMON_EVENT_BUS = 'commonEventBus',
}

export default () => ({
  services: {
    commonEventBus: {
      name: ServiceName.COMMON_EVENT_BUS,
      options: {
        urls: [process.env.SERVICE_RMQ_URL],
        commonFanoutExchange: 'amq.fanout',
      },
    },
    accountService: {
      name: ServiceName.ACCOUNT,
      options: {
        urls: [process.env.SERVICE_RMQ_URL],
        queue: ServiceName.ACCOUNT,
        commonFanoutExchange: 'amq.fanout',
      },
    },
  },
});
