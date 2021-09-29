import { dev, prod, env, appEnv } from './env';

export const globals = {
  'process.env.NODE_ENV': JSON.stringify(env),
  'process.env.APP_ENV': JSON.stringify(appEnv),
  'process.env.PORT': process.env.PORT || 4000,
  __DEV__: dev,
  __TEST__: appEnv === 'test',
  __ACC__: appEnv === 'acceptation',
  __PROD__: prod,
}
