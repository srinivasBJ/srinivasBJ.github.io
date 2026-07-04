---
title: "Lumen"
description: "A lightweight, privacy-first analytics library that tracks meaningful user interactions without cookies or personal data."
tags: ["typescript", "privacy", "analytics", "open-source"]
github: "https://github.com/username/lumen"
featured: false
order: 3
---

## Overview

Lumen is a drop-in analytics library designed for developers who want meaningful insights into how their sites are used — without compromising visitor privacy. It collects no personal data, uses no cookies, and weighs under 2KB gzipped.

## Why Another Analytics Library?

Most analytics tools fall into two camps: enterprise platforms that track everything (and raise GDPR concerns), or minimalist counters that only show page views. Lumen sits in between — it captures user interactions that actually matter for product decisions while remaining fully privacy-compliant.

## Features

- **No cookies, no fingerprinting** — Compliant with GDPR, CCPA, and ePrivacy without consent banners
- **Custom events** — Track meaningful interactions like scroll depth, time on page, and form completions
- **Tiny bundle** — Under 2KB gzipped, loaded asynchronously with zero impact on page performance
- **Self-hostable** — Run the collector on your own infrastructure with a single Docker command
- **Dashboard included** — A clean, real-time dashboard built with vanilla JS and CSS

## Quick Start

```html
<script
  defer
  data-endpoint="https://analytics.example.com"
  src="https://cdn.example.com/lumen.js"
></script>
```

That's it. No configuration required for basic page view tracking. Custom events can be sent programmatically:

```javascript
lumen.track('signup_started', {
  plan: 'pro',
  source: 'landing_page',
});
```

## Architecture

The system consists of three parts:

1. **Client library** — A lightweight script that batches events and sends them via `navigator.sendBeacon` for reliable delivery
2. **Collector API** — A Go service that validates, enriches, and stores events in SQLite or PostgreSQL
3. **Dashboard** — A static site that queries the collector API and renders charts

All components are packaged as Docker images and can be deployed with a single `docker-compose up`.
