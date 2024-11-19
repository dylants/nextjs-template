import config from '@/config/index';
import { headers } from 'next/headers';
import pino, { LoggerOptions } from 'pino';

// https://github.com/pinojs/pino/blob/master/docs/api.md#pinooptions-destination--logger
const options: LoggerOptions = {
  base: undefined,
  // "silent" to disable logging
  level: config.log.level,
  nestedKey: 'payload',
  timestamp: pino.stdTimeFunctions.isoTime,
};

const logger = pino(options);

export function getLogger(functionName?: string) {
  const headersList = headers();
  const requestId = headersList.get(config.headers.requestId);

  return logger.child({ functionName, requestId });
}
