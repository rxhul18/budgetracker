# 💰 Budget Tracker

Track smarter, spend wiser.

**PennyPilot** is a modern, minimal budget tracking web app built with cutting-edge tools like Next.js, Tailwind CSS, React TanStack Query, and PostgreSQL. Designed to help individuals manage their income and expenses with ease, turn personal finance into a visual and organized experience.

---

## 📊 Features

- ✅ Add & categorize income and expenses
- 📈 View detailed monthly & yearly summaries
- 📉 Dynamic graph visualizations (line & pie charts)
- 📂 Export your financial data to CSV
- 🌐 Responsive, clean, and intuitive UI

---

## 🛠 Tech Stack

| Frontend        | Backend           | Database      | Others                    |
|----------------|-------------------|---------------|---------------------------|
| Next.js (App Router) | API Routes / Server Actions | PostgreSQL | Tailwind CSS |
| React + TanStack Query | Prisma ORM | Supabase (optional) | Clerk Auth |
| Recharts |                 |                | CSV Export |


---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/rxhul18/penny-pilot.git
cd penny-pilot
```
### 2. Install Dependencies

```bash
npm install
or
bun install
```
### 3. Setup Environment

Create a .env.local file and add your database credentials:
```bash
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/wizard

# Local PostgreSQL (for local dev, if used)
DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/yourdb?schema=public"

# Supabase (hosted PostgreSQL)
POSTGRES_URL="postgres://USER:PASSWORD@HOST:6543/postgres?sslmode=require"
POSTGRES_PRISMA_URL="postgres://USER:PASSWORD@HOST:6543/postgres?sslmode=require"
POSTGRES_URL_NON_POOLING="postgres://USER:PASSWORD@HOST:5432/postgres?sslmode=require"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=postgres
POSTGRES_HOST=db.YOUR_PROJECT_ID.supabase.co

# Supabase API
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```
### 4. Migrate Database

```bash
npx prisma migrate dev --name init
npx prisma generate
```
### 5. Run the App

```bash
npm run dev
```
### 📸 Screenshots
<img width="1440" alt="Screenshot 2025-05-01 at 12 58 01 PM" src="https://github.com/user-attachments/assets/e91cb6f3-3d69-4f53-934d-48310b995f74" />
<img width="1440" alt="Screenshot 2025-05-01 at 4 21 47 PM" src="https://github.com/user-attachments/assets/cc4dea1e-61e5-435a-8264-5a667ab12d37" />
<img width="1439" alt="Screenshot 2025-05-01 at 4 21 58 PM" src="https://github.com/user-attachments/assets/b4973d83-82e5-459d-be8e-6a52d60ccfa2" />

## Made with ❤️ by [Rahul Shah(me)](https://rahulwtf.in)
