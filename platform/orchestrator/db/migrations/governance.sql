CREATE TABLE IF NOT EXISTS approvals (
  id SERIAL PRIMARY KEY,

  workflow_id TEXT,

  action TEXT,

  status TEXT,

  risk_level TEXT,

  payload JSONB,

  created_at TIMESTAMP
    DEFAULT NOW()
);
