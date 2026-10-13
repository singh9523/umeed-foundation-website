# Deploying the website

## Current setup (live)

| | |
|---|---|
| **Live website** | <https://umeed-foundation-website.umeedfoundation2026.workers.dev> |
| **Admin panel** | <https://umeed-foundation-website.umeedfoundation2026.workers.dev/admin> |
| **Code & content** | <https://github.com/singh9523/umeed-foundation-website> (branch `main`) |
| **Hosting** | Cloudflare → Workers & Pages → `umeed-foundation-website` (a Worker serving static files) |

**How updates go live:** every commit to `main` on GitHub (from the admin panel, from github.com, or from a computer) automatically starts a Cloudflare build (`npm run build`, then `npx wrangler deploy`). It is live 1–2 minutes later.
You can see every build under Cloudflare → `umeed-foundation-website` → **Deployments**. If something goes wrong, click **⋯ → Rollback** on an earlier version.

The Cloudflare settings live in [`wrangler.jsonc`](../wrangler.jsonc): the Worker name, the folder to publish (`dist`), and whether the free `workers.dev` address is switched on.

---

## Setting it up again from scratch (e.g. under a new account)

1. **GitHub:** create a repository named `umeed-foundation-website` (no README) and push this project to it:
   ```bash
   git remote add origin https://github.com/YOUR-ACCOUNT/umeed-foundation-website.git
   git push -u origin main
   ```
   Or use GitHub Desktop: *File → Add local repository → Publish repository*.
2. **Cloudflare:** sign up at <https://dash.cloudflare.com/sign-up> → **Workers & Pages → Create → Connect GitHub**. Allow access to *only* this repository and select it.
   - Build command: `npm run build` · Deploy command: `npx wrangler deploy`
   - The Worker name must match `"name"` in `wrangler.jsonc`.
   - *Tip:* if GitHub opens its settings page instead of sending you back to Cloudflare (this happens when the Cloudflare app is already installed), refresh the Cloudflare page. If the repository still isn't listed, uninstall the app at github.com/settings/installations and connect again.
3. **workers.dev address:** your account's subdomain is set under **Workers & Pages → Account details → Subdomain → Change**.
4. **Site address in the code:** update the address in `astro.config.mjs` (`SITE_URL`) and in `public/admin/config.yml` (`repo`, `site_url`, `display_url`), then commit.

## Turning on the admin panel
Already configured for `singh9523/umeed-foundation-website`. Open `/admin` and sign in with a GitHub token (see [EDITING-GUIDE.md](EDITING-GUIDE.md)).

## Turning on the forms (≈3 min)

1. Go to <https://web3forms.com>, enter the foundation's email address, and copy the **Access Key** they email you.
2. Admin → **Page text & settings → Site settings → Forms → Web3Forms access key** → paste → Save.
3. After the redeploy, send a test message from `/contact` and check that it arrives in your inbox (including the spam folder).

This access key is *designed* to be public. It can only send emails to your own address, so it is safe to have it in the website code.

## Connecting a custom domain (later)

1. Buy a domain, e.g. `umeedfoundation.org` or `umeedfoundation.in`, from any registrar (Cloudflare Registrar, GoDaddy, Hostinger, BigRock, etc.).
2. Add the domain to Cloudflare: **Add a domain** on the Cloudflare home page, then change the domain's nameservers at your registrar to the two that Cloudflare shows you. This is free.
3. Cloudflare → `umeed-foundation-website` → **Settings → Domains & Routes → Add → Custom domain** → enter `www.yourdomain.org`. Repeat for `yourdomain.org`.
4. Change `SITE_URL` in `astro.config.mjs` and `site_url` / `display_url` in `public/admin/config.yml` to the new address, then commit.
5. HTTPS (the padlock) is automatic and free.

## Costs

| Item | Cost |
|---|---|
| GitHub (code + content storage) | **Free** |
| Cloudflare Workers hosting (static pages are served free with no visitor limit; free monthly build minutes) | **Free** |
| Sveltia CMS admin panel | **Free** (open source) |
| Web3Forms (250 submissions/month) | **Free**; paid plans if you outgrow it |
| Fonts | **Free** (self-hosted, open licence) |
| Domain name (optional) | ≈ ₹700–1,500 per year (`.org` / `.in`; prices vary by registrar, so check renewal prices) |
| Online payments (future) | No setup fee; Razorpay charges a fee per transaction, typically around 2% (check Razorpay's current NGO pricing) |

**Expected running cost today: ₹0/month**, plus the domain once you buy one.

## Limits to know
- Cloudflare: a single file can be **at most 25 MB**, which is why video uploads are capped there. Use YouTube for longer videos.
- Keep the repository lean. Hundreds of large videos would make it slow, so prefer YouTube for video.
