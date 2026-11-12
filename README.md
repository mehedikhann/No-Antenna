# No Antenna website

This repository contains the No Antenna website, built with Next.js. There is no source `index.html`: Next.js renders the `/` route from `app/page.tsx`. Vercel builds and serves it automatically.

## Deploy on Vercel from GitHub

1. In Vercel, choose **Add New → Project**, import `mehedikhann/No-Antenna`, and leave **Root Directory** as the repository root.
2. Choose the **Next.js** framework preset. The repository specifies Node.js 22, pnpm 10, and `next build`. Leave the Build Command and Output Directory at their detected defaults.
3. Add the form environment variables below in **Project Settings → Environment Variables**, for Production (and Preview if desired). Redeploy after changing variables.
4. Deploy. Vercel will build the project and produce a URL. Subsequent pushes to `main` will trigger new production deployments.
5. In **Settings → Domains**, add `www.noantenna.com`. Keep DNS management at Hostinger and add the DNS records Vercel displays there. Add `noantenna.com` as well if you want the bare domain to redirect.

The pages and animations deploy without environment variables. The strategic discussion form needs these server-side variables before it can deliver requests:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | A Resend API key with email-sending permission. |
| `INQUIRY_FROM_EMAIL` | A sender on a domain verified in Resend, such as `No Antenna <website@noantenna.com>`. |

The form sends each validated request to `contact@noantenna.com`. The visitor's address is used as the reply-to address. Without the two variables, the form shows an error and an email link; it does not claim that a request was received. Configure and verify the sending domain in Resend before testing. No API key belongs in this repository.

## Local development

Requires Node.js 22 and pnpm 10.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. To test form delivery locally, put the two environment variables in an untracked `.env.local`. Check the production build with `pnpm build`.

## Source layout

- `app/page.tsx`, `app/site-client.tsx`, and `app/globals.css`: page, interactions, animation, and styles.
- `app/api/inquiries/route.ts`: Vercel-compatible server-side form delivery.
- `public/`: logos, social image, and favicon.
- `app/privacy/page.tsx`, `app/terms/page.tsx`: legal pages.

Some `worker/`, `db/`, `drizzle/`, and `scripts/` files are retained from the original ChatGPT Sites source. The Vercel Next.js build does not run them. The existing hosted Site remains a separate deployment; this repository's form uses email delivery in place of its Cloudflare D1 database.
