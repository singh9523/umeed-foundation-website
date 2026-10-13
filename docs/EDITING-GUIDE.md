# Editing guide (no coding needed)

Most updates are made in the **admin panel** at `https://YOUR-SITE/admin`.
Every save is stored in GitHub, and the live website updates **about 1–2 minutes later**.

---

## 1. Signing in to the admin panel (first time)

The admin panel signs in with a **GitHub access token**, a password-like key that only lets it edit this one repository.

1. Sign in to GitHub and go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Name: `Umeed website admin`. Expiration: 1 year (set a reminder to renew it).
3. **Repository access → Only select repositories →** choose `umeed-foundation-website`.
4. **Permissions → Repository permissions → Contents → Read and write.** Leave everything else as it is.
5. Click **Generate token** and copy it.
6. Open `https://YOUR-SITE/admin`, choose **Sign in with token**, and paste it.

> 🔐 Treat the token like a password. Don't share it in WhatsApp or email. Each person who edits should create their own token from their own GitHub account, after being added as a collaborator on the repository (**Settings → Collaborators**).

---

## 2. Common tasks

### Add photos or videos to the gallery
Admin → **Gallery (photos & videos)** → **New**:
- **Type:** Photo, Poster or Video.
- **Photo:** upload from your phone or computer. Large photos are shrunk and converted automatically.
- **Video:** upload an MP4 of **up to 25 MB**, or paste a **YouTube link** (better for longer videos).
- **Image description:** describe the photo for blind visitors and Google, e.g. *"Volunteers handing ration bags to an elderly woman"*.
- **Order:** smaller numbers appear first.

### Add a new campaign or event
Admin → **Campaigns & events** → **New**. Fill in the title, date, summary, poster, sponsors, event photos, videos and the full story.
Tick **Feature on home page** to show it on the home page. Only tick one campaign at a time; the newest ticked one is shown.
Each campaign automatically gets its own page, for example `/campaigns/blanket-drive-2026`.

### Update impact figures
Admin → **Page text & settings → Impact figures & milestones**.
- **Impact figures** are only shown once at least one is added. *Only add numbers you can back up* (attendance lists, distribution records). Use the "Source / note" field, e.g. *"Counted from distribution register, Oct 2026"*.
- **Milestones** are a timeline of what the foundation has done.

### Change contact details, social links and donation details
Admin → **Page text & settings → Site settings**. Any field you leave **blank is hidden** on the website. Nothing is shown as "N/A" or as a fake value.

### Edit home or about page text
Admin → **Page text & settings → Home page / About page**.

### Add a hero photo to the home page
Admin → **Home page → Hero photo**. When this is empty, the logo emblem is shown instead. A real, bright photo from one of your drives works best (portrait orientation).

### Add trustee or team photos and bios
Admin → **Team & trustees** → open a person → upload a **photo** and add a **short bio**.

### Publish an annual or impact report
Admin → **Reports & documents** → **New** → upload the PDF. It appears on the Impact page under "Annual & impact reports".

---

## 3. Photo tips
- Use **real photos** from your drives. Ask for consent before photographing people, and be extra careful with children: avoid close-ups that identify a child together with their location or circumstances.
- Landscape photos work best in the gallery. Portrait photos work best for the home hero.
- Don't upload photos showing ID cards, ration cards, phone numbers or addresses.

## 4. If something goes wrong
- Every change is saved in GitHub history. A developer, or you via GitHub → **Commits**, can restore any earlier version.
- If the site doesn't update after a few minutes, open Cloudflare → **Workers & Pages → your project → Deployments** and look for a failed build. The error message usually names the file and field that has the problem.

## 5. Editing without the admin panel (alternative)
All content lives in GitHub. You can open any file in `src/data/` or `src/content/` on github.com, click the ✏️ pencil icon, edit, and **Commit changes**. The site rebuilds the same way.
