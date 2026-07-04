---
title: "Lumen"
description: "A lightweight, privacy-first analytics library that tracks meaningful user interactions without cookies or personal data."
tags: ["typescript", "privacy", "analytics", "open-source"]
github: "https://github.com/username/lumen"
featured: false
timeline: "2023"
order: 3
---

## Overview

Lumen is a drop-in analytics library designed for developers who want meaningful insights into how their sites are used — without compromising visitor privacy. It collects no personal data, uses no cookies, and weighs under 2KB gzipped.

## Timeline
Written in 2023 as an open-source alternative to cookie trackers.

## Problem

Modern analytics software is invasive:
1. It drops tracking cookies and matches IP addresses across sites.
2. Scripts are often heavy (e.g. Google Analytics), hurting LCP metrics.
3. Managing cookie consent banners degrades user experience.

## Architecture Diagram

Lumen compiles telemetry payloads locally, hashing headers to generate anonymous session identifiers, before dispatching to ingest sinks:

```text
       ┌───────────────┐
       │   Browser DOM │
       └───────┬───────┘
               │
               ▼ (Interaction Events)
       ┌───────────────┐
       │  Lumen Client │ (Hash UserAgent + IP + Salt)
       └───────┬───────┘
               │
               ▼ (Base64 telemetries, no cookies)
       ┌───────────────┐
       │  Ingest Node  │ (Discards IP, saves aggregate only)
       └───────────────┘
```

## Tech Stack
Written in TypeScript, compiled to a single ESM bundle using Rollup.

## Screenshots
A sample report showing hourly unique session count:
```text
SESSIONS     UNIQUE PAGEVIEWS     BOUNCE RATE
14,203       12,109               42.5%
```

## Lessons Learned
Using the browser's beacon API (`navigator.sendBeacon`) works much more reliably than standard `fetch` during page unload cycles.

## Future Improvements
- Add automated web-vitals tracking.
- Build serverless edge adapters for quick deployments.
