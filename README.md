# krabi-outage-app

Production-ready outage coordination app built with Next.js App Router, Tailwind, and Supabase.

## Requirements

- Node.js 18+
- Supabase project (Auth + Postgres)

## Supabase setup

1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql` to provision tables + enums.
3. Configure Auth roles in `app_metadata.role` with one of: `admin`, `dispatcher`, `supervisor`, `onsite`.

## Environment variables

Create `.env.local` from `.env.example`:

```
cp .env.example .env.local
```

Fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Running locally

```
npm install
npm run dev
```

Open http://localhost:3000

## Basic tests

```
npm run lint
```
