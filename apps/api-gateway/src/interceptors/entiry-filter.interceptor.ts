import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SerializeOptions,
  SERIALIZE_OPTIONS_KEY,
} from '../decorators/serialize.decorator';

@Injectable()
export class EntityFilterInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.reflector.get<SerializeOptions>(
      SERIALIZE_OPTIONS_KEY,
      context.getHandler(),
    );

    if (!options?.transformClassRef) {
      return next.handle();
    } else {
      return next
        .handle()
        .pipe(map((data) => plainToClass(options.transformClassRef, data)));
    }
  }
}
