# Deploying the website

**Overview:** the code lives on **GitHub**, and **Cloudflare Pages** builds and hosts it for free.
Once connected, every change (from the admin panel or from GitHub) goes live automatically in 1–2 minutes.

---

## Step 1: Create the GitHub repository (≈5 min)

1. Create a free account at <https://github.com>. Use a foundation email address if you can, so the account belongs to the organisation and not to one person.
   - Recommended: create a free **GitHub Organization** (e.g. `umeedfoundation`) and add the trustees, so access never depends on a single person.
2. Click **+ → New repository**.
   - Name: `umeed-foundation-website`
   - Visibility: **Public** or **Private** (both are free; the website works either way).
   - Do **not** add a README, .gitignore or licence (the project already has them).
3. Upload the project with **one** of these methods:
   - **Command line** (from inside the project folder):
     ```bash
     git remote add origin https://github.com/YOUR-ACCOUNT/umeed-foundation-website.git
     git push -u origin main
     ```
   - **GitHub Desktop** (no command line): *File → Add local repository →* choose the project folder *→ Publish repository*.

## Step 2: Connect Cloudflare Pages (≈5 min)

1. Create a free account at <https://dash.cloudflare.com/sign-up>.
2. Go to **Workers & Pages → Create → Pages → Import an existing Git repository**.
3. Click **Connect GitHub**, allow access to the `umeed-foundation-website` repository only, and select it.
4. Build settings:
   | Setting | Value |
   |---|---|
   | Framework preset | **Astro** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Environment variable | `NODE_VERSION` = `22` |
   | Environment variable | `SITE_URL` = `https://<your-project>.pages.dev` (change it to your domain later) |
5. Click **Save and Deploy**. After about a minute your site is live at `https://<project-name>.pages.dev`.

> If your Cloudflare dashboard only offers "Workers" and not "Pages", choose **Create → Workers → Import a repository**, use the build command `npm run build`, and keep the deploy command `npx wrangler deploy` (the project's `wrangler.jsonc` already tells it what to publish). The site will be at `https://umeed-foundation.<your-subdomain>.workers.dev`. Everything else stays the same.

**Automatic redeployment:** from now on, every commit to the `main` branch triggers a new deployment. You can see each one under **Deployments** and roll back to an earlier version with one click.

## Step 3: Turn on the admin panel

1. Open `public/admin/config.yml` (on GitHub, click ✏️) and change these lines:
   ```yaml
   repo: YOUR-GITHUB-USERNAME/umeed-foundation-website   # → your real account/repo
   site_url: https://umeed-foundation.pages.dev          # → your real address
   display_url: https://umeed-foundation.pages.dev
   ```
2. Commit. After the redeploy, open `https://<your-site>/admin` and sign in with a GitHub token (see [EDITING-GUIDE.md](EDITING-GUIDE.md)).

## Step 4: Turn on the forms (≈3 min)

1. Go to <https://web3forms.com>, enter the foundation's email address, and copy the **Access Key** they email you.
2. Admin → **Page text & settings → Site settings → Forms → Web3Forms access key** → paste → Save.
3. After the redeploy, send a test message from `/contact` and check that it arrives in your inbox (including the spam folder).

This access key is *designed* to be public. It can only send emails to your own address, so it is safe to have it in the website code.

## Step 5 (later): Connect a custom domain

1. Buy a domain, e.g. `umeedfoundation.org` or `umeedfoundation.in`, from any registrar (Cloudflare Registrar, GoDaddy, Hostinger, BigRock, etc.).
2. Cloudflare → your Pages project → **Custom domains → Set up a custom domain** → enter `www.yourdomain.org` and follow the instructions.
   - If the domain is registered at Cloudflare, or you move its DNS to Cloudflare, this is one click.
   - Otherwise, add the **CNAME** record Cloudflare shows you at your registrar.
3. Also add the bare domain (`yourdomain.org`) so both versions work.
4. Update **SITE_URL** (Cloudflare → Settings → Environment variables) and `site_url` in `public/admin/config.yml` to the new address, then redeploy.
5. HTTPS (the padlock) is automatic and free.

## Costs

| Item | Cost |
|---|---|
| GitHub (code + content storage) | **Free** |
| Cloudflare Pages hosting (unlimited visitors, 500 builds/month) | **Free** |
| Sveltia CMS admin panel | **Free** (open source) |
| Web3Forms (250 submissions/month) | **Free**; paid plans if you outgrow it |
| Fonts | **Free** (self-hosted, open licence) |
| Domain name (optional) | ≈ ₹700–1,500 per year (`.org` / `.in`; prices vary by registrar, so check renewal prices) |
| Online payments (future) | No setup fee; Razorpay charges a fee per transaction, typically around 2% (check Razorpay's current NGO pricing) |

**Expected running cost today: ₹0/month**, plus the domain once you buy one.

## Limits to know
- Cloudflare Pages: a single file can be **at most 25 MB**, which is why video uploads are capped there. Use YouTube for longer videos.
- Keep the repository lean. Hundreds of large videos would make it slow, so prefer YouTube for video.
