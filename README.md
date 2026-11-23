# No Antenna website

This repository contains the No Antenna website, built with Next.js. There is no source `index.html`: Next.js renders the `/` route from `app/page.tsx`. Vercel builds and serves it automatically.

## Deploy on Vercel from GitHub

1. In Vercel, choose **Add New → Project**, import `mehedikhann/No-Antenna`, and leave **Root Directory** as the repository root.
2. Choose the **Next.js** framework preset. The repository specifies Node.js 22, pnpm 10, and `next build`. Leave the Build Command and Output Directory at their detected defaults.
3. No environment variables are required for the pages or the contact form (see **Contact form** below).
4. Deploy. Vercel will build the project and produce a URL. Subsequent pushes to `main` will trigger new production deployments.
5. In **Settings → Domains**, add `www.noantenna.com`. Keep DNS management at Hostinger and add the DNS records Vercel displays there. Add `noantenna.com` as well if you want the bare domain to redirect.

## Contact form

The live strategic discussion form (`app/site-client.tsx`) posts directly from the browser to FormSubmit, which emails each request to `antennano@gmail.com`. This matches the privacy notice (`app/privacy/page.tsx`). No server variables are needed for it to work.

`app/api/inquiries/route.ts` is an unused alternative that sends requests through Resend to `contact@noantenna.com`. It is not called by the site. To switch to it later, point the form's `fetch` call at `/api/inquiries`, set `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` (a sender on a domain verified in Resend) in Vercel, and update the privacy notice to match.

## Local development

Requires Node.js 22 and pnpm 10.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. Check the production build with `pnpm build`.

## Source layout

- `app/page.tsx`, `app/site-client.tsx`, and `app/globals.css`: page, interactions, animation, and styles.
- `app/api/inquiries/route.ts`: unused Resend-based form handler (see Contact form).
- `public/`: logos, social image, and favicon.
- `app/privacy/page.tsx`, `app/terms/page.tsx`: legal pages.

Some `worker/`, `db/`, `drizzle/`, and `scripts/` files are retained from the original ChatGPT Sites source. The Vercel Next.js build does not run them. The existing hosted Site remains a separate deployment; this repository's form uses email delivery in place of its Cloudflare D1 database.
