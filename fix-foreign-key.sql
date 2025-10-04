-- Fix the foreign key constraint issue
-- The profiles table should not have a foreign key constraint on the id field

-- First, let's drop the problematic foreign key constraint
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- The profiles table should have:
-- 1. id (UUID, primary key, auto-generated) - this should NOT reference users table
-- 2. clerk_user_id (TEXT, references the Clerk user ID)
-- 3. All other profile fields

-- Let's also make sure the clerk_user_id field is properly indexed for performance
CREATE INDEX IF NOT EXISTS idx_profiles_clerk_user_id ON public.profiles(clerk_user_id);

-- Make sure the id field is properly set as primary key with UUID generation
ALTER TABLE public.profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Verify the table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
    AND table_schema = 'public'
ORDER BY ordinal_position;
