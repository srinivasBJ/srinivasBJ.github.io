---
title: "Designing Data-Intensive Applications"
author: "Martin Kleppmann"
category: "books"
description: "The definitive guide to the principles and practicalities of data systems — from storage engines to distributed consensus."
tags: ["distributed-systems", "databases", "system-design"]
---

## Summary

*Designing Data-Intensive Applications* (DDIA) by Martin Kleppmann is, without exaggeration, one of the best technical books I've ever read. It bridges the gap between academic distributed systems literature and practical engineering in a way that no other resource manages.

The book covers the entire spectrum of data systems: storage engines, replication, partitioning, transactions, batch processing, and stream processing. Each chapter builds on the last, and by the end you have a cohesive mental model for reasoning about data systems at any scale.

## Why It's a 5/5

### Depth Without Drowning

Kleppmann has a gift for explaining complex concepts clearly without dumbing them down. The chapter on transactions, for example, walks through serializability, snapshot isolation, and write skew with real-world examples that make abstract concepts tangible.

### Honest Trade-off Analysis

Unlike many technical books that advocate for a specific technology, DDIA presents trade-offs honestly. Every design decision has consequences, and Kleppmann is meticulous about explaining *when* and *why* you'd choose one approach over another.

### Timeless Principles

Despite being published in 2017, the book remains remarkably relevant because it focuses on principles rather than specific tools. The discussion of LSM trees vs. B-trees, leader-based vs. leaderless replication, and exactly-once semantics are as applicable today as they were at publication.

## Key Chapters

- **Chapter 3: Storage and Retrieval** — The best explanation of how databases actually store and index data that I've encountered.
- **Chapter 7: Transactions** — Demystifies isolation levels and their real-world implications.
- **Chapter 9: Consistency and Consensus** — Makes the CAP theorem and its limitations genuinely understandable.
- **Chapter 11: Stream Processing** — A forward-looking chapter on event-driven architectures that has aged exceptionally well.

## Who Should Read This

Everyone who builds software that stores or processes data — which is nearly everyone. Whether you're a backend engineer, a data engineer, or an architect, this book will sharpen your thinking about the systems you build and depend on.

**Rating: 5/5** — A masterpiece. Read it, then read it again.
