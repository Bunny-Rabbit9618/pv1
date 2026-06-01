import pool from '../../db/postgres/client.js';

export async function createApproval(
  payload,
  risk
) {
  await pool.query(
    `
    INSERT INTO approvals (
      workflow_id,
      action,
      status,
      risk_level,
      payload
    )
    VALUES (
      $1,$2,$3,$4,$5
    )
    `,
    [
      payload.workflowId,
      payload.type,
      'pending',
      risk.level,
      JSON.stringify(payload)
    ]
  );

  console.log(
    '[approval created]',
    payload.type
  );
}
