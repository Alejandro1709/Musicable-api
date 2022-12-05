import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user: 'alejandrolr',
  database: 'musicableapi',
  port: 5432,
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
