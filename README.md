# Marginalia

A full-stack Next.js 14 book review app with Supabase Auth, Supabase PostgREST, Google Books search, and Open Library covers.

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Supabase Auth and database
- Google Books API for search
- Open Library Covers API for cover images

## Required environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=
```

`NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY` is optional for low-volume usage, but supported.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Database setup

Run the SQL in [`supabase/schema.sql`](/Users/fernandomurravicario/App/Book_Reviewer/supabase/schema.sql) in your Supabase SQL editor, or apply it with the CLI. It creates:

- `books`
- `reviews`
- average rating helper function
- row-level security policies so users can only change their own reviews

## Routes

- `/` homepage with search, trending books, and recent reviews
- `/search` Google Books search results
- `/books/[id]` Supabase-backed book detail and review page
- `/profile` signed-in user review shelf
- `/auth` email/password login and signup
