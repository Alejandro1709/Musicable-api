import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 2000;
