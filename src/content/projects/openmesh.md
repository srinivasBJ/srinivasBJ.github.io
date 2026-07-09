---
title: "OpenMesh"
description: "Open-source observability and control plane for AI agent ecosystems. Terminal-first monitoring for agents, tools, models, runtimes, MCP servers, workflows, traces, and OpenTelemetry export."
tags: ["python", "fastapi", "react", "postgresql", "opentelemetry"]
github: "https://github.com/srinivasBJ/OpenMesh"
featured: true
timeline: "2026"
order: 1
accent: "#2563eb"
---

## Overview

OpenMesh is a terminal-first observability layer for AI agent ecosystems. It observes agents, tools, models, runtimes, MCP servers, workflows, traces, relationships, failures, reputation, genome profiles, snapshots, replay, and OpenTelemetry export from one local event store.

The fastest first run uses SQLite. No API keys, Docker, Postgres, cloud LLMs, or external services are required for the local graph demo.

## Architecture

The platform is built around a local event store that captures the full lifecycle of AI agent interactions:

- **CLI & TUI** — Primary interface for power users. Inspect agents, replay ecosystems, explore graphs.
- **FastAPI Backend** — REST API serving the event store, supporting both SQLite and PostgreSQL.
- **React Dashboard** — Browser-based visualization layer for ecosystem graphs and traces.
- **OpenTelemetry Export** — Standards-compliant telemetry for integration with existing observability stacks.

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|----------|
| Backend | Python 3.11–3.13, FastAPI 0.135 | Async-first, type-safe API layer |
| Frontend | React 19 | Modern component architecture |
| Storage | SQLite / PostgreSQL | Zero-config local dev, scalable production |
| Telemetry | OpenTelemetry | Industry-standard observability |

## Quick Start

```bash
git clone https://github.com/srinivasBJ/OpenMesh.git
cd OpenMesh
python3.11 -m venv .venv && source .venv/bin/activate
pip install -e .

openmesh doctor
openmesh simulate --agents 12 --events 180 --nodes 4
openmesh graph --details
openmesh tui --once
```

## Key Features

- **Agent Simulation** — Generate realistic multi-agent ecosystems for testing and demos
- **Graph Exploration** — Visualize agent relationships, tool dependencies, and data flows
- **Ecosystem Replay** — Step through historical ecosystem states for debugging
- **Genome Profiles** — Track agent capability evolution over time
