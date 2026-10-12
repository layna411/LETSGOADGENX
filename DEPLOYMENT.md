# LetsGoAdGenX (ADGEN-X) — Deployment & Production Guide

This document contains everything needed to run, configure, and deploy the **LetsGoAdGenX** premium digital agency website.

---

## 1. Quick Start Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm or yarn or pnpm

### Steps
1. Navigate to the project root directory:
   ```bash
   cd v:\letsgoadgenx\letsgoadgenx_web
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 2. Production Build

To verify and create the optimized production bundle:
```bash
npm run build
```
The output files will be generated in the `dist/` directory.

To preview the built production website locally:
```bash
npm run preview
```

---

## 3. Environment Variables Configuration

Create a `.env` file in the root of the project (you can copy `.env.example`):

```bash
# Web3Forms API Key for form submissions
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```

### Setting up Web3Forms (Free & Instant):
1. Visit [https://web3forms.com](https://web3forms.com).
2. Enter the official email: `letsgoadgenx@gmail.com`.
3. Check your inbox and copy the generated access key.
4. Paste it as `VITE_WEB3FORMS_ACCESS_KEY` in `.env` (or in your hosting provider's Environment Variables settings).
5. All submissions from the `/contact` form will now be sent directly to `letsgoadgenx@gmail.com` with anti-spam protection.

*Note: If `VITE_WEB3FORMS_ACCESS_KEY` is not set, the form gracefully simulates receipt and offers the customer immediate 1-click forwarding to WhatsApp (+91 90801 04624).*

---

## 4. Official Brand & Contact Points

All brand settings are centralized in `src/config/contact.ts` and `src/config/site.ts`:

- **Company Name:** LetsGoAdGenX
- **Brand Identity:** ADGEN-X
- **Official Email:** `letsgoadgenx@gmail.com`
- **Primary WhatsApp:** `+91 90801 04624`
- **All Contact Numbers:**
  - `+91 90801 04624` (Primary & WhatsApp)
  - `+91 79045 05060` (Direct Line)
  - `+91 63742 58264` (Support & Inquiries)
- **Tagline:** BUILD. BRAND. GROW.
- **Logo Asset:** Preserved official ADGEN-X badge at `public/adgenx-logo.png` and `src/assets/adgenx-logo.png`.

---

## 5. Deployment Options

### Option A: Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   - `VITE_WEB3FORMS_ACCESS_KEY` = *(your key)*
6. Click **Deploy**.
*(Note: `vercel.json` is already included for seamless SPA routing).*

### Option B: Netlify
1. Log in to [Netlify](https://netlify.com) and click **"Add new site"** -> **"Import an existing project"**.
2. Connect your Git repository.
3. Build Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add Environment Variable:
   - `VITE_WEB3FORMS_ACCESS_KEY` = *(your key)*
5. Click **Deploy Site**.
*(Note: `public/_redirects` is already included to support client-side routes).*

### Option C: Cloudflare Pages
1. Log in to Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Pages**.
2. Connect Git repository.
3. Build preset: **Vite**, build command: `npm run build`, output: `dist`.
4. Deploy.

---

## 6. Custom Domain & HTTPS Setup

1. In your hosting dashboard (Vercel/Netlify/Cloudflare), go to **Domains** -> **Add Domain**.
2. Enter your domain (e.g. `letsgoadgenx.com`).
3. Configure DNS records at your domain registrar (GoDaddy, Namecheap, Hostinger, etc.):
   - **CNAME Record:** `www` -> `cname.vercel-dns.com` (or Netlify equivalent)
   - **A Record:** `@` -> IP address provided by your host
4. SSL/HTTPS certificates are automatically issued by the hosting platform (free Let's Encrypt certificates).

---

## 7. Pre-Launch Verification Checklist

- [x] TypeScript compilation passes with 0 errors (`tsc -b`).
- [x] Vite production bundle builds successfully (`vite build`).
- [x] Official ADGEN-X logo loaded properly in header, hero, footer, and favicon.
- [x] All 3 contact phone numbers formatted with clickable `tel:` links.
- [x] Official email configured with clickable `mailto:` link.
- [x] WhatsApp buttons configured with prefilled URL-encoded inquiries.
- [x] Client-side routing working on all paths (`/`, `/services`, `/services/:slug`, `/work`, `/about`, `/process`, `/contact`, `/privacy`, `/terms`).
- [x] Form input validation and anti-spam honeypot operational.
- [x] SEO meta tags, OpenGraph tags, sitemap.xml, and robots.txt in place.
