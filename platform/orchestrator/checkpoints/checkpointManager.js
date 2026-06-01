import redis from '../streams/redisClient.js';

const PREFIX = 'workflow-checkpoint';

export async function saveCheckpoint(
  workflow
) {
  const key =
    `${PREFIX}:${workflow.workflowId}`;

  await redis.set(
    key,
    JSON.stringify(workflow)
  );

  console.log(
    '[checkpoint saved]',
    key
  );

  return workflow;
}

export async function getCheckpoint(
  workflowId
) {
  const key =
    `${PREFIX}:${workflowId}`;

  const checkpoint =
    await redis.get(key);

  if (!checkpoint) {
    return null;
  }

  return JSON.parse(checkpoint);
}
