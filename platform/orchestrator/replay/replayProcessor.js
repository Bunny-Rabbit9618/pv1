import redis from '../streams/redisClient.js';

import {
  saveWorkflowState
} from '../engine/stateManager.js';

const STREAM = 'workflow.events';

export async function replayWorkflow(
  workflowId
) {
  console.log(
    '[replay started]',
    workflowId
  );

  const events = await redis.xrange(
    STREAM,
    '-',
    '+'
  );

  let state = null;

  for (const event of events) {
    const [, fields] = event;

    const payload =
      JSON.parse(fields[1]);

    if (
      payload.workflowId !== workflowId
    ) {
      continue;
    }

    state = {
      workflowId,
      workflowType:
        payload.workflowType,
      currentState:
        payload.type,
      lastEvent:
        payload.type,
      version:
        state
          ? state.version + 1
          : 1,
      updatedAt:
        new Date().toISOString()
    };

    console.log(
      '[replay event]',
      payload.type
    );
  }

  if (!state) {
    console.log(
      '[replay skipped] no events'
    );

    return null;
  }

  await saveWorkflowState(state);

  console.log(
    '[replay completed]',
    workflowId
  );

  return state;
}
