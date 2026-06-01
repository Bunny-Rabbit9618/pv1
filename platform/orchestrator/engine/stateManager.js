import redis from '../streams/redisClient.js';

const PREFIX = 'workflow-state';

export async function saveWorkflowState(state) {
  const key = `${PREFIX}:${state.workflowId}`;

  await redis.set(
    key,
    JSON.stringify(state)
  );

  console.log('[state saved]', key);

  return state;
}

export async function getWorkflowState(workflowId) {
  const key = `${PREFIX}:${workflowId}`;

  const state = await redis.get(key);

  if (!state) return null;

  return JSON.parse(state);
}
