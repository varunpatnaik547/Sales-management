# Deployment guide

## Prerequisites

- A Supabase project with the migration in `supabase/migrations/202607250001_initial_schema.sql` applied.
- A GitHub repository containing this project.
- A Vercel account connected to that GitHub account.

## GitHub

1. Create an empty GitHub repository; do not add a README or `.gitignore` remotely.
2. In the project folder, run `git init`, `git add .`, and `git commit -m "Initial SalesFlow application"`.
3. Add the GitHub remote and push the default branch.
4. Confirm `.env.local` was not committed. It is covered by `.gitignore`.

## Supabase

1. Run the migration in the Supabase SQL Editor or with `supabase db push`.
2. Create the first Auth user, then change that user’s `profiles.role` to `admin`.
3. Copy the project URL and anon key from **Project Settings → API**.
4. Do not expose a Supabase service-role key in Vercel or client-side code.

## Vercel

1. Select **Add New → Project** and import the GitHub repository.
2. Leave the framework preset as **Next.js** and build command as `npm run build`.
3. Add these environment variables for Production, Preview, and Development:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Future pushes to the production branch deploy to Production; pull requests receive Preview deployments.

## Verification

Run `npm run typecheck`, `npm run lint`, and `npm run build` locally before pushing. In Vercel, verify the build log, sign-in flow, image upload, and a role-protected dashboard route.
