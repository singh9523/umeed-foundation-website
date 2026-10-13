# Foundation checklist

## A. Please confirm or provide these facts
The website only shows what was visible in the Instagram material. These items are **missing or need confirmation**:

- [ ] **Location:** the site says *Godda, Jharkhand*. This was inferred from the registration photo taken at the Collectorate (समाहरणालय), Godda. Please confirm.
- [ ] **Official email address** (shown on the site and used for form submissions)
- [ ] **Phone / WhatsApp number** (optional, only if you want it public)
- [ ] **Postal address** and Google Maps link (optional)
- [ ] **Registration type and number** (e.g. Public Charitable Trust, Reg. No. …) and **year of registration**
- [ ] **12A / 80G status**: the site says nothing about tax benefits until you add it
- [ ] **Instagram handle:** posters show both `@umeedfoundation1826` and `@umeed_foundation_1826`. The site uses `umeedfoundation1826`, from the link you shared.
- [ ] **Website domain:** one poster appears to mention a website address. Do you already own a domain?
- [ ] **Trustees:** confirm names and spellings (Nitish Kumar, Shivam Gadia, CA Abhishek Kumar, Om Jha, Harshit), roles (e.g. Chairperson, Secretary, Treasurer), and send individual photos and one-line bios if you want them shown
- [ ] **Cloth distribution drive (9 Oct 2026):** the place, how many people received clothes (only if counted), and real photos from the day
- [ ] **Our story:** review the wording on the About page, which is written only from the posters' messages. Add when and why the foundation started.
- [ ] **Vision statement:** the posters don't include one, so the About page uses a draft based on your own slogans. Please approve or replace it.
- [ ] **Original logo file:** the current logo was cut from a photo. Ask your designer for the original high-resolution PNG/SVG file and upload it.

## B. Accounts to create (owned by the foundation)
- [ ] GitHub account (ideally a GitHub Organization with 2+ trustees as owners)
- [ ] Cloudflare account
- [ ] Web3Forms access key (sent to the foundation's email)
- [ ] (Later) Razorpay account in the foundation's name
- [ ] (Later) Domain name, registered in the foundation's name, with auto-renew turned on

## C. Deployment steps (see DEPLOYMENT.md)
- [ ] Create the GitHub repository and push the code
- [ ] Connect it to Cloudflare Pages and deploy
- [ ] Update `repo` and `site_url` in `public/admin/config.yml`
- [ ] Set `SITE_URL` in Cloudflare
- [ ] Create a GitHub token and sign in to `/admin`
- [ ] Add the Web3Forms key and send a test message from each form (Contact, Volunteer, Partnership)
- [ ] Add real photos from your drives (Gallery and campaign pages)
- [ ] Check the live site on a phone

## D. Good practice
- [ ] Get **consent** before publishing photos of beneficiaries, especially children
- [ ] Publish only impact numbers you have records for
- [ ] At least two trustees should have admin access, so the site never depends on one person
- [ ] Renew the GitHub access token before it expires (set a calendar reminder)
