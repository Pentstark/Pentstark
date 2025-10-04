import React, { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { supabase } from './supabase.js';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  // Function to sync Clerk user to Supabase
  const syncToSupabase = async (clerkUser, isNewUser = false) => {
    if (!clerkUser) {
      console.log('❌ No user provided to sync');
      return;
    }

    try {
      // console.log("🔄 Starting Supabase sync for user:", clerkUser.emailAddresses[0]?.emailAddress);
      // console.log("🔍 User details:", {
      //   id: clerkUser.id,
      //   email: clerkUser.emailAddresses[0]?.emailAddress,
      //   fullName: clerkUser.fullName,
      //   firstName: clerkUser.firstName,
      //   lastName: clerkUser.lastName,
      //   imageUrl: clerkUser.imageUrl
      // });
      
      // Get the user's display name
      const displayName = clerkUser.fullName || 
                         (clerkUser.firstName && clerkUser.lastName ? `${clerkUser.firstName} ${clerkUser.lastName}` : null) ||
                         clerkUser.firstName ||
                         clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] ||
                         'User';

      // console.log("📝 Prepared display name:", displayName);

      // 1. Test Supabase connection first
      // console.log("🔌 Testing Supabase connection...");
      const { data: connectionTest, error: connectionError } = await supabase
        .from("profiles")
        .select("count")
        .limit(1);

      if (connectionError) {
        console.error("❌ Supabase connection failed:", connectionError);
        throw new Error(`Supabase connection failed: ${connectionError.message}`);
      } else {
        // console.log("✅ Supabase connection successful");
      }
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      // console.log("🔍 Checking if profile exists for Clerk ID:", clerkUser.id);
      // console.log("🔍 Checking if profile exists for email:", email);
      const { data: existingProfile, error: checkError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error("❌ Error checking existing profile:", checkError);
        throw checkError;
      }

      if (existingProfile) {
        // console.log("✅ Profile already exists:", existingProfile);
        // Update the profile with latest Clerk data
        const { data: updatedProfile, error: updateError } = await supabase
          .from("profiles")
          .update({
            clerk_user_id: clerkUser.id,
            updated_at: new Date().toISOString(),
          })
          .eq("email", email)
          .select()
          .single();
        // console.log("🔄 Updated profile data:", updatedProfile);

        if (updateError) {
          console.error("❌ Profile update error:", updateError);
        } else {
          user.supabase_id = updatedProfile.id;
          user.name = updatedProfile.name;
        // console.log("User when existing a profile", user);
          // console.log("✅ Profile updated with latest Clerk data");
        }
        
        return existingProfile;
      }

      // console.log("🆕 Creating new profile...");

      const profileData = {
        clerk_user_id: clerkUser.id, // Store Clerk ID for mapping
        email: clerkUser.emailAddresses[0]?.emailAddress,
        name: displayName,
        avatar_url: clerkUser.imageUrl,
        rank: 'Script Kiddie', // Default rank for new users
        xp: 0, // Starting XP
        subscription_tier: 'Free', // Default subscription
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // console.log("📋 Profile data to insert:", profileData);

      const { data: newProfile, error: profileError } = await supabase
        .from("profiles")
        .insert(profileData)
        .select()
        .single();

      if (profileError) {
        console.error("❌ Profile creation error:", profileError);
        throw profileError;
      } else {
        user.supabase_id = newProfile.id;
        user.name = newProfile.name;
        // console.log("User when creating a profile", user);
        // console.log("✅ Profile created successfully:", newProfile);
      }

      // 3. Initialize skill scores for new users using the generated UUID
      // console.log("🎯 Creating skill scores...");
      const { data: existingScores } = await supabase
        .from("skill_scores")
        .select("*")
        .eq("user_id", newProfile.id) // Use the generated UUID
        .single();

      if (!existingScores) {
        const { error: skillError } = await supabase
          .from("skill_scores")
          .insert({
            user_id: newProfile.id, // Use the generated UUID
            web_score: 0,
            crypto_score: 0,
            forensics_score: 0,
            reversing_score: 0,
            pwn_score: 0,
            network_score: 0,
            updated_at: new Date().toISOString(),
          });

        if (skillError) {
          console.error("❌ Skill scores creation error:", skillError);
        } else {
          // console.log("✅ Skill Scores Created for new user");
        }
      } else {
        // console.log("ℹ️ Skill scores already exist");
      }

      // 4. Create initial subscription record for new users using the generated UUID
      // console.log("💳 Creating subscription...");
      const { data: existingSubscription } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", newProfile.id) // Use the generated UUID
        .single();

      if (!existingSubscription) {
        const { error: subError } = await supabase
          .from("subscriptions")
          .insert({
            user_id: newProfile.id, // Use the generated UUID
            plan: 'Free',
            status: 'active',
            created_at: new Date().toISOString(),
          });

        if (subError) {
          console.error("❌ Subscription creation error:", subError);
        } else {
          // console.log("✅ Subscription Created for new user");
        }
      } else {
        // console.log("ℹ️ Subscription already exists");
      }

      // 5. Log activity using the generated UUID
      // console.log("📝 Logging activity...");
      const { error: activityError } = await supabase
        .from("activity_logs")
        .insert({
          user_id: newProfile.id, // Use the generated UUID
          activity_type: "profile_created",
          details: { 
            email: clerkUser.emailAddresses[0]?.emailAddress,
            provider: 'clerk',
            profile_id: newProfile.id
          },
          activity_date: new Date().toISOString(),
        });

      if (activityError) {
        console.error("❌ Activity logging error:", activityError);
      } else {
        // console.log("✅ Activity logged successfully");
      }

      return newProfile;

    } catch (error) {
      console.error("❌ Supabase Sync Error:", error);
      throw error;
    }
  };

  // Manual sync function for troubleshooting
  const manualSync = async () => {
    if (user) {
      // console.log("🔧 Manual sync triggered for user:", user.id);
      return await syncToSupabase(user);
    } else {
      console.log("❌ No user available for manual sync");
    }
  };

  // Sync user to Supabase when they sign in
  React.useEffect(() => {
    if (!isLoaded) return; // wait for Clerk
    if (!isSignedIn || !user) return;
    try {
      syncToSupabase(user);
    } catch (e) {
      console.error('Auth sync error:', e);
    }
  }, [isLoaded, isSignedIn, user]);

  const logout = async () => {
    try {
      await signOut();
      console.log("✅ Logged out successfully");
    } catch (error) {
      console.error("❌ Logout error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading: !isLoaded,
    isAuthenticated: isSignedIn,
    logout,
    manualSync, // Add manual sync function
    syncToSupabase, // Expose sync function
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
