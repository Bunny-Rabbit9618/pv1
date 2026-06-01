import redis from '../streams/redisClient.js';

const worker =
  process.argv[2];

if (!worker) {

  console.error(
    'missing worker name'
  );

  process.exit(1);
}

const STREAM =
  `worker.${worker}`;

const GROUP =
  `${worker}-group`;

const CONSUMER =
  `${worker}-consumer`;

async function ensureGroup() {

  try {

    await redis.xgroup(
      'CREATE',
      STREAM,
      GROUP,
      '0',
      'MKSTREAM'
    );

    console.log(
      '[worker group created]',
      worker
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
          '[worker]',
          worker,
          payload.type
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
