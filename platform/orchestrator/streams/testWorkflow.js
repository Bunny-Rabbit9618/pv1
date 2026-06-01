import { publishEvent }
from './eventPublisher.js';

const workflowId =
  `job-${Date.now()}`;

console.log(
  '[workflow]',
  workflowId
);

const events = [
  'lead.created',
  'client.created',
  'property.registered',
  'job.scheduled',
  'route.generated',
  'crew.assigned',
  'job.approved',
  'crew.dispatched',
  'crew.arrived',
  'job.started',
  'job.completed',
  'invoice.generated',
  'payment.recorded',
  'audit.logged',
  'memory.stored',
  'checkpoint.saved'
];

for (const type of events) {

  await publishEvent(
    'workflow.events',
    {
      workflowId,

      workflowType:
        'job-lifecycle',

      type,

      ts:
        new Date()
          .toISOString()
    }
  );
}
