const workers = new Map();

export function registerWorker(worker) {
  workers.set(worker.name, {
    ...worker,
    registeredAt: new Date().toISOString(),
    status: 'online'
  });

  console.log(
    '[worker registered]',
    worker.name
  );
}

export function getWorker(name) {
  return workers.get(name);
}

export function getWorkers() {
  return Array.from(workers.values());
}

export function findWorkersByCapability(capability) {
  return Array
    .from(workers.values())
    .filter(worker =>
      worker.capabilities.includes(capability)
    );
}

export function updateWorkerStatus(
  name,
  status
) {
  const worker = workers.get(name);

  if (!worker) {
    return;
  }

  worker.status = status;

  workers.set(name, worker);

  console.log(
    '[worker status]',
    name,
    status
  );
}
