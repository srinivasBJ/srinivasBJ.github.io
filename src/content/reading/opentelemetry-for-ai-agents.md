---
title: "OpenTelemetry for AI Agents: Standardizing Span Semantics for Large Language Model Workflows"
author: "OpenTelemetry Community / Arize AI"
category: "articles"
description: "Discusses the standardization of trace schemas (attributes, events, span kinds) specifically optimized for tracking LLM tool calls and multi-agent routing."
url: "https://opentelemetry.io/"
tags: ["opentelemetry", "standards", "tracing", "agent-os"]
---

### Summary & Relevance
As agent ecosystems shift towards multi-agent runtimes, there is an urgent need to standardize how events, spans, and metrics are emitted. This article explores how standard OpenTelemetry specs can be extended for generative AI workflows.

It covers:
- Defining standardized attributes for prompt/response tokens.
- Tracking agent tool calls as classic child spans.
- Designing cross-agent trace propagation headers, which aligns with Geoffrey Wang's advice on structuring OpenMesh's event model for semantic tracing.
