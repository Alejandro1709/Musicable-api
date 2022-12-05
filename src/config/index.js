import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PGHost = process.env.PG_HOST || 'localhost';
export const PGPort = process.env.PG_PORT || 5432;
export const PGUser = process.env.PG_USER;
export const PGPassword = process.env.PG_PASSWORD;
export const PGDatabase = process.env.PG_DATABASE;
export const PORT = process.env.PORT || 2000;
