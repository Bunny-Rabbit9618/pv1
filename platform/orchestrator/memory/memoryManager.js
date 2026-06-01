import redis from '../streams/redisClient.js';

const MEMORY_STREAM =
  'workflow.memory';

export async function storeMemory(
  payload
) {
  await redis.xadd(
    MEMORY_STREAM,
    '*',
    'event',
    JSON.stringify({
      workflowId:
        payload.workflowId,

      workflowType:
        payload.workflowType,

      eventType:
        payload.type,

      storedAt:
        new Date()
          .toISOString()
    })
  );

  console.log(
    '[memory stored]',
    payload.type
  );
}
