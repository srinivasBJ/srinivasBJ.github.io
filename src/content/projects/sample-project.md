---
title: "Project Aurora"
description: "A distributed system for real-time data processing and visualization, built to handle millions of events per second."
tags: ["rust", "typescript", "distributed-systems", "real-time"]
github: "https://github.com/username/aurora"
demo: "https://aurora-demo.example.com"
featured: true
order: 1
---

## Overview

Aurora is a distributed event processing pipeline designed to ingest, transform, and visualize high-throughput data streams in real time. It was born out of frustration with existing tools that either sacrificed latency for throughput or required a PhD in distributed systems just to configure.

The goal was simple: make it possible for a small team to process millions of events per second with sub-second end-to-end latency, without managing a fleet of Kafka clusters.

## Problem

Most real-time data platforms fall into one of two categories:

1. **Enterprise behemoths** — Powerful but require dedicated teams to operate. Think Apache Flink or Spark Streaming with all the infrastructure overhead.
2. **Toy solutions** — Easy to set up but fall apart at scale. Fine for prototyping, unusable in production.

There was a gap for something in the middle: a system that could handle serious throughput while remaining operationally simple.

## Architecture

Aurora uses a three-tier architecture:

- **Ingestion Layer** — A Rust-based service that accepts events over HTTP, gRPC, or WebSocket. Events are validated, deduplicated, and partitioned by key before being pushed to the processing layer.
- **Processing Layer** — A directed acyclic graph (DAG) of transformation nodes. Each node runs as an isolated process, communicating via shared memory or TCP depending on deployment topology. Supports windowed aggregations, joins, and custom UDFs.
- **Visualization Layer** — A TypeScript/React dashboard that subscribes to processed streams via WebSocket. Supports configurable widgets, real-time charts, and alerting rules.

```
[Sources] → [Ingestion (Rust)] → [Processing DAG] → [WebSocket] → [Dashboard (TS)]
```

## Tech Stack

| Component       | Technology          | Rationale                                    |
|-----------------|---------------------|----------------------------------------------|
| Ingestion       | Rust + Tokio        | Zero-cost abstractions, async I/O            |
| Processing      | Rust + custom DAG   | Memory safety, predictable latency           |
| Dashboard       | TypeScript + React  | Rich ecosystem, real-time rendering           |
| Storage         | ClickHouse          | Column-oriented, fast analytical queries     |
| Coordination    | etcd                | Lightweight consensus, leader election       |

## Lessons Learned

**Rust was the right choice for the data plane, but it slowed down iteration on the control plane.** For the ingestion and processing layers where performance is critical, Rust delivered. But for configuration management and orchestration logic, a higher-level language would have been more productive.

**Shared-nothing architectures are simpler than they seem.** By avoiding shared state between processing nodes, we eliminated an entire category of bugs related to concurrency and synchronization. Each node owns its partition, and coordination only happens during rebalancing.

**Invest in observability early.** The first version had minimal logging and no distributed tracing. Debugging production issues was painful. Adding OpenTelemetry tracing throughout the pipeline was one of the highest-ROI investments we made.
