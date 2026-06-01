import dotenv from 'dotenv';
import { publishEvent } from '../streams/eventPublisher.js';

dotenv.config();

console.log('[orchestrator] runtime started');

await publishEvent(
  process.env.WORKFLOW_STREAM,
  {
    type: 'runtime.started',
    ts: new Date().toISOString()
  }
);
