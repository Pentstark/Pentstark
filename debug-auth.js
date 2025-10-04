// Debug Authentication Script
// Paste this in your browser console to debug authentication issues

(async function debugAuth() {
  console.log('🔍 Starting authentication debug...');
  
  const API_URL = 'https://cvmvqogbepbfyoxufliu.supabase.co';
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2bXZxb2diZXBiZnlveHVmbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4OTM1NDQsImV4cCI6MjA1MjQ2OTU0NH0.5mZP__LeSJK8pBWZRyHjhXBRCg_yTf7-kN7_dW1Qxl8';

  try {
    // Check if clerk_user_id column exists
    console.log('1. Testing database schema...');
    const testResponse = await fetch(`${API_URL}/rest/v1/profiles?select=clerk_user_id&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (testResponse.ok) {
      console.log('✅ clerk_user_id column exists in database');
    } else {
      console.log('❌ clerk_user_id column missing - run the SQL again');
      return;
    }

    // Check for existing profiles with Clerk user ID
    console.log('2. Checking for profiles with Clerk user ID...');
    const profileResponse = await fetch(`${API_URL}/rest/v1/profiles?clerk_user_id=eq.user_2zuZGU2U7AkFMSKEcZbbKh0JMun`, {
      method: 'GET',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const profiles = await profileResponse.json();
    console.log('📋 Existing profiles:', profiles);

    if (profiles.length === 0) {
      console.log('⚠️ No profile found for your Clerk user ID');
      console.log('💡 The app should create one automatically on next login');
    } else {
      console.log('✅ Profile found!', profiles[0]);
    }

    // Test profile creation
    console.log('3. Testing profile creation capability...');
    const createTestResponse = await fetch(`${API_URL}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        clerk_user_id: 'test_' + Date.now(),
        email: 'test@example.com',
        name: 'Test User',
        rank: 'Script Kiddie',
        xp: 0,
        subscription_tier: 'Free'
      })
    });

    if (createTestResponse.ok) {
      const testProfile = await createTestResponse.json();
      console.log('✅ Profile creation works!', testProfile);
      
      // Clean up test profile
      const testId = testProfile[0].id;
      await fetch(`${API_URL}/rest/v1/profiles?id=eq.${testId}`, {
        method: 'DELETE',
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      console.log('🧹 Test profile cleaned up');
    } else {
      const error = await createTestResponse.text();
      console.log('❌ Profile creation failed:', error);
    }

  } catch (error) {
    console.error('❌ Debug error:', error);
  }

  console.log('🎯 Next steps:');
  console.log('1. Try logging out and logging back in');
  console.log('2. Check browser console for Clerk authentication logs');
  console.log('3. The app should automatically create your profile on login');
})();

console.log('🚀 Auth debug script loaded. Results above.');
