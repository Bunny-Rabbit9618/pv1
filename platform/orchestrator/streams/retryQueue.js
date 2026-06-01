import redis from './redisClient.js';

const RETRY_STREAM =
  'workflow.retry';

export async function retryEvent(
  payload,
  reason
) {
  await redis.xadd(
    RETRY_STREAM,
    '*',
    'event',
    JSON.stringify({
      payload,
      reason,
      ts: new Date().toISOString()
    })
  );

  console.log(
    '[retry queued]',
    payload.type
  );
}
