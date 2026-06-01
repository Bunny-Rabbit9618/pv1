CREATE TABLE IF NOT EXISTS workflow_registry (
  id SERIAL PRIMARY KEY,

  workflow_type TEXT NOT NULL,

  version INTEGER NOT NULL,

  definition JSONB NOT NULL,

  active BOOLEAN DEFAULT true,

  created_at TIMESTAMP
    DEFAULT NOW()
);
