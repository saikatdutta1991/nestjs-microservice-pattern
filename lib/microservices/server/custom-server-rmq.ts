import { RmqOptions, ServerRMQ } from '@nestjs/microservices';

type RmqOptionsNew = RmqOptions & { commonFanoutExchange: string };

export class CustomServerRMQ extends ServerRMQ {
  public async setupChannel(channel: any, callback: () => any) {
    const noAck = this.getOptionsProp(this.options, 'noAck', true);
    await channel.bindQueue(
      this.options.queue,
      (this.options as RmqOptionsNew).commonFanoutExchange || 'amq.fanout',
    );
    await channel.assertQueue(this.queue, this.queueOptions);
    await channel.prefetch(this.prefetchCount, this.isGlobalPrefetchCount);
    channel.consume(
      this.queue,
      (msg: Record<string, any>) => this.handleMessage(msg, channel),
      {
        noAck,
      },
    );
    callback();
  }
}
