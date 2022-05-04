import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`) });

interface ENV {
  NODE_ENV: string | undefined;
  PORT: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: string;
}

const getRawConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT
  }
};

const getConfig = (rawConfig: ENV): Config => {
  for(const [key, value] of Object.entries(rawConfig)) {
    if(value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }

  return rawConfig as Config;
};

const rawConfig = getRawConfig();
const config = getConfig(rawConfig);

export default config;