import {
  publishEvent
} from './eventPublisher.js';

const workflowId =
  `risk-${Date.now()}`;

await publishEvent(
  'workflow.events',
  {
    workflowId,

    workflowType:
      'job-lifecycle',

    type:
      'payment.refund',

    priority:
      'high',

    manual: true,

    ts:
      new Date()
        .toISOString()
  }
);
