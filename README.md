# Zorga

Production website for [zorga.co](https://zorga.co).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS 4. No client-side animation libraries; motion is CSS with a small IntersectionObserver reveal system. Deployed on Cloudflare via the OpenNext adapter.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Environment variables

Names only; set values in `.env.local` for development and in the Cloudflare project for production. Never commit values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and structured data |
| `NEXT_PUBLIC_LEGAL_LINE` | Footer legal line override |
| `RESEND_API_KEY` | Contact form delivery (Resend) |
| `CONTACT_TO_EMAIL` | Contact form recipient |
| `CONTACT_FROM_EMAIL` | Verified sending address for contact email |
| `CONTACT_WEBHOOK_URL` | Alternative contact delivery: HTTPS endpoint accepting JSON POST |
