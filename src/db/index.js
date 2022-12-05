import pkg from 'pg';
import {
  PGDatabase,
  PGHost,
  PGPassword,
  PGPort,
  PGUser,
} from '../config/index.js';

const { Pool } = pkg;

const pool = new Pool({
  host: PGHost,
  user: PGUser,
  database: PGDatabase,
  port: PGPort,
  password: PGPassword,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.log(err);
});

pool.off('connect', () => {
  console.log('Disconnected from the database');
});

export default {
  query: (text, params) => pool.query(text, params),
};
