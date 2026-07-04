---
title: "React Server Components: The Missing Explanation"
author: "Josh W. Comeau"
category: "articles"
description: "The clearest explanation I've found of React Server Components — what they are, why they exist, and how they change the React mental model."
url: "https://www.joshwcomeau.com/react/server-components/"
tags: ["react", "server-components", "web-development"]
---

## Why This Article

React Server Components (RSC) represent a fundamental shift in how React applications are architected, but the official documentation has historically done a poor job explaining *why* they exist and what problems they solve. Josh W. Comeau's article fills that gap brilliantly.

## What Makes It Great

### The Right Mental Model

Instead of diving into implementation details, the article starts with the underlying problem: the tension between interactivity and performance in web applications. It then builds the case for RSCs as a natural solution to this tension, making the concept feel inevitable rather than arbitrary.

### Visual Explanations

The article uses interactive diagrams to show how data flows through a server component tree vs. a client component tree. Seeing the difference visually makes the concept click in a way that text alone can't achieve.

### Practical Boundaries

Perhaps most valuably, the article is honest about when *not* to use Server Components. Not every component benefits from running on the server, and understanding the boundary between server and client components is crucial for building effective RSC applications.

## Key Insight

The most important takeaway: Server Components aren't a replacement for Client Components. They're a new *type* of component that runs exclusively on the server. The power comes from composing both types together — using Server Components for data fetching and static rendering, and Client Components for interactivity.

## Recommended For

Anyone working with React who wants to understand the direction the framework is heading. Even if you're not using Next.js or another RSC-enabled framework yet, understanding this mental model will prepare you for the future of React development.
