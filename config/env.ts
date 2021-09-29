export const env = process.env.NODE_ENV || 'development';
export const appEnv = process.env.APP_ENV || 'development';
export const dev = env !== 'production';
export const prod = !dev;
