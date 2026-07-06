---
name: "astro-site-maintenance"
description: "Guidelines and engineering safeguards for maintaining this Astro-based digital garden, detailing how to preserve mathematical LaTeX formatting, Mermaid flowcharts, code syntax visibility, and theme styling."
---

# Astro Site Maintenance & Troubleshooting Safeguards

Use this skill when modifying build configurations, markdown rendering pipelines, theme variables, or diagram loaders on this Astro site. It preserves critical fixes that prevent site breakage.

---

## 1. Mathematical LaTeX Formula Rendering

### The Problem
Astro's default Rust markdown parser (Sätteri) double-escapes backslashes in math blocks (e.g., translating `\sigma` to `\\sigma` during compilation). This breaks client-side rendering engines like KaTeX.

### The Safeguard
- **Configuration**: Always use the `processor: unified()` setting inside `astro.config.mjs`.
- **Build-Time Processing**: Run `remark-math` and `rehype-katex` during the build phase so formulas compile directly into HTML/MathML.
- **Dependency**: Keep `katex.min.css` loaded in the `<head>` of `src/layouts/BaseLayout.astro`. Do not remove it.

---

## 2. Shiki Code Block Visibility

### The Problem
Astro's Shiki syntax highlighter injects inline text colors on spans representing code tokens. Forcing code block backgrounds using `.prose pre { background-color: var(...) !important; }` clashes with Shiki's light/dark themes, causing invisible text in dark mode.

### The Safeguard
- **No !important Overrides**: Never apply `!important` background properties to `.prose pre` or `.prose code`.
- **Shiki Autonomy**: Let Shiki determine the background color dynamically from the configured theme styles (e.g. `github-light` and `github-dark`).

---

## 3. Mermaid.js Flowchart Rendering

### The Problem
Shiki wraps markdown-defined Mermaid code blocks as:
```html
<pre data-language="mermaid"><code>...</code></pre>
```
Standard Mermaid loaders targeting `.language-mermaid` or `pre.mermaid` fail to match this wrapper structure, leaving diagrams unrendered.

### The Safeguard
- **Query Selector**: The loader in `src/layouts/BaseLayout.astro` must query `pre[data-language="mermaid"]`.
- **Text Extraction**: It must extract code from the inner `<code>` element, construct a clean `div.mermaid` wrapper, and swap it with the `<pre>` container.
- **Theme Variables**: Pass dynamic `themeVariables` based on whether `html` contains the `.light` class to maintain high-quality diagram accessibility.

---

## 4. Theme State Preservation

### The Safeguard
- **Meta tags**: Ensure `theme-color` meta tags are configured for dark/light user preferences in `BaseLayout.astro`.
- **Flash Prevention**: Keep the inline check script directly under the `<head>` in `BaseLayout.astro` to query `localStorage` and toggle the `.light` class before the body paints:
  ```javascript
  const theme = localStorage.getItem('theme');
  if (theme === 'light') document.documentElement.classList.add('light');
  ```
