module.exports = {
  apps: [

    {
      name:
        'orchestrator-service',

      script:
        './services/control-plane/orchestrator-service/index.js',

      env: {
        REDIS_URL:
          'redis://127.0.0.1:6379',

        DATABASE_URL:
          'postgresql://u0_a473@127.0.0.1:5432/bluedoor'
      }
    },

    {
      name:
        'policy-service',

      script:
        './services/control-plane/policy-service/index.js',

      env: {
        REDIS_URL:
          'redis://127.0.0.1:6379'
      }
    },

    {
      name:
        'risk-service',

      script:
        './services/control-plane/risk-service/index.js',

      env: {
        REDIS_URL:
          'redis://127.0.0.1:6379'
      }
    },

    {
      name:
        'approval-service',

      script:
        './services/control-plane/approval-service/index.js',

      env: {
        REDIS_URL:
          'redis://127.0.0.1:6379',

        DATABASE_URL:
          'postgresql://u0_a473@127.0.0.1:5432/bluedoor'
      }
    },

    {
      name:
        'audit-service',

      script:
        './services/control-plane/audit-service/index.js',

      env: {
        REDIS_URL:
          'redis://127.0.0.1:6379',

        DATABASE_URL:
          'postgresql://u0_a473@127.0.0.1:5432/bluedoor'
      }
    },

    {
      name:
        'memory-service',

      script:
        './services/control-plane/memory-service/index.js',

      env: {
        REDIS_URL:
          'redis://127.0.0.1:6379',

        DATABASE_URL:
          'postgresql://u0_a473@127.0.0.1:5432/bluedoor'
      }
    },

    {
      name:
        'replay-service',

      script:
        './services/control-plane/replay-service/index.js',

      env: {
        REDIS_URL:
          'redis://127.0.0.1:6379'
      }
    },

    {
      name:
        'worker-runtime',

      script:
        './services/control-plane/worker-runtime/index.js',

      env: {
        REDIS_URL:
          'redis://127.0.0.1:6379'
      }
    }
  ]
};
