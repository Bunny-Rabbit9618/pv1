import pool from '../db/postgres/client.js';

export async function loadWorkflowDefinition(
  workflowType
) {
  const result = await pool.query(
    `
    SELECT *
    FROM workflow_registry
    WHERE workflow_type = $1
    AND active = true
    LIMIT 1
    `,
    [workflowType]
  );

  if (
    result.rows.length === 0
  ) {
    throw new Error(
      `workflow not found: ${workflowType}`
    );
  }

  return result.rows[0];
}
