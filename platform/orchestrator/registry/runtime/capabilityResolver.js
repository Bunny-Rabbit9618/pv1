import {
  findWorkersByCapability
} from './registryStore.js';

export function resolveWorker(
  capability
) {
  const workers =
    findWorkersByCapability(capability);

  if (!workers.length) {
    return null;
  }

  const onlineWorkers =
    workers.filter(
      worker => worker.status === 'online'
    );

  if (!onlineWorkers.length) {
    return null;
  }

  return onlineWorkers[0];
}
