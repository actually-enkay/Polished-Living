# Polished Living — Static Site

A multi-page static website for Polished Living, ready to deploy to Vercel and edit on GitHub. No build step. No framework. Just HTML, CSS, and JavaScript.

---

## What's in here

```
polished-living-site/
├── index.html              Home page
├── services.html           All services overview
├── service-residential.html  Example service detail page
├── pricing.html            Three-tier pricing
├── about.html              Founder story + commitments
├── reviews.html            Customer reviews grid
├── areas.html              Service areas list
├── faq.html                FAQ accordion
├── book.html               Multi-step booking form
├── terms.html              Terms of Service (template)
├── privacy.html            Privacy Policy (template)
├── refund.html             Refund Policy (template)
├── styles.css              All styling
├── script.js               Shared JS (nav, footer, forms, accordion)
├── logo.png                Full Polished Living logo (use for marketing)
├── vercel.json             Vercel routing config
└── README.md               This file
```

---

## ⚠️ Three things to do before going live

### 1. Set up Formspree (so you receive form submissions)

The booking form and newsletter form send submissions to **Formspree**, a free service that emails you customer details. Without this step, forms will not work.

1. Go to **[formspree.io](https://formspree.io)** and sign up (free tier = 50 submissions/month).
2. Create a new form. Name it "Polished Living".
3. Copy your endpoint URL — it looks like `https://formspree.io/f/xnqkpwgb`.
4. Open `script.js`. At the top, find this line:
   ```js
   formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
   ```
5. Replace `YOUR_FORM_ID` with your actual endpoint URL. Save.
6. Push the change to GitHub (or test locally first).

When a customer submits the booking form, Formspree emails you the details and shows them in your Formspree dashboard.

### 2. Update business info

In `script.js`, edit the `CONFIG.business` object:

```js
business: {
  name: "Polished Living",
  phone: "(312) 555-0199",
  phoneHref: "tel:+13125550199",
  email: "hello@polishedliving.com",
  city: "Chicago, IL",
  hoursWeekday: "Mon–Sat · 7am–7pm",
  hoursWeekend: "Sun · 9am–4pm",
},
```

These values appear in the nav, footer, and contact links automatically.

### 3. Have a lawyer review the legal pages

The `terms.html`, `privacy.html`, and `refund.html` pages are **templates**, not legal advice. They cover the basics for a US-based cleaning business, but you should have an attorney in your operating jurisdiction review and adapt them before you start charging customers. Each page has a notice at the top reminding readers of this.

---

## Deploy to Vercel

### First time

1. Create a new GitHub repo. Upload this entire folder.
2. Go to **[vercel.com](https://vercel.com)** and sign up with your GitHub account.
3. Click **Add New → Project**.
4. Pick your `polished-living-site` repo. Vercel auto-detects it as a static site.
5. Click **Deploy**. Done in about 30 seconds.

You'll get a URL like `polished-living-site.vercel.app`. That's your live site.

### From then on

Edit any file on GitHub → push the change → Vercel rebuilds and deploys automatically. Usually live within 30 seconds.

### Custom domain

1. Buy a domain (Namecheap, Cloudflare, Porkbun — usually $10–15/year).
2. In Vercel, go to your project → **Settings → Domains**.
3. Add your domain. Vercel shows you DNS records to add at your registrar.
4. Add the records. SSL is automatic.

---

## Editing the site

### Adding/removing nav links

Open `script.js`. Find the `links` array inside `renderNav()`. Add, remove, or reorder. Every page picks up the change.

### The logomark

The nav and footer use an inline SVG monogram that approximates the PL + crescent + sparkle from the brand. The full logo (with wordmark and tagline) lives at `logo.png` — use it for marketing emails, social posts, business cards, and other off-site material. If you want to use the full PNG in the nav itself instead of the SVG, swap the `logomarkSVG()` call inside `renderNav()` in `script.js` for an `<img src="logo.png" height="36">` tag.

### Changing colors

Open `styles.css`. The first block — `:root { ... }` — has every color in the design as a CSS variable. Change once, applied everywhere.

```css
:root {
  --cream: #F5F1E8;       /* page background — warm ivory */
  --cream-light: #FBF8F1; /* lighter background */
  --ink: #14130F;         /* body text */
  --navy: #1B2640;        /* primary buttons, "PL" letters */
  --navy-deep: #131A2D;   /* footer + dark sections */
  --gold: #C9A876;        /* accent — crescent, italics, "Most popular" */
  --gold-light: #D9BB8C;  /* lighter gold for highlights */
  /* ... */
}
```

### Editing copy

Each page is a single HTML file. Find the text in the page you want to change and edit directly. No templating, no compilation — what you see is what gets served.

### Adding a new service detail page

Copy `service-residential.html` → rename to `service-deep.html` → edit the content. Then update the link in `index.html` and `services.html` to point to the new page.

### Adding new reviews

Open `reviews.html`. Each review is a `<div class="review-card">…</div>` block. Copy one, paste, edit the text, stars, name, and meta.

---

## Local preview

To preview the site on your computer before pushing:

**Easiest way:** Just double-click any `.html` file. It opens in your browser. (Some features like form submission won't work this way because of browser security, but navigation and styling will.)

**With a local server (recommended):** If you have Python installed:
```bash
cd polished-living-site
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

Or with Node:
```bash
npx serve
```

---

## Adding payments later

The site is set up for booking + form submission only. When you're ready to take payments:

- **Stripe Payment Links** (simplest): create a link per service in your Stripe dashboard, then change the "Book now" buttons to point to those links instead of `book.html`. Stripe handles the rest.
- **Stripe Checkout** (more custom): add a payment step after the booking form. Requires a small serverless function (Vercel supports this).
- **Acuity Scheduling** (booking + payments in one): replace `book.html`'s form with an Acuity embed. Acuity handles calendar, payment, and confirmation emails.

---

## File-level reference

- All pages load `styles.css` and `script.js`.
- All pages have `<div id="nav"></div>` and `<div id="footer"></div>` — these are populated by `script.js` on load. **Edit nav/footer once in `script.js`, applies everywhere.**
- Icons are loaded from Lucide via CDN (`<script src="https://unpkg.com/lucide@latest">`).
- Fonts are Fraunces (display serif) and Geist (body sans), loaded from Google Fonts.

---

## Built by Orvix Studio

Edit it however you like. It's yours.
