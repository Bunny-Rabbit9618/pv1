import redis from '../streams/redisClient.js';

const STREAM =
  'workflow.deadletter';

const GROUP =
  'deadletter-group';

const CONSUMER =
  'deadletter-consumer';

async function ensureGroup() {

  try {

    await redis.xgroup(
      'CREATE',
      STREAM,
      GROUP,
      '0',
      'MKSTREAM'
    );

  } catch (err) {

    if (
      !err.message.includes(
        'BUSYGROUP'
      )
    ) {
      throw err;
    }
  }
}

async function consume() {

  await ensureGroup();

  while (true) {

    const response =
      await redis.xreadgroup(
        'GROUP',
        GROUP,
        CONSUMER,
        'BLOCK',
        5000,
        'COUNT',
        10,
        'STREAMS',
        STREAM,
        '>'
      );

    if (!response) {
      continue;
    }

    for (
      const stream of response
    ) {

      const [, events] =
        stream;

      for (
        const event of events
      ) {

        const [id, fields] =
          event;

        const payload =
          JSON.parse(
            fields[1]
          );

        console.log(
          '[deadletter worker]',
          payload.reason
        );

        await redis.xack(
          STREAM,
          GROUP,
          id
        );
      }
    }
  }
}

consume().catch(
  console.error
);
