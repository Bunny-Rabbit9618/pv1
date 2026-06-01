import redis from './redisClient.js';

const DLQ_STREAM =
  'workflow.deadletter';

export async function sendToDeadLetter(
  payload,
  reason
) {
  await redis.xadd(
    DLQ_STREAM,
    '*',
    'event',
    JSON.stringify({
      payload,
      reason,
      ts: new Date().toISOString()
    })
  );

  console.log(
    '[deadletter]',
    payload.type
  );
}
