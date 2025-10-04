import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/clerk-auth.jsx';
import { supabase } from '@/lib/supabase';
import { pageVariants, sectionVariants, itemVariants } from '@/lib/animations';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Activity, Award, BarChart2, Edit3, Save, Settings, Briefcase, BookOpen, MessageSquare, Zap, Linkedin, ExternalLink, CalendarDays, CheckCircle2, RefreshCw, TrendingUp, Palette, Github } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const rankColors = {
  'Script Kiddie': 'text-gray-400',
  'Noob': 'text-green-400',
  'Hacker': 'text-blue-400',
  'Pro Hacker': 'text-purple-400',
  'Elite Hacker': 'text-yellow-400',
  'Omniscient': 'text-red-500',
  'PentStark': 'text-pink-500'
};

const editFields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your Name" },
  { name: "country", label: "Country", type: "text", placeholder: "Country" },
  { name: "linkedin_url", label: "LinkedIn URL", type: "text", placeholder: "LinkedIn Profile URL" },
  { name: "github_url", label: "GitHub URL", type: "text", placeholder: "GitHub Profile URL" },
  { name: "bio", label: "Bio", type: "textarea", placeholder: "Your Bio" },
  { name: "avatar_url", label: "Avatar URL", type: "text", placeholder: "https://example.com/avatar.png" },
  { name: "email", label: "Email", type: "email", placeholder: "Email Address", disabled: true },
];

const UserProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  // console.log("User from Clerk Auth:", user);
  // Helper to get user properties for Clerk compatibility
  // const getUserId = async () => {
  //   const { data } = await supabase
  //     .from("profiles")
  //     .select("id")
  //     .eq("email", user.emailAddresses[0]?.emailAddress)
  //     .single();
  //   const id = data?.id;
  //   console.log("Getting user ID in getUserID:", id);
  //   return id;
  // };
  const getUserEmail = () => user?.emailAddresses?.[0]?.emailAddress;
  const getUserDisplayName = () => user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : getUserEmail()?.split('@')[0];

  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [labStats, setLabStats] = useState({ completed: 0, total: 0 });
  const [userFlagStats, setUserFlagStats] = useState({ userFlag: 0, rootFlag: 0 }); // <-- NEW
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
    country: '', // Location
    avatar_url: '',
    linkedin_url: '',
    github_url: '',
    email: '',
  });

  const [courseEnrollments, setCourseEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', user.emailAddresses[0]?.emailAddress)
        .single();
      if (profileError && profileError.code !== 'PGRST116') throw profileError;
      if (profileData) {
        setProfile(profileData);
        // console.log(profileData);
        setFormData({
          name: profileData.name || getUserDisplayName() || '',
          bio: profileData.bio || '',
          country: profileData.country || '',
          avatar_url: profileData.avatar_url || user.imageUrl || '',
          linkedin_url: profileData.linkedin_url || '',
          github_url: profileData.github_url || '',
          email: profileData.email || getUserEmail() || '',
        });
      } else {
         const defaultName = getUserDisplayName() || getUserEmail()?.split('@')[0] || 'User';
         setProfile({ id: null, name: defaultName, email: getUserEmail(), rank: 'Script Kiddie', xp: 0, subscription_tier: 'Free' });
         setFormData({
          name: defaultName,
          bio: '',
          country: '',
          avatar_url: user.imageUrl || '',
          linkedin_url: '',
          github_url: '',
          email: getUserEmail() || '',
        });
      }

      // Only proceed with profile-dependent queries if we have a profile
      if (!profileData?.id) {
        console.log('No profile found, skipping profile-dependent queries');
        setLoading(false);
        return;
      }

      // Fetch Subscription
      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', profileData.id)
        .maybeSingle();
      if (subError) {
        console.warn('Subscription fetch error:', subError);
      }
      setSubscription(subData || { plan_name: 'Free', status: 'active' });
      if (profileData && !profileData.subscription_tier && subData?.plan_name) {
        // Backfill profile.subscription_tier if empty and subscription exists
        await supabase.from('profiles').update({ subscription_tier: subData.plan_name }).eq('id', profileData.id);
        if (profile) setProfile(prev => ({...prev, subscription_tier: subData.plan_name}));
      }


      // Fetch ALL Lab Progress for user_flag/root_flag stats (regardless of completed_at)
      const { data: allLabProgressData, error: allLabProgressError } = await supabase
        .from('lab_progress')
        .select('id, user_flag_submitted, root_flag_submitted')
        .eq('user_id', profileData.id);
      if (allLabProgressError) {
        console.warn('Lab progress fetch error:', allLabProgressError);
      }

      // Count correct user_flag and root_flag submissions (from all lab_progress rows)
      const userFlagCount = allLabProgressData?.filter(l => l.user_flag_submitted).length || 0;
      const rootFlagCount = allLabProgressData?.filter(l => l.root_flag_submitted).length || 0;
      setUserFlagStats({ userFlag: userFlagCount, rootFlag: rootFlagCount });

      // Fetch only completed labs for progress bar
      const { data: completedLabsData, error: completedLabsError } = await supabase
        .from('lab_progress')
        .select('id')
        .eq('user_id', profileData.id)
        .not('completed_at', 'is', null);
      if (completedLabsError) {
        console.warn('Completed labs fetch error:', completedLabsError);
      }

      const { data: totalLabsData, error: totalLabsError } = await supabase
        .from('labs')
        .select('id', { count: 'exact' });
      if (totalLabsError) {
        console.warn('Total labs fetch error:', totalLabsError);
      }
      setLabStats({ completed: completedLabsData?.length || 0, total: totalLabsData?.length || 0 });

      // Fetch Academy Enrollments
      const { data: enrollData, error: enrollError } = await supabase
        .from('academy_enrollments')
        .select('*, tracks(name)') // Assuming 'tracks' table has track names
        .eq('user_id', profileData.id);
      if (enrollError) {
        console.warn('Academy enrollments fetch error:', enrollError);
      }
      setAcademyEnrollments(enrollData || []);

      // Fetch Course Enrollments with course info
      const { data: courseEnrollData, error: courseEnrollError } = await supabase
        .from('course_enrollments')
        .select('*, courses(name, description, difficulty, duration_hours)')
        .eq('user_id', profileData.id);
      if (courseEnrollError) {
        console.warn('Course enrollments fetch error:', courseEnrollError);
      }
      setCourseEnrollments(courseEnrollData || []);

      // Fetch All Achievements (for badge definitions)
      const { data: achieveData, error: achieveError } = await supabase.from('achievements').select('*');
      if (achieveError) {
        console.warn('Achievements fetch error:', achieveError);
      }
      setAllAchievements(achieveData || []);

      // Fetch User Badges
      const { data: badgeData, error: badgeError } = await supabase
        .from('user_badges')
        .select('badge_id, achieved_at')
        .eq('user_id', profileData.id);
      if (badgeError) {
        console.warn('User badges fetch error:', badgeError);
      }
      setUserBadges(badgeData || []);
      
      // Fetch Skill Scores
      const { data: skillData, error: skillError } = await supabase
        .from('skill_scores')
        .select('*')
        .eq('user_id', profileData.id)
        .maybeSingle();
      if (skillError) {
        console.warn('Skill scores fetch error:', skillError);
      }
      setSkillScores(skillData);

      // Fetch Activity Logs (last 7 days for weekly graph)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data: activityData, error: activityError } = await supabase
        .from('activity_logs')
        .select('activity_date, activity_type')
        .eq('user_id', profileData.id)
        .gte('activity_date', sevenDaysAgo)
        .order('activity_date', { ascending: true });
      if (activityError) {
        console.warn('Activity logs fetch error:', activityError);
      }
      setActivityLogs(activityData || []);
      
      // Fetch XP Logs
      const { data: xpData, error: xpError } = await supabase
        .from('xp_logs')
        .select('log_date, xp_earned')
        .eq('user_id', profileData.id)
        .order('log_date', { ascending: true });
      if (xpError) {
        console.warn('XP logs fetch error:', xpError);
      }
      setXpLogs(xpData || []);
 
    } catch (error) {
      console.error('Error fetching user profile data:', error);
      toast({ title: "Error", description: `Failed to load profile: ${error.message}`, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user || !profile || !profile.id) return;
    setLoading(true);
    const updates = {
      id: profile.id, // Use the profile's UUID, not Clerk user ID
      name: formData.name,
      bio: formData.bio,
      country: formData.country,
      avatar_url: formData.avatar_url,
      linkedin_url: formData.linkedin_url,
      github_url: formData.github_url,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(updates).eq('id', profile.id);

    if (error) {
      console.error('Error updating profile:', error);
      toast({ title: "Error", description: `Failed to update profile: ${error.message}`, variant: "destructive" });
    } else {
      setProfile(prev => ({ ...prev, ...updates })); // Optimistically update local state
      toast({ title: "Success", description: "Profile updated successfully!", className: "bg-primary text-primary-foreground" });
      setIsEditing(false);
    }
    setLoading(false);
  };
  
  const userRank = profile?.rank || 'Script Kiddie';
  const userXP = profile?.xp || 0;
  const currentRankColor = rankColors[userRank] || 'text-gray-400';
  const subscriptionPlan = subscription?.plan || 'Free';
  const subscriptionStatus = subscription?.status || 'N/A';

  const fallbackName = formData.name ? formData.name.substring(0, 2).toUpperCase() : (getUserEmail() ? getUserEmail().substring(0, 2).toUpperCase() : 'PN');

  const overallProgressPercentage = labStats.total > 0 ? Math.round((labStats.completed / labStats.total) * 100) : 0;

  // --- Activity Log Formatting ---
  // Pagination state for activity logs
  const [activityPage, setActivityPage] = useState(1);
  const daysPerPage = 7;
  // Fetch paginated activity logs
  useEffect(() => {
    if (!user || !profile?.id) return;
    const fetchActivityLogs = async () => {
      setLoading(true);
      // Fetch only the last N days of activity logs
      const sinceDate = new Date(Date.now() - activityPage * daysPerPage * 24 * 60 * 60 * 1000).toISOString();
      const { data: activityData, error: activityError } = await supabase
        .from('activity_logs')
        .select('activity_date, activity_type')
        .eq('user_id', profile.id)
        .gte('activity_date', sinceDate)
        .order('activity_date', { ascending: true });
      if (activityError) {
        console.warn('Paginated activity logs fetch error:', activityError);
      } else {
        setActivityLogs(activityData || []);
      }
      setLoading(false);
    };
    fetchActivityLogs();
  }, [user, profile?.id, activityPage]);

  // Group by date, show activity_type and details
  const formattedActivityData = activityLogs.reduce((acc, log) => {
    const date = new Date(log.activity_date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {});
  // Summarize activity types per day
  const summarizedActivityData = Object.entries(formattedActivityData).map(([date, logs]) => {
    const typeCounts = logs.reduce((counts, log) => {
      counts[log.activity_type] = (counts[log.activity_type] || 0) + 1;
      return counts;
    }, {});
    return {
      date,
      summary: Object.entries(typeCounts).map(([type, count]) => `${type} × ${count}`).join(', '),
      logs,
    };
  });
  // Show all days fetched (no client-side slicing)
  const visibleActivity = summarizedActivityData;

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
    // Accumulate XP over time
    if (acc.length > 1) {
      acc[acc.length - 1].xp += acc[acc.length - 2].xp;
    }
    return acc;
  }, []);
  
  const skillChartData = skillScores ? [
    { subject: 'Web', A: skillScores.web_score || 0, fullMark: 100 },
    { subject: 'Crypto', A: skillScores.crypto_score || 0, fullMark: 100 },
    { subject: 'Forensics', A: skillScores.forensics_score || 0, fullMark: 100 },
    { subject: 'Reversing', A: skillScores.reversing_score || 0, fullMark: 100 },
    { subject: 'Pwn', A: skillScores.pwn_score || 0, fullMark: 100 },
    { subject: 'Network', A: skillScores.network_score || 0, fullMark: 100 },
  ] : [];


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
        {/* <motion.div variants={sectionVariants} initial="initial" animate="animate" className="mb-10 md:mb-12 p-6 md:p-8   rounded-xl card-border-glow-purple flex flex-col md:flex-row items-center gap-6 md:gap-8"> */}
        <motion.div variants={sectionVariants} initial="initial" animate="animate" className="mb-10 md:mb-12 p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <motion.div variants={itemVariants}>
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary shadow-lg">
              <AvatarImage src={formData.avatar_url} alt={formData.name} />
              <AvatarFallback className="text-3xl bg-muted text-muted-foreground">{fallbackName}</AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.div variants={itemVariants} className="flex-grow text-center md:text-left w-full">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {editFields.map(field => (
                  <div key={field.name} className="flex flex-col">
                    <Label htmlFor={field.name} className="font-mono text-muted-foreground">{field.label}</Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="bg-input border-border mt-1 font-mono"
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="bg-input border-border mt-1 font-mono"
                        disabled={field.disabled}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground font-orbitron mb-1">{profile.name}</h1>
                <p className={`font-mono text-lg mb-1 ${currentRankColor}`}>{userRank} - {userXP} XP</p>
                <p className="text-muted-foreground text-sm font-mono mb-1">{profile.country || 'Location not set'}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
                  {profile.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-secondary/80 font-mono flex items-center">
                      <Linkedin className="mr-1.5 h-4 w-4" /> LinkedIn <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                  {profile.github_url && (
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-secondary/80 font-mono flex items-center">
                      <Github className="mr-1.5 h-4 w-4" /> GitHub <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
                <p className="text-muted-foreground text-sm font-mono italic line-clamp-2">{profile.bio || 'No bio yet.'}</p>
              </>
            )}
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-end gap-3 mt-4 md:mt-0 self-start md:self-auto w-full">
            {isEditing ? (
              <Button onClick={handleSaveProfile} disabled={loading} className="font-mono w-full md:w-auto bg-primary hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" /> Save Profile
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="font-mono w-full md:w-auto border-primary text-primary hover:bg-primary/10">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            )}
          </motion.div>
        </motion.div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 bg-card/0 p-1 rounded-lg mb-3 lg:mb-10 font-mono h-fit">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Dashboard</TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Progress</TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Badges</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Activity</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <motion.section variants={sectionVariants} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="p-6   rounded-lg card-border-glow-purple">
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-orbitron flex items-center">
                    <Shield className="mr-2 text-primary"/>Subscription
                  </h3>
                  <div className="text-muted-foreground font-mono">
                    <div>Plan: <span className="text-secondary font-bold">{subscriptionPlan}</span></div>
                    <div>
                      Status:{" "}
                      <span className={`font-bold ${subscriptionStatus.toLowerCase() === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                        {subscriptionStatus}
                      </span>
                    </div>
                    {subscription?.start_date && (
                      <div>
                        Start: <span className="font-mono">{new Date(subscription.start_date).toLocaleDateString()}</span>
                      </div>
                    )}
                    {subscription?.end_date && (
                      <div>
                        End: <span className="font-mono">{new Date(subscription.end_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  {subscriptionPlan === 'Free' && (
                    <Button size="sm" className="mt-3 w-full font-mono bg-secondary hover:bg-secondary/90">
                      Upgrade to Pro
                    </Button>
                  )}
                  {subscriptionStatus.toLowerCase() === 'expired' && (
                    <Button size="sm" className="mt-3 w-full font-mono bg-yellow-500 hover:bg-yellow-600 text-black">
                      Renew Subscription
                    </Button>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="p-6   rounded-lg card-border-glow-purple">
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-orbitron flex items-center"><TrendingUp className="mr-2 text-primary"/>Overall Stats</h3>
                   <p className="text-muted-foreground font-mono">Rank: <span className={`font-bold ${currentRankColor}`}>{userRank}</span></p>
                   <p className="text-muted-foreground font-mono">XP: <span className="text-secondary font-bold">{userXP}</span></p>
                   <p className="text-muted-foreground font-mono mt-1">Labs Completed: <span className="text-secondary font-bold">{labStats.completed} / {labStats.total}</span></p>
                   <p className="text-muted-foreground font-mono mt-1">
                     User Flags: <span className="text-green-400 font-bold">{userFlagStats.userFlag}</span> &nbsp;|&nbsp;
                     Root Flags: <span className="text-purple-400 font-bold">{userFlagStats.rootFlag}</span>
                   </p>
                   <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${overallProgressPercentage}%` }}></div>
                  </div>
                  <p className="text-xs text-right text-primary font-mono mt-1">{overallProgressPercentage}% Complete</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="p-6   rounded-lg card-border-glow-purple">
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-orbitron flex items-center"><Palette className="mr-2 text-primary"/>Skill Overview</h3>
                  {skillScores ? (
                    <ul className="text-sm text-muted-foreground font-mono space-y-1">
                        <li>Web: <span className="text-secondary">{skillScores.web_score || 0}%</span></li>
                        <li>Crypto: <span className="text-secondary">{skillScores.crypto_score || 0}%</span></li>
                        <li>Forensics: <span className="text-secondary">{skillScores.forensics_score || 0}%</span></li>
                    </ul>
                  ) : <p className="text-muted-foreground font-mono text-sm">Skill scores not available.</p> }
                  <Button variant="link" size="sm" className="px-0 mt-2 text-primary">View Full Skill Wheel</Button>
                </motion.div>
            </motion.section>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <motion.section variants={sectionVariants} initial="initial" animate="animate" className="p-6   rounded-lg card-border-glow-purple">
              <h3 className="text-xl font-semibold text-foreground mb-4 font-orbitron flex items-center"><BookOpen className="mr-2 text-primary"/>Academy Enrollments</h3>
              {academyEnrollments.length > 0 ? (
                <ul className="space-y-3">
                  {academyEnrollments.map(enrollment => (
                    <li key={enrollment.id || `${enrollment.track_id}-${enrollment.user_id}`} className="font-mono text-sm text-muted-foreground">
                      <span className="text-foreground font-semibold">{enrollment.tracks?.name || 'Unknown Track'}</span>: {enrollment.progress_percentage}% complete
                      {enrollment.completed_at && <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-500" />}
                      <span className="ml-2 text-xs">
                        {enrollment.completed_at
                          ? <span className="text-green-500">Completed</span>
                          : enrollment.progress_percentage === 0
                            ? <span className="text-yellow-400">Not Started</span>
                            : <span className="text-blue-400">In Progress</span>
                        }
                      </span>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${enrollment.progress_percentage}%` }}></div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-muted-foreground font-mono">Not enrolled in any academy tracks yet.</p>}
            </motion.section>
            <motion.section variants={sectionVariants} initial="initial" animate="animate" className="p-6   rounded-lg card-border-glow-purple">
              <h3 className="text-xl font-semibold text-foreground mb-4 font-orbitron flex items-center"><BookOpen className="mr-2 text-primary"/>Course Enrollments</h3>
              {courseEnrollments.length > 0 ? (
                <ul className="space-y-3">
                  {courseEnrollments.map(enrollment => (
                    <li key={enrollment.id || `${enrollment.course_id}-${enrollment.user_id}`} className="font-mono text-sm text-muted-foreground">
                      <span className="text-foreground font-semibold">{enrollment.courses?.name || 'Unknown Course'}</span>
                      <span className="ml-2 text-xs">
                        {enrollment.completed_at
                          ? <span className="text-green-500">Completed</span>
                          : enrollment.progress_percentage === 0
                            ? <span className="text-yellow-400">Not Started</span>
                            : <span className="text-blue-400">In Progress</span>
                        }
                      </span>
                      <span className="ml-2 text-xs">({enrollment.progress_percentage}% complete)</span>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${enrollment.progress_percentage}%` }}></div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-muted-foreground font-mono">No course enrollments yet.</p>}
            </motion.section>
          </TabsContent>

          <TabsContent value="badges" className="p-6   rounded-lg card-border-glow-purple">
            <h3 className="text-xl font-semibold text-foreground mb-4 font-orbitron flex items-center"><Award className="mr-2 text-primary"/>Badges & Achievements</h3>
            {userBadges.length > 0 && allAchievements.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {userBadges.map(userBadge => {
                  const achievement = allAchievements.find(a => a.id === userBadge.badge_id);
                  if (!achievement) return null;
                  return (
                    <div key={achievement.id} title={`${achievement.name}: ${achievement.description}\nAchieved: ${new Date(userBadge.achieved_at).toLocaleDateString()}`} className="text-center p-3 bg-card/70 rounded-md border border-border w-28 hover:border-secondary/50 transition-colors cursor-help">
                      <Zap size={32} className="mx-auto text-yellow-400 mb-1.5"/> {/* Generic Icon, use achievement.icon_url if available */}
                      <p className="text-xs font-mono text-muted-foreground truncate">{achievement.name}</p>
                    </div>
                  );
                })}
              </div>
            ) : <p className="text-muted-foreground font-mono">No badges earned yet. Keep hacking!</p>}
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <motion.section variants={sectionVariants} initial="initial" animate="animate" className="p-6   rounded-lg card-border-glow-purple">
              <h3 className="text-xl font-semibold text-foreground mb-4 font-orbitron flex items-center"><CalendarDays className="mr-2 text-primary"/>Activity Log</h3>
              {summarizedActivityData.length > 0 ? (
                <div className="overflow-x-auto">
                  <div className="flex flex-row gap-4 pb-2 min-w-[600px]">
                    {[...visibleActivity].reverse().map(day => (
                      <div key={day.date} className="min-w-[260px] max-w-xs flex-shrink-0 bg-card/70 rounded-lg p-4 border border-border shadow-md flex flex-col justify-between">
                        <div className="font-mono text-xs text-primary mb-2">{day.date}</div>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground font-mono">
                          {Object.entries(day.logs.reduce((counts, log) => {
                            counts[log.activity_type] = (counts[log.activity_type] || 0) + 1;
                            return counts;
                          }, {})).map(([type, count]) => (
                            <span key={type}>{type} × {count}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : <p className="text-muted-foreground font-mono">No activity logged yet.</p>}
            </motion.section>

            <motion.section variants={sectionVariants} initial="initial" animate="animate" className="p-6   rounded-lg card-border-glow-purple">
                <h3 className="text-xl font-semibold text-foreground mb-4 font-orbitron flex items-center"><BarChart2 className="mr-2 text-primary"/>XP Progression</h3>
                {formattedXpData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={formattedXpData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} itemStyle={{ color: 'hsl(var(--foreground))' }} labelStyle={{ color: 'hsl(var(--primary))' }}/>
                            <Legend wrapperStyle={{fontSize: "12px"}}/>
                            <Line type="monotone" dataKey="xp" stroke="hsl(var(--secondary))" strokeWidth={2} name="Total XP" dot={{ r: 4, fill: 'hsl(var(--secondary))' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : <p className="text-muted-foreground font-mono">No XP logged yet. Complete some labs!</p>}
            </motion.section>
          </TabsContent>
          
          <TabsContent value="settings" className="p-6   rounded-lg card-border-glow-purple space-y-6">
            <h3 className="text-xl font-semibold text-foreground font-orbitron">Account Settings</h3>
            <div className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editFields.map(field => (
                  <div key={field.name} className="flex flex-col">
                    <Label htmlFor={field.name} className="font-mono text-muted-foreground">{field.label}</Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="bg-input border-border mt-1 font-mono"
                        rows={3}
                        disabled={field.disabled || !isEditing}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="bg-input border-border mt-1 font-mono"
                        disabled={field.disabled || !isEditing}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    className="font-mono border-primary text-primary hover:bg-primary/10"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Details
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="font-mono border-primary text-primary hover:bg-primary/10"
                    onClick={handleSaveProfile}
                    disabled={loading}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Settings
                  </Button>
                )}
                <Button variant="outline" className="font-mono border-destructive text-destructive hover:bg-destructive/10" disabled={isEditing}>Change Password</Button>
                {/* <Button variant="destructive" className="font-mono" disabled={isEditing}>Delete Account</Button> */}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default UserProfilePage;
