import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379
});

redis.on(
  'connect',
  () => {
    console.log(
      '[redis] connected'
    );
  }
);

redis.on(
  'error',
  error => {
    console.error(
      '[redis] error',
      error
    );
  }
);

export default redis;
