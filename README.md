# Umeed Foundation — website

The official website of **Umeed Foundation (A Ray of Hope)**.
A fast, free-to-host static website with a built-in admin panel for uploading photos and videos.

| What | Where |
|---|---|
| Change text, photos, videos, campaigns (no code) | `https://YOUR-SITE/admin` → see [docs/EDITING-GUIDE.md](docs/EDITING-GUIDE.md) |
| Put the site online / connect a domain | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| Things the foundation must do or confirm | [docs/CHECKLIST.md](docs/CHECKLIST.md) |
| Donations, volunteer sign-ups and other future features | [docs/FUTURE-FEATURES.md](docs/FUTURE-FEATURES.md) |

## Technology (in plain words)

- **[Astro](https://astro.build)** turns the content files into plain, fast web pages. There is no server or database to maintain or hack.
- **[Sveltia CMS](https://sveltiacms.app)** is the free admin panel at `/admin`. When you save, it commits the change to GitHub.
- **GitHub** stores the code and content and keeps a full history of every change.
- **Cloudflare Pages** (free) rebuilds and publishes the site automatically after every change.
- **[Web3Forms](https://web3forms.com)** (free) emails form submissions to the foundation's inbox.

## Project structure

```
src/
  data/            ← site-wide text & settings (JSON) — editable in /admin
    settings.json    contact details, social links, form key, donation details
    home.json        home page text
    about.json       about page: story, mission, vision, values
    impact.json      impact figures & milestones
  content/         ← collections (one Markdown file per item) — editable in /admin
    programmes/      our work: ration, supplies, education, health & dignity
    campaigns/       campaigns & events (each gets its own page)
    gallery/         gallery photos, posters & videos
    team/            trustees & team
    reports/         annual / impact reports (PDF)
  assets/uploads/  ← photos (automatically resized & compressed on build)
  components/      ← reusable building blocks (header, cards, forms, gallery…)
  layouts/         ← page frame with SEO tags
  pages/           ← one file per page / route
  styles/          ← colours, fonts and global styles
public/
  admin/           ← the admin panel (config.yml defines the editing forms)
  uploads/videos/  ← uploaded video files (max 25 MB each)
  uploads/documents/ ← uploaded PDFs
```

## Running it on your computer (optional, for developers)

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/
npm run check      # type & template checks
```
