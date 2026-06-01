# AI Domain Architecture

Purpose:
Independent operational intelligence layer.

Rules:
- AI remains isolated from business services
- AI never directly owns business data
- AI actions require governance validation
- AI communicates through contracts/events
- AI survives partial system failures
- AI recovery operates independently

Core Domains:
- agents
- specialists
- governance
- memory
- execution
- tools
- recovery

