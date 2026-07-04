# srinivasBJ — Living Notes & Publishing Platform

This repository contains the source code for my permanent personal publishing platform, knowledge archive, and digital garden. Built using **Astro**, **Tailwind CSS v4**, **TypeScript**, and **Decap CMS**, it compiles into a fast, zero-JS, static reader website optimized for hosting on **GitHub Pages**.

---

## 📂 Project Structure

```text
├── .github/workflows/   # GitHub Pages deployment automation
├── public/
│   ├── admin/           # Decap CMS Admin Workspace
│   │   ├── config.yml   # CMS Content schemas and collection configurations
│   │   └── index.html   # Custom HTML entrypoint with OAuth security gate
│   ├── favicon.svg      # Monogram monogram icon
│   └── robots.txt       # Crawler permissions & sitemap registry
├── src/
│   ├── components/      # Reusable UI elements (Sidebar, Table of Contents, Cards)
│   ├── content/         # Structured content collections
│   │   ├── blog/        # Long technical essays & articles
│   │   ├── lab/         # Digital garden logs (Linux notes, configs, quick thoughts)
│   │   ├── projects/    # Detailed case studies with architectural details
│   │   └── reading/     # Curated catalog of books, papers, articles, and bookmarks
│   ├── layouts/         # Layout systems (Base, Page, Post, Project)
│   ├── pages/           # Pages routing endpoints (Home, Blog, Lab, Projects, Reading)
│   ├── styles/          # Design system tokens and global CSS
│   └── content.config.ts# Zod schemas for strict collection verification
└── astro.config.mjs     # Astro configuration settings & Shiki theme configs
```

---

## 🧞 Local Commands

All commands are run from the project root using a terminal:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts local development server at `localhost:4321` |
| `npm run build` | Builds the static site output to `./dist/` |
| `npm run preview` | Previews the build output locally |
| `npm run astro check` | Runs TypeScript and component structure checks |

---

## 🔒 Publishing CMS & GitHub OAuth Authentication

Content is authored inside the browser using **Decap CMS** at the hidden `/admin` page. To prevent unauthorized writes, a custom security gate inspects logins.

### 🛡️ Access Control Gate
When logging in, the CMS receives your GitHub access token. Before rendering the dashboard:
1. It queries `https://api.github.com/user` to fetch the profile details.
2. It verifies that `user.login` matches strictly **`srinivasBJ`** (case-insensitive).
3. If unauthorized, it immediately erases credentials, blocks the dashboard, and displays an "Access Denied" page.

---

## ⚙️ Setup Instructions: GitHub OAuth Proxy (Cloudflare Worker)

Since GitHub OAuth requires a client secret that cannot be exposed on a static site, we use a lightweight, serverless OAuth proxy. Follow these steps to host your own free proxy on Cloudflare Workers.

### Step 1: Register GitHub OAuth Application
1. Go to your GitHub Profile -> **Settings** -> **Developer Settings** -> **OAuth Apps** -> **New OAuth App**.
2. Set **Application Name** to `srinivasBJ-publishing-platform`.
3. Set **Homepage URL** to your site: `https://srinivasbj.github.io`.
4. Set **Authorization callback URL** to your Cloudflare Worker URL:
   `https://<YOUR-WORKER-SUBDOMAIN>.workers.dev/callback`
5. Click **Register Application**.
6. Generate a **Client Secret** and copy both the **Client ID** and **Client Secret**.

### Step 2: Deploy Cloudflare Worker OAuth Proxy
1. Create a free account on [Cloudflare](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** -> **Create Application** -> **Create Worker**.
3. Name it (e.g., `srinivasbj-oauth`) and deploy.
4. Click **Edit Code** and replace the worker's script with the following code:

```javascript
// Cloudflare Worker: Decap CMS GitHub OAuth Proxy
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect to GitHub OAuth Authorization Page
    if (url.pathname === "/auth") {
      const targetUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo,user&state=cms`;
      return Response.redirect(targetUrl, 302);
    }

    // Callback handler from GitHub OAuth Server
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Missing code parameter", { status: 400 });
      }

      try {
        const response = await fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code: code,
          }),
        });

        const data = await response.json();

        if (data.error) {
          return new Response(`OAuth Error: ${data.error_description}`, { status: 400 });
        }

        // Redirect popup back to your main same-origin site
        const redirectUrl = `https://srinivasbj.github.io/admin/?token=${data.access_token}`;
        return Response.redirect(redirectUrl, 302);
      } catch (err) {
        return new Response(`Internal Server Error: ${err.message}`, { status: 500 });
      }
    }

    return new Response("Not Found", { status: 404 });
  }
};
```

5. Click **Save and Deploy**.
6. In your Cloudflare Worker Settings -> **Variables** -> Add **Environment Variables**:
   - `GITHUB_CLIENT_ID`: (Paste your Client ID)
   - `GITHUB_CLIENT_SECRET`: (Paste your Client Secret)
7. Save the variables.

### Step 3: Link Decap CMS to your Proxy URL
1. Open your repository codebase file: `public/admin/config.yml`.
2. Locate the `backend` block:
   ```yaml
   backend:
     name: github
     repo: srinivasBJ/srinivasBJ.github.io
     branch: main
     base_url: https://srinivasbj-oauth.workers.dev # <-- Replace with your worker URL
     auth_endpoint: auth
   ```
3. Commit and push the changes.

When you visit `/admin` and click **Login with GitHub**, the popup will execute the handshake through your Cloudflare Worker, fetch the token, perform the strict `srinivasBJ` username verification, and log you into the CMS editor workspace securely.
