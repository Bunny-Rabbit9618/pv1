import pool from './client.js';

async function init() {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS workflow_state (
      id SERIAL PRIMARY KEY,

      workflow_id TEXT UNIQUE NOT NULL,

      workflow_type TEXT NOT NULL,

      current_state TEXT NOT NULL,

      last_event TEXT NOT NULL,

      version INTEGER NOT NULL,

      updated_at TIMESTAMP NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS workflow_audit (
      id SERIAL PRIMARY KEY,

      workflow_id TEXT,

      event_type TEXT,

      payload JSONB,

      created_at TIMESTAMP
        DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS workflow_memory (
      id SERIAL PRIMARY KEY,

      workflow_id TEXT,

      workflow_type TEXT,

      event_type TEXT,

      payload JSONB,

      created_at TIMESTAMP
        DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS workflow_checkpoints (
      id SERIAL PRIMARY KEY,

      workflow_id TEXT UNIQUE,

      payload JSONB,

      created_at TIMESTAMP
        DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS workflow_deadletter (
      id SERIAL PRIMARY KEY,

      payload JSONB,

      reason TEXT,

      created_at TIMESTAMP
        DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS workflow_retry (
      id SERIAL PRIMARY KEY,

      payload JSONB,

      reason TEXT,

      created_at TIMESTAMP
        DEFAULT NOW()
    );
  `);

  console.log(
    '[postgres initialized]'
  );

  process.exit(0);
}

init().catch(console.error);
