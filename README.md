# Hrabi Portfolio using Notion API to write blogs and add projects

Portfolio built with Next.js App Router and Notion blog posting . It ships a clean landing page, projects and blog route, and a minimal Notion block renderer.

## Stack

- Next.js App Router with static export
- React 19 + TypeScript
- Tailwind CSS + shadcn/ui + Radix
- Notion SDK
- react-hook-form + @hookform/resolvers + zod
- framer-motion
- pnpm

## Quickstart

1) Copy env template:

```bash
cp .env.example 
```

2) Install dependencies:

```bash
pnpm install
```

3) Run the dev server:

```bash
pnpm dev
```

4) Generate the sitemap (optional, before build):

```bash
node scripts/generate-sitemap.js
```

5) Build static export:

```bash
pnpm build
```

The static output is generated in `out/`.

## Scripts

- `pnpm dev` Run Next.js in development
- `pnpm build --webpack` 
- `node scripts/generate-sitemap.js` Generate `public/sitemap.xml`

Edit `SITE_URL` in `scripts/generate-sitemap.js` to match your domain.

## Environment variables

Create `.env.local` and set:

| Name | Required | Description |
| --- | --- | --- |
| `NOTION_TOKEN` | Optional | Notion integration token (required for Notion fetch) |
| `NOTION_DATABASE_ID` | Optional | Default Notion database id (used if per-content ids are not set) |
| `NOTION_PROJECTS_DATABASE_ID` | Optional | Notion database id for projects |
| `NOTION_BLOG_DATABASE_ID` | Optional | Notion database id for blog posts |
| `NEXT_PUBLIC_SITE_URL` | Optional | Public site URL (wire into metadata/scripts if needed) |
| `NEXT_PUBLIC_FORMSPREE_ID` | Optional | Formspree form id for contact form |

## Project structure

- `src/app` App Router routes and pages
- `src/components/layout` Header, footer, and layout primitives
- `src/components/sections` Landing page sections (hero, skills, etc)
- `src/components/notion/renderer.tsx` Minimal Notion block renderer
- `src/components/ui` UI atoms and controls
- `src/data` Fallback content for static builds
- `src/domain` Entities and ports (interfaces)
- `src/infra/notion` Notion client and mapping helpers
- `src/infra/message` Message sender adapters
- `src/env.ts` Centralized env validation
- `scripts/generate-sitemap.js` Static sitemap generator

## Content and data

Current routes read from Notion when configured and fall back to `src/data/data.json` on errors or missing config:

- `src/app/projects/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`

Edit fallback content in `src/data/data.json`.

To wire Notion data, fetch and map content in server components using the helpers in `src/infra/notion` and keep any tokens server-only.

## notes for AI ( in case you will use an AI agent )
- Notion fetches must happen only at build time in server components; never expose the Notion token to the client.
- Continue using the domain/ports and infra layering; UI depends on ports.
- Favor layout primitives (`Box`, `Flex`, `Grid`, `Container`) from `src/components/layout/primitives.tsx` over ad-hoc Tailwind in sections.


## Troubleshooting

- If you see `Module not found: Can't resolve 'zod/v4/core'`, update `zod` to `^3.25.0` or `^4.0.0` and reinstall:

```bash
pnpm install
```
