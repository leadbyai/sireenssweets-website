# Sirens' Sweets static migration

Static Cloudflare Pages-ready replica of the live Wix site at `sirenssweets.com`.

## Build / verify

```bash
npm run build
python3 -m http.server 4173 --bind 127.0.0.1
```

Cloudflare Pages can use:
- Build command: `npm run build` or blank/static
- Output directory: `/` repository root

## Notes

- Current live site is Wix/Pepyaka with GoDaddy domain registration and DomainControl nameservers.
- The Wix shop/product routes contain placeholder products, so the static migration redirects old product/cart URLs to pricing/custom order.
- The contact form currently opens the visitor's email app (`mailto:`). Add a Cloudflare Pages Function plus email provider credentials before production if a server-side form is required.
