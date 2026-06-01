import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL
});

pool.on(
  'connect',
  () => {
    console.log(
      '[postgres] connected'
    );
  }
);

pool.on(
  'error',
  (err) => {
    console.error(
      '[postgres error]',
      err.message
    );
  }
);

export default pool;
