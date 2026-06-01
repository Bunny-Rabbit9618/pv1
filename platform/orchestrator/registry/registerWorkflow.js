import pool from '../db/postgres/client.js';

const definition = {
  transitions: {
    'lead.created': [
      'client.created'
    ],

    'client.created': [
      'property.registered'
    ],

    'property.registered': [
      'job.scheduled'
    ],

    'job.scheduled': [
      'route.generated'
    ],

    'route.generated': [
      'crew.assigned'
    ],

    'crew.assigned': [
      'job.approved'
    ],

    'job.approved': [
      'crew.dispatched'
    ],

    'crew.dispatched': [
      'crew.arrived'
    ],

    'crew.arrived': [
      'job.started'
    ],

    'job.started': [
      'job.completed'
    ],

    'job.completed': [
      'invoice.generated'
    ],

    'invoice.generated': [
      'payment.recorded'
    ],

    'payment.recorded': [
      'audit.logged'
    ],

    'audit.logged': [
      'memory.stored'
    ],

    'memory.stored': [
      'checkpoint.saved'
    ]
  }
};

async function register() {

  await pool.query(
    `
    INSERT INTO workflow_registry (
      workflow_type,
      version,
      definition
    )
    VALUES (
      $1,
      $2,
      $3
    )
    `,
    [
      'job-lifecycle',
      1,
      JSON.stringify(definition)
    ]
  );

  console.log(
    '[workflow registered]'
  );

  process.exit(0);
}

register().catch(console.error);
