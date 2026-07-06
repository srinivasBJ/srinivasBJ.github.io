---
title: "AgentGraph: Trace-to-Graph Platform for Interactive Analysis and Robustness Testing in Agentic AI Systems"
author: "Zhaohui Geoffrey Wang"
category: "papers"
description: "A AAAI 2026 paper introducing a platform to convert agent execution logs into interactive knowledge graphs for root cause analysis."
url: ""
tags: ["agentic-ai", "knowledge-graphs", "robustness-testing", "observability"]
---

### Summary & Core Concepts
AgentGraph demonstrates a methodology for converting sequential execution logs of multi-agent interactions into structured dynamic graphs. These graphs make it possible to trace errors, loops, and hallucinations back to their exact origin (root-cause analysis) and run programmatic robustness tests against agent behaviors.

### Inspiration for OpenMesh
This paper serves as one of the theoretical foundations for **OpenMesh**. The vision is to build an "Agent OS" observability control plane that maps out relationships, dependencies, and traces across the entire agent lifecycle. 

Instead of treating agent actions as simple linear chats, AgentGraph validates the approach of representing execution as a tree of related processes:

```text
Agent A
  ├── Tool X
  ├── MCP Y
  └── Workflow Z
```
This relational mapping is essential when agents start calling external tools and communicating via model context protocols (MCP).
