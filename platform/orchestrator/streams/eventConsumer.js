import '../registry/runtime/registerWorkers.js';

import dotenv from 'dotenv';

import redis from '../db/redis/redisClient.js';

import {
  saveWorkflowState
} from '../state/workflowState.js';

import {
  dispatchEvent
} from '../engine/dispatcher.js';

import {
  saveAuditEvent
} from '../audit/auditLogger.js';

import {
  saveMemory
} from '../memory/memoryStore.js';

import {
  saveCheckpoint
} from '../replay/checkpointStore.js';

dotenv.config();

const STREAM =
  process.env.WORKFLOW_STREAM ||
  'workflow.events';

const GROUP =
  process.env.WORKFLOW_GROUP ||
  'workflow-group';

const CONSUMER =
  process.env.WORKFLOW_CONSUMER ||
  'consumer-1';

async function ensureGroup() {
  try {
    await redis.xgroup(
      'CREATE',
      STREAM,
      GROUP,
      '$',
      'MKSTREAM'
    );

    console.log(
      '[group created]'
    );
  } catch (error) {
    if (
      !error.message.includes(
        'BUSYGROUP'
      )
    ) {
      console.error(error);
    }
  }
}

async function processEvent(
  payload
) {
  const workflowId =
    payload.workflowId ||
    `job-${Date.now()}`;

  await saveWorkflowState({
    workflowId,
    workflowType:
      'job-lifecycle',
    currentState:
      payload.type,
    lastEvent:
      payload.type,
    version: 1,
    updatedAt:
      new Date().toISOString()
  });

  await saveAuditEvent({
    workflowId,
    eventType:
      payload.type,
    payload
  });

  await saveMemory({
    workflowId,
    eventType:
      payload.type,
    payload
  });

  if (
    payload.type ===
    'checkpoint.saved'
  ) {
    await saveCheckpoint({
      workflowId,
      state:
        payload.type,
      payload
    });
  }

  await dispatchEvent(payload);

  console.log(
    '[workflow updated]',
    workflowId,
    payload.type
  );
}

async function consume() {
  await ensureGroup();

  while (true) {
    try {
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

      for (const stream of response) {
        const messages =
          stream[1];

        for (const message of messages) {
          const id =
            message[0];

          const values =
            message[1];

          const payload =
            JSON.parse(
              values[1]
            );

          console.log(
            '[event consumed]',
            payload.type
          );

          await processEvent(
            payload
          );

          await redis.xack(
            STREAM,
            GROUP,
            id
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

consume().catch(console.error);
