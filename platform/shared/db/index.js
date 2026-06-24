import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: 'postgresql://pv1:pv1@127.0.0.1:5432/pv1'
});
