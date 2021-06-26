import { ClientRMQ, ReadPacket, RmqOptions } from '@nestjs/microservices';
import { ConnectableObservable, defer, Observable } from 'rxjs';
import { mergeMap, publish } from 'rxjs/operators';

type RmqOptionsNew = RmqOptions & { commonFanoutExchange: string };

const isNil = (obj: any): obj is null | undefined =>
  isUndefined(obj) || obj === null;

const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';

export class CustomClientRMQ extends ClientRMQ {
  public broadcast<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    if (isNil(pattern) || isNil(data)) {
      throw new Error('Invalid message pattern/data');
    }
    const source = defer(async () => this.connect()).pipe(
      mergeMap(() => this.dispatchBroadcastEvent({ pattern, data })),
      publish(),
    );
    (source as ConnectableObservable<TResult>).connect();
    return source;
  }

  protected dispatchBroadcastEvent(packet: ReadPacket): Promise<any> {
    const serializedPacket = this.serializer.serialize(packet);

    return new Promise<void>((resolve, reject) =>
      this.channel.publish(
        (this.options as RmqOptionsNew).commonFanoutExchange,
        '',
        Buffer.from(JSON.stringify(serializedPacket)),
        {
          persistent: this.persistent,
        },
        (err: unknown) => (err ? reject(err) : resolve()),
      ),
    );
  }
}
