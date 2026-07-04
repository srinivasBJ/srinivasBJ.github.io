---
title: "MarketPulse"
description: "AI-powered financial intelligence platform that aggregates market news, runs local summarization and sentiment analysis — no ads, no pop-ups, just the headlines you need."
tags: ["react", "fastapi", "postgresql", "docker", "ai"]
github: "https://github.com/srinivasBJ/Market-Pulse"
featured: false
timeline: "2024"
order: 3
---

## Overview

MarketPulse is an open-source market intelligence platform that collects finance, crypto, macro, and market stories from multiple RSS sources, stores metadata in PostgreSQL, and builds clean dashboard feeds — no ads, no pop-ups, only the headlines you need when you're busy.

## Architecture

- **Backend** — FastAPI with RSS/news aggregation pipelines and local summarization workflows
- **Frontend** — React dashboard with categorized feeds (Home, Today, Yesterday, Weekly)
- **Storage** — PostgreSQL for article metadata and sentiment scores
- **Infrastructure** — Full Docker Compose setup for one-command deployment

## Key Features

- **Multi-Source Aggregation** — Pulls from finance, crypto, and macro news feeds
- **Local Summarization** — AI-powered article summaries without cloud dependencies
- **Sentiment Analysis** — Tracks market sentiment trends across categories
- **Clean Dashboard** — Distraction-free reading experience organized by time windows
