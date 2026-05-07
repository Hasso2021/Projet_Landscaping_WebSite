-- Run in Supabase SQL editor if leads.email has NOT NULL and you omit email from some leads.
-- Check: SELECT is_nullable FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'email';

ALTER TABLE public.leads ALTER COLUMN email DROP NOT NULL;
