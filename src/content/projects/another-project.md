---
title: "Meridian CLI"
description: "A fast, ergonomic command-line tool for managing multi-service development environments with reproducible configurations."
tags: ["go", "cli", "devtools", "developer-experience"]
github: "https://github.com/username/meridian"
featured: false
order: 2
---

## Overview

Meridian is a CLI tool that simplifies the process of spinning up, configuring, and managing multi-service development environments. Think of it as a smarter `docker-compose` that understands your project's dependency graph and can selectively start only what you need.

## Motivation

Working on microservice architectures locally is painful. You either run everything (slow, resource-heavy) or manually track which services depend on which (error-prone, tedious). Meridian solves this by modeling your service graph as a declarative configuration and intelligently resolving what needs to run.

## Key Features

- **Dependency-aware orchestration** — Define service dependencies, and Meridian starts only what's needed for the service you're working on.
- **Hot-reload integration** — File watchers trigger rebuilds only for affected services in the dependency chain.
- **Snapshot & restore** — Capture the state of your entire dev environment and restore it later. Great for switching between feature branches.
- **Plugin system** — Extend Meridian with custom lifecycle hooks written in any language.

## Technical Details

Meridian is written in Go for fast startup times and easy distribution as a single binary. The service graph is defined in a `meridian.yaml` file at the project root:

```yaml
services:
  api:
    build: ./services/api
    depends_on: [database, cache]
    ports: [8080]

  database:
    image: postgres:16
    volumes: [./data/postgres:/var/lib/postgresql/data]

  cache:
    image: redis:7-alpine
```

Running `meridian up api` automatically starts `database` and `cache` first, waits for health checks to pass, then starts `api`.

## Status

Meridian is actively used internally and has been open-sourced. It's stable for development use but not yet recommended for CI/CD pipelines. Contributions welcome.
