# MarketCompare — Next.js

A Nigerian multi-vendor e-commerce platform with price comparison as the core feature.
Converted from React + Vite to **Next.js 15 App Router (with React 19)**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack
- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v3**
- **Shadcn UI** (Radix UI components)
- **Framer Motion** (animations)
- **Recharts** (charts/analytics)
- **React 19** + **Next.js 15** (latest stable as of June 2026)
- **React Hook Form** + Zod (forms & validation)

## Routes
- `/` — Landing Page
- `/dashboard` — Customer Dashboard
- `/vendor` — Vendor Dashboard
- `/admin` — Admin Dashboard
- All other routes match the original React app structure

## Demo Accounts
Use the **Demo** button in the navbar or login page to switch between:
- **Customer View** → /dashboard
- **Vendor View** → /vendor
- **Admin View** → /admin

All data is mocked (no backend required).
