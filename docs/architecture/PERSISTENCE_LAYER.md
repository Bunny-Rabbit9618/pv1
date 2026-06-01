# Persistence Layer

Purpose:
Provide durable operational state, replay capability, recovery capability, and audit lineage.

Core Components:
- PostgreSQL
- Redis Streams
- Event Store
- Replay System
- Idempotency Layer
- Snapshot System
- Outbox Pattern

Rules:
- No direct cross-service table ownership
- All critical state transitions emit events
- Replay must reconstruct operational state
- Audit records are immutable
- Event lineage must be traceable
- Recovery checkpoints are mandatory

