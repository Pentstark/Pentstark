// Fix UUID Generation for Profiles Table
// Paste this in your browser console while on Supabase dashboard

(async function fixProfilesTable() {
  console.log('🔧 The profiles table needs UUID auto-generation...');
  
  console.log('⚠️ MANUAL ACTION REQUIRED:');
  console.log('1. Go to Supabase Dashboard → SQL Editor');
  console.log('2. Paste and run this SQL:');
  console.log('');
  console.log('ALTER TABLE public.profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();');
  console.log('');
  console.log('This will make the id field auto-generate UUIDs when inserting new profiles.');
  console.log('');
  
  // Test profile creation after the fix
  console.log('3. After running the SQL, test profile creation:');
  
  const API_URL = 'https://cvmvqogbepbfyoxufliu.supabase.co';
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bXZxb2diZXBiZnlveHVmbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4OTM1NDQsImV4cCI6MjA1MjQ2OTU0NH0.5mZP__LeSJK8pBWZRyHjhXBRCg_yTf7-kN7_dW1Qxl8';

  const testProfileData = {
    clerk_user_id: 'user_2zv4Rq9xUtK9pIAlmLaCBLv4Bne', // Your actual Clerk user ID
    email: 'ace141103@gmail.com',
    name: 'sathisha ace',
    rank: 'Script Kiddie',
    xp: 0,
    subscription_tier: 'Free'
  };

  console.log('📋 Will test with this data:', testProfileData);

  try {
    const createResponse = await fetch(`${API_URL}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(testProfileData)
    });

    const createResult = await createResponse.text();
    console.log('🧪 Profile creation test response:', createResponse.status, createResult);

    if (createResponse.ok) {
      console.log('✅ SUCCESS! Profile creation now working');
      const createdProfile = JSON.parse(createResult);
      console.log('📋 Created profile:', createdProfile);
      
      // The profile will remain for your actual use - no cleanup needed
      console.log('🎉 Your profile is now created and ready to use!');
    } else {
      console.log('❌ Profile creation still failing');
      console.log('Make sure you ran the SQL command first:');
      console.log('ALTER TABLE public.profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();');
    }

  } catch (error) {
    console.error('❌ Test error:', error);
    console.log('Run the SQL command first, then try again.');
  }
})();

console.log('🚀 UUID fix script loaded. Follow the instructions above.');
