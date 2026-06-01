import {
  registerWorker
} from './registryStore.js';

registerWorker({
  name: 'dispatch-worker',
  capabilities: [
    'dispatch',
    'crew-routing'
  ]
});

registerWorker({
  name: 'routing-worker',
  capabilities: [
    'route-generation',
    'optimization'
  ]
});

registerWorker({
  name: 'billing-worker',
  capabilities: [
    'billing',
    'payments'
  ]
});

registerWorker({
  name: 'audit-worker',
  capabilities: [
    'audit',
    'compliance'
  ]
});

registerWorker({
  name: 'memory-worker',
  capabilities: [
    'memory',
    'learning'
  ]
});

registerWorker({
  name: 'recovery-worker',
  capabilities: [
    'recovery',
    'checkpoint'
  ]
});
