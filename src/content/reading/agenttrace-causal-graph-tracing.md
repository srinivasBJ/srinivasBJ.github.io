---
title: "AgentTrace: Causal Graph Tracing for Root Cause Analysis in Deployed Multi-Agent Systems"
author: "Zhaohui Geoffrey Wang"
category: "papers"
description: "An ICLR 2026 Workshop paper outlining a latency-efficient method to reconstruct causal graphs from execution logs without invoking LLMs at debugging time."
url: ""
tags: ["agentic-ai", "observability", "root-cause-analysis", "causal-tracing", "multi-agent-systems"]
---

### Summary & Core Concepts
This paper addresses a critical gap in current agentic AI debugging: the high latency and cost of using LLMs to analyze execution traces during production incidents. Instead of relying on LLMs at debugging time, the authors demonstrate how causal execution graphs can be reconstructed programmatically from structured event logs in sub-second times.

### Practical Impact on OpenMesh AI
I reached out to Geoffrey Wang regarding the architecture of **OpenMesh** (a terminal-first agent infrastructure mapper). His feedback highlighted a major gap in my initial design:

> *"After reading the document, my main observation is that OpenMesh is still at a stage where the primary challenge is trace semantics rather than causal analysis... span_id, parent_span_id, and links are not yet populated or used during reconstruction. Traces are currently represented as ordered event sequences rather than execution trees."*

Based on this insight, the roadmap for OpenMesh was restructured to prioritize:
1. Consistent generation of `span_id` and `parent_span_id`.
2. Modeling explicit parent-child hierarchies across agent workflows, tool invocations, and MCP servers.
3. Constructing a durable, queryable graph representation of execution states rather than simple request-time reconstructions.
