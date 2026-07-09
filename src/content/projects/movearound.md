---
title: "MoveAround"
description: "Mobile-first AI-assisted city exploration platform that generates personalized itineraries, maps hidden gems using PostGIS, renders Google Maps routes with rarity tiers, and integrates food and transit platforms."
tags: ["react-native", "node.js", "postgresql", "postgis", "google-maps", "llm"]
featured: true
timeline: "2026"
order: 2
accent: "#0891b2"
logo: "/logos/movearound.svg"
hoverImage: "/images/movearound-map.svg"
---

<video controls class="w-full rounded-lg border border-[var(--color-border)] my-6 shadow-md" poster="/images/movearound-platform.png">
  <source src="/videos/movearound-demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Key Engineering Achievements

### 1. Intent-Based Personalized Discovery
- **Itinerary Generation**: Architected a mobile-first app generating AI-driven itineraries across 6 preference categories: **Food, Luxury, Street, Shopping, History, and Chill**.
- **Hidden Gems Exploration**: Surfaces obscure, locally-sourced spots absent from standard maps, cutting average travel planning time by over **80%**.
- **Personalization Engine**: Developed a context-aware LLM engine adapting dynamically to user demographics, weather constraints, routing paths, and specific traveler interests, improving itinerary relevance by **3×** over generic search queries.

### 2. Biomechanical & Spatial Route Rendering
- **Google Maps Integration**: Seamless rendering of real-time routes, custom pathing, and interactive place-detail overlays.
- **Four-Tier Rarity System**: Categorizes discoveries into **Common, Uncommon, Rare, and Legendary** tiers based on local density, core distance, and community signals (Reddit & social data feeds).
- **PostGIS Geofencing**: Uses spatial databases to index coordinates, calculate distances, and run geo-queries efficiently.

### 3. Integrated Transit & Gamification Plane
- **Platform Integrations**: Embedded deep-links directly supporting 4 key urban platforms: **Rapido, Swiggy, Zomato, and Ola**, allowing users to book rides or discover food without switching apps.
- **Engagement Mechanics**: Implemented a Duolingo-style gamification loop including **Experience Points (XP), themed badges, and localized missions** to incentivize user-contributed place discoveries.
- **Trust & Moderation**: Built a Place Trust Score pipeline calculating reliability indexes based on source confidence, verification proofs, and OCR check protocols.

### 4. Interactive Mind Maps & Architecture Diagrams

<details class="cursor-pointer group border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-bg-secondary)] my-6">
  <summary class="font-semibold text-base select-none focus:outline-none flex items-center justify-between text-[var(--color-text)]">
    <span>💡 View Engineering & Architecture Overview</span>
    <span class="text-xs text-[var(--color-text-tertiary)] group-open:rotate-180 transition-transform duration-200">▼</span>
  </summary>
  <div class="mt-4 space-y-4">
    <p class="text-sm text-[var(--color-text-secondary)]">Click to view full size. Details product vision, recommendation pipeline, and place trust score algorithms.</p>
    <a href="/images/movearound-platform.png" target="_blank" class="block">
      <img src="/images/movearound-platform.png" alt="MoveAround Engineering Overview" class="rounded-lg border border-[var(--color-border)] mx-auto w-full object-contain" />
    </a>
  </div>
</details>

<details class="cursor-pointer group border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-bg-secondary)] my-6">
  <summary class="font-semibold text-base select-none focus:outline-none flex items-center justify-between text-[var(--color-text)]">
    <span>🗺️ View Obsidian Mind Map & System Nodes</span>
    <span class="text-xs text-[var(--color-text-tertiary)] group-open:rotate-180 transition-transform duration-200">▼</span>
  </summary>
  <div class="mt-4 space-y-4">
    <p class="text-sm text-[var(--color-text-secondary)]">Click to view full size. Zoom in to explore the system nodes and connections.</p>
    <a href="/images/movearound-mindmap.png" target="_blank" class="block">
      <img src="/images/movearound-mindmap.png" alt="Obsidian Mind Map" class="rounded-lg border border-[var(--color-border)] mx-auto w-full object-contain" />
    </a>
  </div>
</details>
