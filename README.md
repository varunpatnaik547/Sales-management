# SalesFlow

Next.js 15 + Supabase sales-management application.

## Run locally

1. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key.
2. Run the SQL migration in `supabase/migrations/202607250001_initial_schema.sql` in the Supabase SQL editor (or `supabase db push`).
3. In Supabase Auth, create the initial user, then set its `profiles.role` to `admin` in the table editor.
4. `npm install && npm run dev`

The migration creates profiles for new Auth users. Admins can assign `sales_rep` or `finance` roles in the `profiles` table; invitations should be sent from Supabase Auth or a server-side admin API using a protected service-role secret.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

The project includes a Next.js Vercel configuration and safe environment-file exclusions. Follow the detailed [GitHub and Vercel deployment guide](docs/DEPLOYMENT.md). No deployment credentials are stored in this repository.
