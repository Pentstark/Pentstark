// Fix Foreign Key Constraint Issue
// Run this in your browser console on the Supabase dashboard

console.log('🔧 Foreign Key Constraint Fix Required');
console.log('');
console.log('❌ ERROR: profiles table has incorrect foreign key constraint');
console.log('The profiles.id field should NOT reference the users table');
console.log('');
console.log('🛠️ MANUAL ACTIONS REQUIRED:');
console.log('');
console.log('1. Go to Supabase Dashboard → SQL Editor');
console.log('2. Run these SQL commands IN ORDER:');
console.log('');
console.log('--- STEP 1: Remove the problematic foreign key constraint ---');
console.log('ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;');
console.log('');
console.log('--- STEP 2: Ensure UUID auto-generation is set ---');
console.log('ALTER TABLE public.profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();');
console.log('');
console.log('--- STEP 3: Add index for clerk_user_id lookups ---');
console.log('CREATE INDEX IF NOT EXISTS idx_profiles_clerk_user_id ON public.profiles(clerk_user_id);');
console.log('');
console.log('--- STEP 4: Verify the table structure ---');
console.log('SELECT column_name, data_type, is_nullable, column_default');
console.log('FROM information_schema.columns');
console.log('WHERE table_name = \'profiles\' AND table_schema = \'public\'');
console.log('ORDER BY ordinal_position;');
console.log('');
console.log('🎯 Expected Structure:');
console.log('- id: UUID, PRIMARY KEY, DEFAULT gen_random_uuid() (NOT a foreign key)');
console.log('- clerk_user_id: TEXT (stores Clerk user ID like "user_2zv4Rq9xUtK9pIAlmLaCBLv4Bne")');
console.log('- email, name, avatar_url, rank, xp, subscription_tier, etc.');
console.log('');
console.log('✅ After running these commands, try signing in again.');

// Test function to verify the fix
window.testProfileCreation = async function() {
  console.log('🧪 Testing profile creation after foreign key fix...');
  
  const API_URL = 'https://cvmvqogbepbfyoxufliu.supabase.co';
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bXZxb2diZXBiZnlveHVmbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4OTM1NDQsImV4cCI6MjA1MjQ2OTU0NH0.5mZP__LeSJK8pBWZRyHjhXBRCg_yTf7-kN7_dW1Qxl8';

  const testProfileData = {
    clerk_user_id: 'user_2zv4Rq9xUtK9pIAlmLaCBLv4Bne',
    email: 'ace141103@gmail.com',
    name: 'sathisha ace',
    rank: 'Script Kiddie',
    xp: 0,
    subscription_tier: 'Free'
  };

  try {
    const response = await fetch(`${API_URL}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(testProfileData)
    });

    const result = await response.text();
    console.log('📋 Response:', response.status, result);

    if (response.ok) {
      console.log('✅ SUCCESS! Foreign key constraint fixed');
      const profile = JSON.parse(result);
      console.log('👤 Created profile:', profile);
    } else {
      console.log('❌ Still failing. Make sure you ran all the SQL commands.');
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
};

console.log('');
console.log('💡 After running the SQL commands, call testProfileCreation() to verify the fix.');
