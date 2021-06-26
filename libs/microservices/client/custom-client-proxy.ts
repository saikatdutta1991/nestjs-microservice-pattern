import { ReadPacket } from '@nestjs/microservices';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { Observable } from 'rxjs';

export abstract class CustomClientProxy extends ClientProxy {
  abstract broadcast<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult>;

  protected abstract dispatchBroadcastEvent<T = any>(
    packet: ReadPacket,
  ): Promise<T>;
}
