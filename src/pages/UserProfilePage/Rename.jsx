import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/clerk-auth.jsx';
import { supabase } from '@/lib/supabase';
import { pageVariants, sectionVariants } from '@/lib/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

import ProfileHeader from './components/ProfileHeader';
import DashboardTab from './components/DashboardTab';
import ProgressTab from './components/ProgressTab';
import BadgesTab from './components/BadgesTab';
import ActivityTab from './components/ActivityTab';
import SettingsTab from './components/SettingsTab';

const UserProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [labStats, setLabStats] = useState({ completed: 0, total: 0 });
  const [academyEnrollments, setAcademyEnrollments] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [allAchievements, setAllAchievements] = useState([]);
  const [skillScores, setSkillScores] = useState(null);
  
  const [activityLogs, setActivityLogs] = useState([]);
  const [xpLogs, setXpLogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    country: '',
    avatar_url: '',
    linkedin_url: '',
  });

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      
      if (profileData) {
        setProfile(profileData);
        setFormData({
          name: profileData.name || user.user_metadata?.name || '',
          bio: profileData.bio || '',
          country: profileData.country || '',
          avatar_url: profileData.avatar_url || user.user_metadata?.avatar_url || '',
          linkedin_url: profileData.linkedin_url || '',
        });
      } else {
         const defaultName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
         const newProfile = { id: user.id, name: defaultName, email: user.email, rank: 'Script Kiddie', xp: 0, subscription_tier: 'Free', bio: '', country: '', avatar_url: user.user_metadata?.avatar_url || '', linkedin_url: '' };
         setProfile(newProfile);
         setFormData({ name: newProfile.name, bio: newProfile.bio, country: newProfile.country, avatar_url: newProfile.avatar_url, linkedin_url: newProfile.linkedin_url });
      }

      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (subError && subError.code !== 'PGRST116') throw subError;
      setSubscription(subData || { plan_name: 'Free', status: 'active' });
      
      if (profileData && !profileData.subscription_tier && subData?.plan_name) {
        await supabase.from('profiles').update({ subscription_tier: subData.plan_name }).eq('id', user.id);
        if (profile) setProfile(prev => ({...prev, subscription_tier: subData.plan_name}));
      }

      const { data: completedLabsData, error: completedLabsError } = await supabase
        .from('lab_progress')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id)
        .not('completed_at', 'is', null);
      if (completedLabsError) throw completedLabsError;
      
      const { data: totalLabsData, error: totalLabsError } = await supabase
        .from('labs')
        .select('id', { count: 'exact' });
      if (totalLabsError) throw totalLabsError;
      setLabStats({ completed: completedLabsData?.count || 0, total: totalLabsData?.count || 0 });

      const { data: enrollData, error: enrollError } = await supabase
        .from('academy_enrollments')
        .select('*, tracks(name)')
        .eq('user_id', user.id);
      if (enrollError) throw enrollError;
      setAcademyEnrollments(enrollData || []);

      const { data: achieveData, error: achieveError } = await supabase.from('achievements').select('*');
      if (achieveError) throw achieveError;
      setAllAchievements(achieveData || []);

      const { data: badgeData, error: badgeError } = await supabase
        .from('user_badges')
        .select('badge_id, achieved_at')
        .eq('user_id', user.id);
      if (badgeError) throw badgeError;
      setUserBadges(badgeData || []);
      
      const { data: skillData, error: skillError } = await supabase
        .from('skill_scores')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (skillError && skillError.code !== 'PGRST116') throw skillError;
      setSkillScores(skillData);

      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: activityData, error: activityError } = await supabase
        .from('activity_logs')
        .select('activity_date, activity_type')
        .eq('user_id', user.id)
        .gte('activity_date', sevenDaysAgo)
        .order('activity_date', { ascending: true });
      if (activityError) throw activityError;
      setActivityLogs(activityData || []);
      
      const { data: xpData, error: xpError } = await supabase
        .from('xp_logs')
        .select('log_date, xp_earned')
        .eq('user_id', user.id)
        .order('log_date', { ascending: true });
      if (xpError) throw xpError;
      setXpLogs(xpData || []);

    } catch (error) {
      console.error('Error fetching user profile data:', error);
      toast({ title: "Error", description: `Failed to load profile: ${error.message}`, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [user, toast, profile]); // Added profile to dependency array for the subscription_tier update logic

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Removed user from here as it's in fetchData's deps

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    setLoading(true);
    const updates = {
      id: user.id,
      name: formData.name,
      bio: formData.bio,
      country: formData.country,
      avatar_url: formData.avatar_url,
      linkedin_url: formData.linkedin_url,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(updates).eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      toast({ title: "Error", description: `Failed to update profile: ${error.message}`, variant: "destructive" });
    } else {
      setProfile(prev => ({ ...prev, ...updates }));
      toast({ title: "Success", description: "Profile updated successfully!", className: "bg-primary text-primary-foreground" });
      setIsEditing(false);
    }
    setLoading(false);
  };
  
  const formattedActivityData = activityLogs.reduce((acc, log) => {
    const date = new Date(log.activity_date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { date, count: 0 };
    }
    acc[date].count += 1;
    return acc;
  }, {});
  const weeklyActivityChartData = Object.values(formattedActivityData);

  const formattedXpData = xpLogs.map(log => ({
    date: new Date(log.log_date).toLocaleDateString(),
    xp: log.xp_earned,
  })).reduce((acc, curr) => {
    const existing = acc.find(item => item.date === curr.date);
    if (existing) {
      existing.xp += curr.xp;
    } else {
      acc.push(curr);
    }
    if (acc.length > 1) {
      acc[acc.length - 1].xp += acc[acc.length - 2].xp;
    }
    return acc;
  }, []);

  if (loading && !profile) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  if (!user || !profile) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground font-mono">User data not available. Please try logging in again.</div>;
  }
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={sectionVariants} initial="initial" animate="animate">
          <ProfileHeader
            profile={profile}
            user={user}
            isEditing={isEditing}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSaveProfile={handleSaveProfile}
            setIsEditing={setIsEditing}
            loading={loading}
          />
        </motion.div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 bg-card/50 p-1 rounded-lg border border-border mb-6 font-mono">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Dashboard</TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Progress</TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Badges</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Activity</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardTab
              subscription={subscription}
              profile={profile}
              labStats={labStats}
              skillScores={skillScores}
            />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressTab academyEnrollments={academyEnrollments} />
          </TabsContent>

          <TabsContent value="badges">
            <BadgesTab userBadges={userBadges} allAchievements={allAchievements} />
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <ActivityTab weeklyActivityChartData={weeklyActivityChartData} formattedXpData={formattedXpData} />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsTab
              user={user}
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSaveProfile={handleSaveProfile}
              setIsEditing={setIsEditing}
            />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default UserProfilePage;