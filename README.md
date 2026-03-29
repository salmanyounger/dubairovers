# 🌟 DubaiRovers.com — Next.js Tourism Platform

**The world's most complete UAE & worldwide tour booking platform**

---

## 🚀 Quick Start

```bash
# 1. Copy project to your desktop
# Folder: C:\Users\Salman Ali\Desktop\rovers\

# 2. Install dependencies
npm install

# 3. Setup environment variables
copy .env.example .env.local
# Edit .env.local with your actual API keys

# 4. Run development server (clears cache first)
rd /s /q .next && npm run dev
```

Open: **http://localhost:3008**

---

## 🔑 Admin Access

**URL:** http://localhost:3008/admin  
**Password:** `DubaiRovers2025!`

---

## 📁 Project Structure

```
dubairovers/
├── app/
│   ├── (main)/              # Public pages (all with Header+Footer)
│   │   ├── page.js          # 🏠 Homepage — Hero, Tours, Blog
│   │   ├── tours/           # 🗺️ Tour listing, categories, detail
│   │   ├── attractions/     # 🏛️ Attraction tickets
│   │   ├── flights/         # ✈️ Flight search (WhatsApp)
│   │   ├── blog/            # 📰 Blog listing + posts
│   │   ├── about/           # ℹ️ About us
│   │   ├── contact/         # 📞 Contact form
│   │   ├── affiliate/       # 🤝 Affiliate program
│   │   ├── ib/              # 🏢 IB partner program
│   │   ├── privacy/         # 🔒 Privacy policy
│   │   └── terms/           # 📋 Terms & conditions
│   ├── admin/               # ⚙️ Admin panel (password protected)
│   │   ├── page.js          # Dashboard
│   │   ├── bookings/        # Booking management
│   │   ├── tours/           # Tour CRUD
│   │   ├── blog/            # Blog + AI generator
│   │   ├── invoices/        # Invoice system
│   │   ├── affiliates/      # Affiliate management
│   │   ├── ib/              # IB partner management
│   │   ├── agents/          # Agent forwarding
│   │   ├── seo/             # SEO dashboard
│   │   ├── editor/          # Visual editor
│   │   └── settings/        # Site settings
│   ├── api/                 # API routes
│   │   ├── generate-blog/   # AI blog generator
│   │   ├── ai-seo/          # AI SEO analysis
│   │   └── contact/         # Contact form
│   ├── layout.js            # Root layout
│   ├── globals.css          # ALL CSS (no style tags in JSX!)
│   ├── sitemap.js           # Dynamic sitemap
│   └── robots.js            # robots.txt
├── components/
│   ├── Header.js            # Sticky header, multilingual
│   ├── Footer.js            # Newsletter, links, social
│   ├── WhatsAppButton.js    # Fixed WhatsApp button
│   ├── TourCard.js          # Tour card (grid + list)
│   ├── BookingForm.js       # 4-step booking wizard
│   └── FAQSection.js        # Accordion FAQ
├── data/
│   └── tours.js             # All tours, categories, blogs data
├── lib/
│   ├── mongodb.js           # DB connection
│   └── seo.js               # SEO utility functions
├── middleware.js            # Bot detection
├── .env.example             # Environment variables template
└── package.json
```

---

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description | Required |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | Optional (uses data files) |
| `NEXTAUTH_SECRET` | Random string for auth | Optional |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | For map embeds | Optional |
| `NEXT_PUBLIC_EMAILJS_*` | For contact form | Optional |
| `OPENAI_API_KEY` | For AI blog & SEO | Optional |
| `GEMINI_API_KEY` | Fallback for AI features | Optional |

**Note:** All API keys are optional. The site works fully without them using WhatsApp fallbacks.

---

## 📦 Key Features

### 🌐 Public Website
- ✅ **Homepage** — Hero with animated search, stats counter, categories, tours, testimonials, blog
- ✅ **Tour Listing** — Filters, sort, grid/list view, category chips
- ✅ **Tour Detail** — Gallery with lightbox, tabs, booking sidebar, add-ons, itinerary
- ✅ **4-Step Booking Wizard** — Date → Guests → Add-ons → Confirm → WhatsApp + Email
- ✅ **Attractions** — Inline ticket booking with date picker
- ✅ **Flights** — Search form → WhatsApp
- ✅ **Blog** — Categories, featured, SEO optimised
- ✅ **Affiliate Program** — Bronze/Silver/Gold tiers, application form
- ✅ **IB Portal** — Company registration, 3-step wizard
- ✅ **Multilingual** — EN / AR / RU / ZH switcher in header

### ⚙️ Admin Panel (password: `DubaiRovers2025!`)
- ✅ **Dashboard** — Stats, revenue chart, AI marketing tips
- ✅ **Bookings** — Table, status filter, detail panel, WhatsApp confirm, invoice
- ✅ **Tour CRUD** — Full add/edit/delete with SEO fields
- ✅ **Blog + AI** — Generate full SEO blogs with OpenAI/Gemini
- ✅ **Invoice System** — Create, preview, print/PDF, mark paid
- ✅ **Affiliates** — Tier management, payout via WhatsApp
- ✅ **IB Partners** — Company management, forwarding
- ✅ **Agents** — Tour forwarding with pre-built WhatsApp messages
- ✅ **SEO Dashboard** — Score tracking, issues, schema status, AI SEO, rankings
- ✅ **Settings** — General, integrations, booking mode, SEO, social, security

---

## 🎨 Design System

- **Primary Font:** Playfair Display (headings)
- **Body Font:** Nunito (body text)
- **Arabic Font:** Cairo (RTL support)
- **Navy:** `#0A1628`
- **Gold:** `#D4AF37`
- **Cream:** `#FDF8EE`

---

## 📱 Technical Notes

1. **Zero `<style>` tags in JSX** — All CSS in `app/globals.css`
2. **`position:fixed` elements at root only** — WhatsApp button in `WhatsAppButton.js`
3. **No MongoDB required** — All data served from `data/tours.js`
4. **Booking flow** — WhatsApp + mailto simultaneously (no payment gateway needed)
5. **Admin auth** — sessionStorage only (no DB needed for MVP)

---

## 📞 Contact

**WhatsApp:** +971 54 473 5060  
**Email:** dbtis.com@gmail.com  
**Website:** https://dubairovers.com

---

*Built with ❤️ in Dubai 🇦🇪 by Salman Ali | DubaiRovers.com*
