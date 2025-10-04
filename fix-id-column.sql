-- Fix the profiles table to auto-generate UUIDs for id field
-- Run this SQL in your Supabase SQL Editor

-- Step 1: Set the id column to auto-generate UUIDs
ALTER TABLE public.profiles 
ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Step 2: Verify the change
SELECT column_name, column_default, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public' 
AND column_name = 'id';
