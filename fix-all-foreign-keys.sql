-- Fix ALL foreign key constraints to use profiles table instead of auth.users
-- This is the complete fix for the Clerk + Supabase integration

-- Step 1: Drop all foreign key constraints that reference auth.users
ALTER TABLE public.academy_enrollments DROP CONSTRAINT IF EXISTS academy_enrollments_user_id_fkey;
ALTER TABLE public.activity_logs DROP CONSTRAINT IF EXISTS activity_logs_user_id_fkey;
ALTER TABLE public.course_enrollments DROP CONSTRAINT IF EXISTS course_enrollments_user_id_fkey;
ALTER TABLE public.course_module_progress DROP CONSTRAINT IF EXISTS course_module_progress_user_id_fkey;
ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_created_by_fkey;
ALTER TABLE public.lab_progress DROP CONSTRAINT IF EXISTS lab_progress_user_id_fkey;
ALTER TABLE public.labs DROP CONSTRAINT IF EXISTS labs_creator_id_fkey;
ALTER TABLE public.service_requests DROP CONSTRAINT IF EXISTS service_requests_user_id_fkey;
ALTER TABLE public.skill_scores DROP CONSTRAINT IF EXISTS skill_scores_user_id_fkey;
ALTER TABLE public.subscriptions DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;
ALTER TABLE public.track_module_progress DROP CONSTRAINT IF EXISTS track_module_progress_user_id_fkey;
ALTER TABLE public.track_progress DROP CONSTRAINT IF EXISTS track_progress_user_id_fkey;
ALTER TABLE public.user_badges DROP CONSTRAINT IF EXISTS user_badges_user_id_fkey;
ALTER TABLE public.xp_logs DROP CONSTRAINT IF EXISTS xp_logs_user_id_fkey;

-- Step 2: Add new foreign key constraints that reference profiles(id) instead
ALTER TABLE public.academy_enrollments ADD CONSTRAINT academy_enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.activity_logs ADD CONSTRAINT activity_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.course_enrollments ADD CONSTRAINT course_enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.course_module_progress ADD CONSTRAINT course_module_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.courses ADD CONSTRAINT courses_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id);
ALTER TABLE public.lab_progress ADD CONSTRAINT lab_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.labs ADD CONSTRAINT labs_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.profiles(id);
ALTER TABLE public.service_requests ADD CONSTRAINT service_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.skill_scores ADD CONSTRAINT skill_scores_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.track_module_progress ADD CONSTRAINT track_module_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.track_progress ADD CONSTRAINT track_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.user_badges ADD CONSTRAINT user_badges_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);
ALTER TABLE public.xp_logs ADD CONSTRAINT xp_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);

-- Step 3: Ensure profiles table is properly configured
ALTER TABLE public.profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();
CREATE INDEX IF NOT EXISTS idx_profiles_clerk_user_id ON public.profiles(clerk_user_id);

-- Step 4: Verify the changes
SELECT 
  tc.constraint_name, 
  tc.table_name, 
  kcu.column_name, 
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public'
  AND (ccu.table_name = 'profiles' OR ccu.table_name = 'users')
ORDER BY tc.table_name;
