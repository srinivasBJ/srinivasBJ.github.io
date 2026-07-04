---
title: "Meridian CLI"
description: "A fast, ergonomic command-line tool for managing multi-service development environments with reproducible configurations."
tags: ["go", "cli", "devtools", "developer-experience"]
github: "https://github.com/username/meridian"
featured: false
timeline: "Q2 2024"
order: 2
---

## Overview

Meridian is a CLI tool that simplifies the process of spinning up, configuring, and managing multi-service development environments. Think of it as a smarter `docker-compose` that understands your project's dependency graph and can selectively start only what you need.

## Timeline
Developed in Q2 2024 to simplify local staging pipelines.

## Problem

In multi-service systems, local development is painful:
1. Running everything consumes massive system memory.
2. Services depend on other services in complex ways.
3. Keeping configurations in sync across a team is difficult.

## Architecture Diagram

Meridian reads a workspace configuration, parses the dependency DAG, and launches service groups inside isolated process contexts:

```text
               ┌───────────────────────┐
               │  workspace.yaml Spec  │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │    Dependency Solver  │
               └───────────┬───────────┘
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
       ┌──────────────────┐┌──────────────────┐
       │   Database Dep   ││   Cache Engine   │
       └─────────┬────────┘└─────────┬────────┘
                 │                   │
                 └─────────┬─────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │   Target API Service  │
               └───────────────────────┘
```

## Tech Stack
Written in Go using Cobra for CLI shell commands and Viper for environment parser logic.

## Screenshots
Metrics output of running environments:
```text
$ meridian status
SERVICE      STATUS    PORT    CPU%    MEM%
postgres     running   5432    0.2%    1.2%
redis        running   6379    0.1%    0.5%
gateway      running   8080    1.5%    2.1%
```

## Lessons Learned
Configuring named-pipe handles across Unix and Windows sockets is highly state-dependent. Writing custom concurrency runners in Go simplifies cross-compilation considerably.

## Future Improvements
- Add hot-reloading hooks to watch file trees.
- Integrate with Kubernetes local clusters.
