# Planned features: what each one needs

The site is built so these can be added one at a time without a rebuild.
For each feature: **what it needs**, **who must act**, and **what the site already has ready**.

> ⚠️ Never collect card numbers, bank passwords, Aadhaar or PAN numbers through the simple website forms.
> Money and sensitive data must only go through a licensed payment gateway or a properly secured backend.

---

## 1. Online donations (Razorpay)

**Ready now:** the Donate page shows a Razorpay **Payment Button** automatically as soon as you paste its ID into
*Admin → Site settings → Donations → Razorpay Payment Button ID*. Razorpay hosts the payment form, so the website never handles card or bank details and needs no server or secret keys.

**What the foundation must do:**
1. Make sure the foundation has a **bank account in its own name** (not a trustee's personal account) and a **PAN** in the foundation's name.
2. Sign up at Razorpay as a **Trust / Society / NGO** and complete KYC. Razorpay usually asks for the registration certificate, trust deed or society bye-laws, PAN, bank proof and trustee IDs. Some payment methods may also need 12A/80G documents.
3. Once activated: Razorpay Dashboard → **Payment Button** → create a "Donation" button (let donors choose the amount; optionally collect name, email and phone) → copy the ID (`pl_…`) into the admin panel.
4. Test it with Razorpay **test mode** first, then switch to live mode.

**Status:** this Razorpay embed has been built but **not tested**, because it needs a real Razorpay account.

## 2. UPI donations
**Ready now:** fill in *UPI ID*, *payee name* and optionally upload the *UPI QR code* in Site settings. The Donate page then shows them, plus an "Open in UPI app" button on phones.
**Needs:** a UPI ID or QR linked to the **foundation's own bank account** (ask your bank for a current-account UPI or merchant QR). Don't use a trustee's personal UPI: it mixes personal and foundation money and makes accounts hard to audit.

## 3. Donation receipts and 80G certificates
- **Simple acknowledgement:** Razorpay sends every payer an automatic payment receipt by email.
- **80G tax receipts:** only possible after the foundation receives **80G approval** from the Income Tax Department. You will then also need to file **Form 10BD** each year and issue **Form 10BE** certificates to donors. This needs donor PAN numbers, which must **not** be collected through the website's contact form.
- **Implementation options:** issue receipts manually from your accounting software at first. Later, use a donation platform that generates 80G receipts, or add a small secure backend (e.g. Razorpay webhooks + Cloudflare Workers + a database) that a developer builds.

## 4. Foreign donations
Indian NGOs **must have FCRA registration** before accepting any money from foreign sources, including NRIs donating from foreign accounts. Until then, Razorpay donation buttons should accept **Indian payments only**, and the Donate page should say so.

## 5. Volunteer registration and event sign-ups
**Ready now:** the volunteer form on *Get Involved* emails each registration to you (once Web3Forms is set up).
**Next step options:**
- *Simplest:* connect Web3Forms to a Google Sheet (Web3Forms integrations, or a Zapier/Make free tier) so you get a running list.
- *Event sign-ups:* add a "Register" link on a campaign page pointing to a Google Form or a free event tool.
- *Full system* (later): a database of volunteers with login. This needs a developer and a backend (e.g. Supabase free tier).

## 6. CSR and partnership enquiries
**Ready now:** the partnership form on *Get Involved*.
**For CSR funding**, companies will usually ask for **CSR-1 registration** (filed with the Ministry of Corporate Affairs), 12A and 80G certificates, audited accounts for recent years, and a project proposal. Upload these to *Reports & documents* as you obtain them.

## 7. Newsletter
Use a free tier of **Brevo**, **Mailchimp** or **Buttondown**. They give you an embeddable sign-up form, which a developer can drop into the footer. That service handles subscriber consent and unsubscribes.

## 8. Campaign-specific donation pages
**Ready now:** every campaign already has its own page (`/campaigns/…`).
**Next:** add an optional "Razorpay button ID" field to campaigns (≈30 minutes of developer work), so each campaign shows its own donation button and the money can be tracked per campaign in Razorpay.

## 9. Impact reports and downloadable documents
**Ready now:** *Admin → Reports & documents* (PDF upload). These appear on the Impact page.

## 10. Admin panel / CMS
**Ready now:** `/admin` (Sveltia CMS). Free, no server.
**Possible upgrades:** "Sign in with GitHub" button instead of tokens (needs a small free Cloudflare Worker, about 15 minutes of setup), or an approval workflow so changes are reviewed before going live (`publish_mode: editorial_workflow` in `config.yml`).

## 11. Hindi version of the website
The layout already supports Hindi text. A full Hindi version (`/hi/…`) would need the content translated. Sveltia CMS supports bilingual editing side by side.
