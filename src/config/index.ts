export type Config = {
  auth: {
    saltRounds: number;
  };
};

const config: Config = {
  auth: {
    saltRounds: 10,
  },
};

export default config;
