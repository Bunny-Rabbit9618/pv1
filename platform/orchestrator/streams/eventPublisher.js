import redis from './redisClient.js';

export async function publishEvent(stream, payload) {
  const id = await redis.xadd(
    stream,
    '*',
    'event',
    JSON.stringify(payload)
  );

  console.log('[event published]', stream, id);

  return id;
}
