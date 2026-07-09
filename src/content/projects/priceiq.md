---
title: "PriceIQ"
description: "Full-stack price intelligence platform for tracking devices, comparing live prices across marketplaces, wishlist management, price alerts, and analytics dashboards."
tags: ["node.js", "react", "postgresql", "redis", "docker"]
github: "https://github.com/srinivasBJ/Priceiq"
demo: "https://priceiq-saxo.vercel.app/"
featured: true
timeline: "2025 - 2026"
order: 3
accent: "#7c3aed"
logo: "/logos/priceiq.svg"
---

## Overview

PriceIQ is a full-stack price intelligence platform that aggregates pricing data across major marketplaces. It provides real-time price tracking, historical comparison, wishlist alerts, and visual analytics — all in one cohesive dashboard.

## Architecture

- **Backend** — Node.js with Express, PostgreSQL for persistence, Redis for caching and job queues
- **Frontend** — React SPA with responsive dashboards, interactive charts, and real-time updates
- **Infrastructure** — Docker Compose for local development, Render (backend) + Vercel (frontend) for production

## Key Features

- **Live Price Tracking** — Monitor device prices across multiple marketplaces in real time
- **Historical Analytics** — Chart price trends over weeks and months to identify best buy windows
- **Wishlist & Alerts** — Set target prices and receive notifications when prices drop
- **Comparison Engine** — Side-by-side price comparison across retailers
