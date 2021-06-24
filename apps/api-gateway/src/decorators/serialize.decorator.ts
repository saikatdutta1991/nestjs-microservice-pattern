import { SetMetadata } from '@nestjs/common';

type Class = { new (...args: any[]): any };

export type SerializeOptions = {
  transformClassRef: Class;
};

export const SERIALIZE_OPTIONS_KEY = 'serializeOptions';

export const SerializeOptions = (options: SerializeOptions) => {
  return SetMetadata(SERIALIZE_OPTIONS_KEY, options);
};
