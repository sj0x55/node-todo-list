import { CorsOptions } from 'cors';

export type DBConfig = {
  url: string;
  options: {
    user: string | undefined;
    pass: string | undefined;
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  };
};

export function getDBConfig(): DBConfig {
  return {
    url: 'mongodb://127.0.0.1:27017/todos?authSource=admin',
    options: {
      user: process.env.MONGO_ROOT_USERNAME,
      pass: process.env.MONGO_ROOT_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
}

export function getCorsConfig(port: number, ipAddress?: string): CorsOptions {
  return {
    origin: [ipAddress, 'localhost', '127.0.0.1'].filter(String).map((host) => `http://${host}:${port}`),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  };
}
