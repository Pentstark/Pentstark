# Firebase + Supabase Integration

This app now uses a hybrid approach:
- **Firebase**: Authentication (Google, GitHub, Email/Password)
- **Supabase**: Database/Backend (profiles, lab progress, activity logs, etc.)

## How it works:

1. **User Signs In** (Google/GitHub/Email):
   - Firebase handles the authentication
   - User gets a Firebase Auth token

2. **Profile Creation/Update**:
   - When Firebase auth state changes, we automatically:
     - Create a new profile in Supabase `profiles` table (if doesn't exist)
     - Create initial `skill_scores` record
     - Log the activity in `activity_logs`
   - If profile exists, we update it with latest Firebase data

3. **User Data Flow**:
   - Firebase User UID → Supabase profile.id
   - Firebase displayName → Supabase profile.name
   - Firebase email → Supabase profile.email
   - Firebase photoURL → Supabase profile.avatar_url

## Database Schema Required:

### profiles table:
- id (text, matches Firebase UID)
- name (text)
- email (text)
- avatar_url (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)
- bio, country, linkedin_url, github_url, etc.

### skill_scores table:
- user_id (text, foreign key to profiles.id)
- web_score, crypto_score, forensics_score, etc.

### activity_logs table:
- user_id (text, foreign key to profiles.id)
- activity_type (text)
- details (jsonb)
- activity_date (timestamp)

## Authentication Flow:

1. User clicks "Continue with Google"
2. Firebase redirects to Google OAuth
3. Google redirects back with auth result
4. Firebase auth state changes
5. Our code detects auth change
6. Automatically creates/updates Supabase profile
7. User is now authenticated with Firebase + has profile in Supabase

## Benefits:

- Firebase handles OAuth complexity
- Supabase provides powerful database features
- Seamless integration between both services
- User data persisted across sessions
- Real-time database capabilities from Supabase
