# 🛒 BazarDor (বাজার দর) — Daily Commodity Price Tracker for Bangladesh

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5-570DF8?style=for-the-badge&logo=daisyui)](https://daisyui.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-1.7-black?style=for-the-badge)](https://better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

**BazarDor (বাজার দর)** is a modern, high-performance, and responsive full-stack web application designed to track and display daily market prices of essential commodities and groceries across Bangladesh. From rice, lentils, oil, and vegetables to fish, meat, dairy, and spices, BazarDor provides real-time market comparisons, daily fluctuations, average prices, and historical trends at a glance.

---

## 🔗 Project Links

- **Live Deployment:** [https://bazardor.vercel.app](https://bazardor.vercel.app) *(or your Vercel deployment URL)*
- **GitHub Repository:** [https://github.com/shahed-ab/BazarDor](https://github.com/shahed-ab/BazarDor)

---

## 🌟 Key Features

1. **Live Price Ticker (Infinite CSS Marquee):**
   - Seamless, GPU-accelerated animated marquee at the top showing unit prices, currency, and percentage changes (▲ / ▼).
   - Pauses on mouse hover for convenient readability.

2. **Daily Market Volatility (Top Risers & Fallers):**
   - Automatically ranks and displays the top 6 price risers ("আজ দাম বেড়েছে") and top 6 price fallers ("আজ দাম কমেছে") on the home page.

3. **Category Filtering & True Numeric Sorting:**
   - Instant filtering across 8 primary food categories (Rice, Lentils, Oil, Vegetables, Fish, Meat, Dairy/Eggs, Spices).
   - Numerical conversion for Bengali digits (`toBengaliDigits`, `fromBengaliDigits`) allowing accurate numeric sorting: *Default*, *Price: Low to High*, and *Price: High to Low*.

4. **Protected Product Details & Market-Wise Comparison:**
   - Comprehensive detail page (`/product/[slug]`) comparing prices across prominent Bangladeshi markets (Karwan Bazar, Mirpur, Sylhet, Chittagong, etc.).
   - Displays minimum, maximum, and average calculated market prices.
   - Protected route requiring user authentication with automatic return redirect via `callbackURL`.

5. **Modern Authentication (BetterAuth + MongoDB):**
   - Full credentials support (Email/Password registration and sign-in).
   - Social OAuth providers: **Google** and **GitHub** with seamless account linking.
   - Robust edge middleware with session cookies and server-side verification.
   - DNS SRV resolution resilience configured for MongoDB Atlas connections on Windows/Node environments.

6. **Profile Management:**
   - Authenticated user overview showing provider avatars, registered email, and display names (`/profile`).
   - Profile update functionality powered by `authClient.updateUser` (`/profile/update`).

7. **Native Bengali Typography & Premium Design System:**
   - Styled with Google Font **Hind Siliguri** for natural, legible Bengali text.
   - Tailored color palette matching natural organic produce themes (`#078A42` primary green, neutral backgrounds, subtle borders).
   - Full responsiveness across Mobile (390px+), Tablet (768px), and Desktop (1024px+).

8. **Resilient API Architecture with Fallback:**
   - Multi-tiered fetcher with automatic fallback to secondary Cloudflare Worker endpoints if the primary API fails.

9. **Polished UX & Error Handling:**
   - Realistic skeleton loaders (`loading.tsx`), interactive toast notifications (`react-hot-toast`), retry-enabled error boundaries (`error.tsx`), and a custom 404 page (`not-found.tsx`).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI v5](https://daisyui.com/)
- **Authentication:** [BetterAuth v1.7](https://better-auth.com/) (Email & Password, Google OAuth, GitHub OAuth)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/) via official [MongoDB Node.js Driver v7](https://www.mongodb.com/docs/drivers/node/current/)
- **Typography:** [next/font/google](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (*Hind Siliguri*)
- **Notifications:** [react-hot-toast](https://react-hot-toast.com/)

---

## 📁 Directory Structure

```text
BazarDor/
├── app/
│   ├── api/
│   │   └── auth/[...all]/
│   │       └── route.ts         # BetterAuth API handler (GET / POST)
│   ├── category/[slug]/
│   │   ├── loading.tsx          # Category skeleton loading state
│   │   └── page.tsx             # Category product listing and sorting
│   ├── product/[slug]/
│   │   ├── loading.tsx          # Product details skeleton state
│   │   └── page.tsx             # Protected product detail & market comparison
│   ├── profile/
│   │   ├── update/
│   │   │   └── page.tsx         # User name update page
│   │   └── page.tsx             # Protected profile summary page
│   ├── signin/
│   │   └── page.tsx             # Sign in page
│   ├── signup/
│   │   └── page.tsx             # Sign up page
│   ├── error.tsx                # Global error boundary with retry
│   ├── globals.css              # Tailwind CSS v4, DaisyUI & animations
│   ├── icon.png                 # Favicon & application icon
│   ├── layout.tsx               # Root layout, Google font & Toaster
│   ├── loading.tsx              # Root skeleton loading state
│   ├── not-found.tsx            # Custom 404 not found page
│   └── page.tsx                 # Home page (Hero, Risers, Fallers, All Products)
├── components/
│   ├── BanglaDate.tsx           # Hydration-safe live Bengali date display
│   ├── CategoryProductList.tsx  # Interactive sorting and category grid
│   ├── Footer.tsx               # Application footer
│   ├── HeroSection.tsx          # Hero banner with illustrations
│   ├── Navbar.tsx               # Navigation bar, horizontal category scroll & profile dropdown
│   ├── PriceTicker.tsx          # Infinite CSS marquee ticker
│   ├── ProductCard.tsx          # Reusable product price card
│   ├── ProductCardSkeleton.tsx  # Product placeholder skeleton
│   ├── ProfileSignOutButton.tsx # Profile sign-out action button
│   ├── SignInForm.tsx           # Sign-in form with credentials and social OAuth
│   ├── SignUpForm.tsx           # Registration form with validation
│   └── UpdateProfileForm.tsx    # Name update form
├── lib/
│   ├── api.ts                  # Universal API client with automatic fallback
│   ├── auth.ts                 # Server-side BetterAuth configuration
│   ├── auth-client.ts          # Client-side BetterAuth React hooks
│   ├── bengali.ts              # Bengali numerals and formatting utilities
│   └── mongodb.ts              # Global MongoDB client connection pool & DNS fix
├── public/
│   └── images/
│       ├── bazar-hero.png       # Hero section illustration
│       └── logo-icon.png        # Brand logo
├── types/
│   └── index.ts                 # TypeScript type definitions & interfaces
├── middleware.ts                # Route protection & session redirect middleware
├── next.config.ts               # Next.js configuration & image remote patterns
├── package.json
└── tsconfig.json
```

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/shahed-ab/BazarDor.git
cd BazarDor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and provide your credentials:

```env
# MongoDB Connection String (Atlas or Local)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bazardor?retryWrites=true&w=majority

# BetterAuth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your_32_character_secret_key_here

# Base URLs
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🔐 OAuth Setup Guide

To enable Google and GitHub social logins:

### GitHub OAuth App Setup:
1. Navigate to **[GitHub Developer Settings](https://github.com/settings/developers)** > **OAuth Apps** > **New OAuth App**.
2. **Homepage URL:** `http://localhost:3000` (or your production URL)
3. **Authorization callback URL:**
   ```text
   http://localhost:3000/api/auth/callback/github
   ```
4. Copy the **Client ID** and generate a **Client Secret**, then paste them into `.env.local`.

### Google Cloud OAuth Setup:
1. Navigate to **[Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)**.
2. Create or configure an **OAuth 2.0 Client ID** (Web application).
3. **Authorized JavaScript origins:**
   ```text
   http://localhost:3000
   ```
4. **Authorized redirect URIs:**
   ```text
   http://localhost:3000/api/auth/callback/google
   ```
5. Copy the **Client ID** and **Client Secret**, then paste them into `.env.local`.

---

## 🚀 Deployment (Vercel)

1. Push your latest code to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete project implementation"
   git push origin main
   ```
2. Import the repository into [Vercel](https://vercel.com).
3. Under **Settings > Environment Variables**, add:
   - `MONGODB_URI`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (set to your Vercel URL, e.g. `https://your-app.vercel.app`)
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel URL, e.g. `https://your-app.vercel.app`)
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
   - `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`
4. In **MongoDB Atlas**: Go to **Network Access** and ensure `0.0.0.0/0` (Allow access from anywhere) is allowed.
5. In **Google Cloud Console** and **GitHub Developer Settings**: Add your production callback URLs:
   - `https://your-app.vercel.app/api/auth/callback/google`
   - `https://your-app.vercel.app/api/auth/callback/github`
6. Click **Deploy**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
