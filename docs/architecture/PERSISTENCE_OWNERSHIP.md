# Persistence Ownership

## PostgreSQL
Owns:
- durable relational state
- audit records
- operational records
- transactional integrity

## Redis Streams
Owns:
- live event transport
- stream replay
- event buffering
- transient operational coordination

## Event Store
Owns:
- immutable event lineage
- replay reconstruction
- operational history

## Replay System
Owns:
- workflow reconstruction
- failure recovery
- operational restoration

## Idempotency Layer
Owns:
- duplicate prevention
- replay safety
- execution uniqueness

