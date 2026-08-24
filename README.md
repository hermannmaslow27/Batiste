# 🚀 Batiste

> **Multi-tenant SaaS platform for creating showcase websites** built with Next.js 16, Drizzle ORM, and Neon PostgreSQL Serverless over WebSockets.

Batiste enables users to build, customize, and publish tailored showcase websites featuring dynamic wildcard subdomains (`*.batiste.app`), a modular block page builder, product catalog management, and internationalization.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
* **Language:** [TypeScript 5](https://www.typescriptlang.org/)
* **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com), [Lucide React](https://lucide.dev), [Sonner](https://sonner.emilkowal.ski/)
* **ORM & Database:** [Drizzle ORM](https://orm.drizzle.team/), [Neon Serverless PostgreSQL](https://neon.tech)
* **Authentication:** [NextAuth.js v5](https://next-auth.js.org) (Google Provider & Credentials)
* **Form Management & Validation:** [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev)
* **Animations:** [GSAP](https://gsap.com/)

---

## 📌 Key Features & Architecture

* **Multi-tenant / Wildcard Subdomains:** Client site isolation via Next.js Middleware URL rewrites (`<subdomain>.batiste.app`).
* **Neon Serverless via WebSockets:** Reliable database pooling over HTTPS port 443 (bypassing restricted outbound port 5432 environments).
* **Block-Based Page Builder:** Modular structures (Hero, Carousel, Card Grid, CTA, Forms, Testimonials, Rich Text).
* **Dynamic Theme System:** Real-time CSS variable generation driven by site theme selection.
* **Per-site Feature Flags:** Modular activation of components (Blog, Catalog, Quotes, Appointment Booking).

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone git@github-pro:hermannmaslow27/Batiste.git
cd Batiste
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Variables (`.env.local`)

Create a `.env.local` file in the root directory and populate it with your credentials:

```env
# Database (Neon PostgreSQL Pooler with SSL)
DATABASE_URL="postgresql://<user>:<password>@<neon-pooler-host>/neondb?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_generated_nextauth_secret"

# Social Authentication (Google only)
AUTH_GOOGLE_ID="your_google_client_id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your_google_client_secret"
```

---

## 🗄️ Database & Scripts

| Command | Description |
| :--- | :--- |
| `pnpm db:generate` | Generates Drizzle migration files from schemas. |
| `pnpm db:migrate` | Applies SQL migrations to the Neon database via WebSockets. |
| `pnpm db:push` | Directly syncs the schema changes with the database. |
| `pnpm db:seed` | Seeds the database with initial data (Themes, system defaults). |

---

## 💻 Development & Build

```bash
# Start the development server
pnpm dev

# Run TypeScript type check
pnpm typecheck

# Lint codebase
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 🌐 Local Subdomain Testing

To test tenant subdomains locally (e.g., `deku.localhost:3000`):

1. Open your system `hosts` file (Windows: `C:\Windows\System32\drivers\etc\hosts`).
2. Add the following entry:
   ```text
   127.0.0.1 deku.localhost
   ```
3. Navigate to `http://deku.localhost:3000` in your browser.

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
