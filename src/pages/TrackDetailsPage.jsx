import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, ShieldCheck, CheckCircle, List, Zap, BarChart2, Star } from 'lucide-react';
import { pageVariants, itemVariants, sectionVariants, cardHoverVariants } from '@/lib/animations'; // <-- add cardHoverVariants
import NotFoundPage from '@/pages/NotFoundPage';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase"; // <-- match LabsPage import
import { useAuth } from "@/lib/clerk-auth.jsx"; // replace useUser import
import { Checkbox } from "@/components/ui/checkbox"; // You need a Checkbox component

const getDifficultyColor = (difficulty) => {
  if (difficulty === 'Easy' || difficulty === 'Beginner') return 'text-green-400 border-green-500/30 bg-green-500/10';
  if (difficulty === 'Medium' || difficulty === 'Intermediate') return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
  if (difficulty === 'Hard' || difficulty === 'Advanced') return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
  if (difficulty === 'Insane' || difficulty === 'Expert') return 'text-red-400 border-red-500/30 bg-red-500/10';
  return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
};

const TrackDetailsPage = () => {
  const { trackId } = useParams();
  const { user } = useAuth(); // use useAuth instead of useUser
  const [track, setTrack] = useState(null);
  const [modules, setModules] = useState([]);
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const { toast } = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [moduleProgress, setModuleProgress] = useState({}); // { [moduleId]: boolean }
  const getUserId = async () => {
    if (!user) return null;

    const { data: profileData } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single();

    return profileData?.id || null;
  };

  // Track Clerk readiness
  useEffect(() => {
    if (user !== undefined) {
      setUserLoading(false);
    }
  }, [user]);
  useEffect(() => {
    const fetchTrackData = async () => {
      setLoading(true);

      // 1. Fetch track details
      const { data: trackData, error: trackError } = await supabase
        .from('tracks')
        .select('*')
        .eq('id', trackId)
        .single();

      if (trackError || !trackData) {
        setTrack(null);
        setLoading(false);
        return;
      }
      setTrack(trackData);

      // 2. Fetch modules for this track (ordered)
      const { data: moduleLinks } = await supabase
        .from('track_modules')
        .select('module_id, order_index, modules!inner(name, description)')
        .eq('track_id', trackId)
        .order('order_index', { ascending: true });

      setModules(
        (moduleLinks || []).map(link => ({
          id: link.module_id,
          name: link.modules?.name,
          description: link.modules?.description,
        }))
      );

      // 3. Fetch labs for this track (ordered)
      const { data: labLinks } = await supabase
        .from('track_labs')
        .select('lab_id, order_index, labs!inner(name)')
        .eq('track_id', trackId)
        .order('order_index', { ascending: true });

      setLabs(
        (labLinks || []).map(link => ({
          id: link.lab_id,
          name: link.labs?.name,
        }))
      );

      setLoading(false);
    };

    fetchTrackData();
  }, [trackId]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setIsEnrolled(false);
        setProgress(0);
        setModuleProgress({});
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('clerk_user_id', user.id)
        .single();

      if (!profileData) return;

      // 4. Fetch enrollment/progress for this user
      const { data: enrollment } = await supabase
        .from('academy_enrollments')
        .select('id, progress_percentage')
        .eq('user_id', profileData.id)
        .eq('track_id', trackId)
        .single();

      setIsEnrolled(!!enrollment);
      setProgress(enrollment?.progress_percentage || 0);

      // 5. Fetch module progress for this track/user
      const { data: progressRows } = await supabase
        .from('track_module_progress')
        .select('module_id, is_completed')
        .eq('user_id', profileData.id)
        .eq('track_id', trackId);

      const progressMap = {};
      (progressRows || []).forEach(row => {
        progressMap[row.module_id] = row.is_completed;
      });
      setModuleProgress(progressMap);
    };

    if (!userLoading) {
      fetchUserData();
    }
  }, [user, userLoading, trackId]);

  // Handle module checkbox toggle
  const handleModuleToggle = async (moduleId, checked) => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single();

    if (!profileData) return;

    setLoading(true);
    // Upsert progress row for this module/user/track
    const { error } = await supabase
      .from('track_module_progress')
      .upsert({
        user_id: profileData.id,
        track_id: trackId,
        module_id: moduleId,
        is_completed: checked,
        completed_at: checked ? new Date().toISOString() : null,
      }, { onConflict: 'user_id,track_id,module_id' });

    if (!error) {
      // Update local state
      setModuleProgress(prev => ({ ...prev, [moduleId]: checked }));

      // Recalculate progress percentage
      const total = modules.length;
      const completed = Object.values({ ...moduleProgress, [moduleId]: checked }).filter(Boolean).length;
      const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

      setProgress(newProgress);

      // Update progress in academy_enrollments
      await supabase
        .from('academy_enrollments')
        .update({ progress_percentage: newProgress })
        .eq('user_id', profileData.id)
        .eq('track_id', trackId);
    }
    setLoading(false);
  };

  // Handle enroll (cannot unenroll after)
  const handleEnroll = async () => {
    if (!user) {
      toast({ title: "Please log in to enroll.", className: "bg-destructive text-destructive-foreground" });
      return;
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single();

    if (!profileData) {
      toast({ title: "Profile Error", description: "Unable to find your profile. Please try again.", variant: "destructive" });
      return;
    }

    setLoading(true);

    // Insert enrollment
    const { error: enrollError } = await supabase
      .from('academy_enrollments')
      .insert([{ user_id: profileData.id, track_id: trackId, progress_percentage: 0 }]);

    // Log activity
    await supabase
      .from('activity_logs')
      .insert([{
        user_id: profileData.id,
        activity_type: 'enroll_track',
        details: { track_id: trackId, track_name: track?.name },
      }]);

    if (!enrollError) {
      setIsEnrolled(true);
      setProgress(0);
      toast({
        title: "Enrolled in Track!",
        description: `You have enrolled in ${track.name}.`,
        className: "font-mono bg-primary text-primary-foreground",
      });
    }
    setLoading(false);
  };

  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!track) {
    return <NotFoundPage message="Track not found. It might be under development or you mistyped the ID." />;
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]"
    >
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="mb-8">
          <Link to="/tracks" className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors font-mono">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Tracks
          </Link>
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="glass-effect-blue rounded-xl overflow-hidden shadow-2xl shadow-secondary/10"
        >
          <div className="p-6 md:p-8 bg-card/60 border-b border-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <img src={`https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100`} alt={`${track.name} track icon`} className="w-12 h-12 rounded-lg border-2 border-secondary/50" />
                  <h1 className="text-3xl md:text-4xl font-bold text-glow-blue font-orbitron">{track.name}</h1>
                </div>
                <p className="text-muted-foreground font-mono text-sm">{track.category}</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                 <span className={`px-4 py-1.5 text-sm font-semibold rounded-md border ${getDifficultyColor(track.difficulty)}`}>
                    {track.difficulty}
                 </span>
                <div className="flex items-center text-sm text-muted-foreground font-mono">
                  <BookOpen className="w-4 h-4 mr-1.5 text-primary" /> {labs.length} Labs
                  <span className="mx-1.5">·</span> 
                  <Clock className="w-4 h-4 mr-1.5 text-primary" /> Approx. {track.duration_hours} Hours
                </div>
              </div>
            </div>
             {/* You can add tags if you have them in your schema */}
          </div>
          
          <div className="p-6 md:p-8 space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center font-orbitron"><Zap className="text-secondary mr-3 w-6 h-6"/>Track Overview</h2>
              <p className="text-muted-foreground leading-relaxed font-mono">{track.description}</p>
            </motion.div>

            {isEnrolled && (
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-foreground mb-2 font-orbitron">Your Progress</h3>
                <div className="w-full bg-muted rounded-full h-2.5 mb-1">
                  <div className="bg-secondary h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-muted-foreground font-mono text-right">{progress}% Complete</p>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-foreground mb-3 font-orbitron"><List className="text-primary inline mr-2 w-5 h-5"/>Modules in this Track</h3>
              <ul className="space-y-2 font-mono">
                {modules.length > 0 ? modules.map((mod) => (
                  <li key={mod.id} className="flex items-center p-3 bg-card/50 rounded-md border border-border text-muted-foreground">
                    {isEnrolled ? (
                      <Checkbox
                        checked={!!moduleProgress[mod.id]}
                        onCheckedChange={checked => handleModuleToggle(mod.id, checked)}
                        className="mr-3"
                        disabled={loading}
                      />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    )}
                    {mod.name}
                  </li>
                )) : <p className="text-muted-foreground">Module list coming soon.</p>}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-foreground mb-3 font-orbitron"><ShieldCheck className="text-primary inline mr-2 w-5 h-5"/>Labs Included</h3>
              <ul className="space-y-2 font-mono">
                {labs.length > 0 ? labs.map((lab) => (
                  <li key={lab.id} className="flex items-center p-3 bg-card/50 rounded-md border border-border text-muted-foreground">
                    <BarChart2 className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    {lab.name} (Details for individual labs can be found in the Labs section)
                  </li>
                )) : <p className="text-muted-foreground">Specific labs for this track will be listed soon.</p>}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              {!isEnrolled ? (
                <Button 
                  onClick={handleEnroll}
                  className="w-full md:w-auto font-mono text-lg py-3 px-8 button-3d-hover-blue bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  disabled={loading}
                >
                  Enroll in this Track
                </Button>
              ) : (
                <Button 
                  className="w-full md:w-auto font-mono text-lg py-3 px-8 bg-gray-400 text-white cursor-not-allowed"
                  disabled
                >
                  Enrolled
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TrackDetailsPage;
