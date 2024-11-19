import { LevelWithSilent } from 'pino';

export type Config = {
  auth: {
    saltRounds: number;
  };
  headers: {
    requestId: string;
  };
  log: {
    level: LevelWithSilent;
  };
};

const config: Config = {
  auth: {
    saltRounds: process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10,
  },
  headers: {
    requestId: process.env.REQUEST_ID_HEADER || 'x-request-id',
  },
  log: {
    level: (process.env.LOG_LEVEL || 'trace') as LevelWithSilent,
  },
};

export default config;
