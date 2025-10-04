import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Shield, Terminal, Users, Star, ListChecks, Download, Info, MessageSquare, Flag, Wifi, WifiOff, Check, CheckCircle2 } from 'lucide-react';
import { pageVariants, itemVariants, sectionVariants } from '@/lib/animations';
import NotFoundPage from '@/pages/NotFoundPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/clerk-auth.jsx";

const LabDetailsPage = () => {
  const { labId } = useParams();
  const [lab, setLab] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("");
  const [userFlag, setUserFlag] = useState("");
  const [rootFlag, setRootFlag] = useState("");
  const [userFlagSubmitted, setUserFlagSubmitted] = useState(false);
  const [rootFlagSubmitted, setRootFlagSubmitted] = useState(false);
  const { user } = useAuth();

  // Track if lab is started for this user
  const [labProgress, setLabProgress] = useState(null);

  // Track Clerk readiness
  useEffect(() => {
    if (user !== undefined) {
      setUserLoading(false);
    }
  }, [user]);

  // Fetch lab progress for this user - only when Clerk is ready
  useEffect(() => {
    const fetchLabProgress = async () => {
      if (!user || !labId) return;
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('clerk_user_id', user.id)
        .single();

      if (!profileData) return;

      const { data, error } = await supabase
        .from('lab_progress')
        .select('*')
        .eq('user_id', profileData.id)
        .eq('lab_id', labId)
        .single();
      if (data) {
        setLabProgress(data);
        setUserFlagSubmitted(data.user_flag_submitted);
        setRootFlagSubmitted(data.root_flag_submitted);
      }
    };

    if (!userLoading) {
      fetchLabProgress();
    }
  }, [user, userLoading, labId]);

  useEffect(() => {
    const fetchLabData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('labs')
        .select('*')
        .eq('id', labId)
        .single();
      // get the user-owns and root-owns counts from the database
      let userOwns = 0;
      let rootOwns = 0;
      if (data) {
        const { data: userOwnsData, error: userOwnsError } = await supabase
          .from('lab_progress')
          .select('*')
          .eq('lab_id', labId)
        console.log("User Owns Data:", userOwnsData);
        const { count: userOwnsCount } = await supabase
          .from('lab_progress')
          .select('id', { count: 'exact', head: true })
          .eq('lab_id', labId)
          .eq('user_flag_submitted', true);
        const { count: rootOwnsCount } = await supabase
          .from('lab_progress')
          .select('id', { count: 'exact', head: true })
          .eq('lab_id', labId)
          .eq('root_flag_submitted', true);
        userOwns = userOwnsCount || 0;
        rootOwns = rootOwnsCount || 0;
      }
      if (error || !data) {
        setLab(null);
        setCreator(null);
      } else {
        setLab({ ...data, userOwns, rootOwns });
        console.log("Lab Data:", lab);
        // Fetch creator profile if creator_id exists
        if (data.creator_id) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, name, avatar_url, country')
            .eq('id', data.creator_id)
            .single();
          setCreator(profile || null);
        } else {
          setCreator(null);
        }
      }
      setLoading(false);
    };

    fetchLabData();
  }, [labId]);


  const handleConnectVPN = () => {
    if (!lab) return;
    if (isConnected) {
      setIsConnected(false);
      toast({
        title: "VPN Disconnected",
        description: `You have disconnected from ${lab.name} network.`,
        variant: "destructive",
        className: "font-mono bg-destructive text-destructive-foreground",
      });
      return;
    }

    setIsConnecting(true);
    setShowConnectionModal(true);
    setConnectionStatus("Initializing connection to PentStark Network...");

    const steps = [
      { status: "Authenticating credentials...", delay: 1500 },
      { status: "Establishing secure tunnel...", delay: 2000 },
      { status: `Connected to ${lab.name} (${lab.ip})!`, delay: 1000 },
    ];

    let currentStep = 0;
    const processNextStep = () => {
      if (currentStep < steps.length) {
        setTimeout(() => {
          setConnectionStatus(steps[currentStep].status);
          currentStep++;
          processNextStep();
        }, steps[currentStep].delay);
      } else {
        setIsConnecting(false);
        setIsConnected(true);
        setShowConnectionModal(false);
        toast({
          title: "VPN Connected!",
          description: `Successfully connected to ${lab.name} network. Happy hacking!`,
          className: "font-mono bg-primary text-primary-foreground",
        });
      }
    };
    processNextStep();
  };

  // Only allow flag submission if VPN is connected
  const canSubmitFlag = isConnected;

  // Helper to start lab progress if not already started
  const startLabIfNeeded = async () => {
    if (!labProgress && user && lab) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('clerk_user_id', user.id)
        .single();

      if (!profileData) return;

      const { data, error } = await supabase
        .from('lab_progress')
        .insert([{
          user_id: profileData.id,
          lab_id: lab.id,
          started_at: new Date().toISOString(),
        }])
        .select()
        .single();
      if (data) setLabProgress(data);
    }
  };

  // Points calculation
  const getPoints = (type) => {
    const total = lab.points || 0;
    console.log(total)
    if (type === 'user') return Math.round(total / 3);
    if (type === 'root') return total - Math.round(total / 3); // 2/3rd
    return 0;
  };

  // Flag submission handler
  const handleSubmitFlag = async (flagType) => {
    console.log(lab)
    console.log(`[Flag Submission] Attempting to submit ${flagType} flag...`);

    if (!canSubmitFlag) {
      console.warn("[Flag Submission] VPN not connected. Submission blocked.");
      toast({ title: "Connect VPN First", description: "You must connect to the lab VPN before submitting flags.", variant: "destructive" });
      return;
    }

    // Get profile ID from Clerk user ID
    const { data: profileData } = await supabase
      .from('profiles')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single();

    if (!profileData) {
      toast({ title: "Profile Error", description: "Unable to find your profile. Please try again.", variant: "destructive" });
      return;
    }

    const flagValue = flagType === 'user' ? userFlag : rootFlag;

    console.log(`[Flag Submission] Submitted value: "${flagValue.split('{')[1]?.split('}')[0]}"`);

    if (!flagValue.trim()) {
      console.warn("[Flag Submission] Empty flag value.");
      toast({ title: "Empty Flag", description: "Please enter a flag value.", variant: "destructive" });
      return;
    }

    // Format check
    const flagFormat = /^PentStark\{[a-zA-Z0-9_-]+\}$/;
    if (!flagFormat.test(flagValue)) {
      console.warn("[Flag Submission] Invalid flag format. Expected: PentStark{...}");
      toast({ title: "Invalid Flag Format", description: "Flag should be in PentStark{...} format.", variant: "destructive" });
      return;
    }
    console.log("[Flag Submission] Flag format valid.");

    // Start lab progress if not already started
    await startLabIfNeeded();

    // Check flag correctness
    let isCorrect = false;
    if (flagType === 'user' && flagValue.split('{')[1]?.split('}')[0] === lab.user_flag) isCorrect = true;
    if (flagType === 'root' && flagValue.split('{')[1]?.split('}')[0] === lab.root_flag) isCorrect = true;

    toast({ title: "Flag Submitted!", description: `Your ${flagType} flag for ${lab.name} has been submitted. Checking...`, className: "font-mono" });
    console.log(`[Flag Submission] Checking correctness for ${flagType} flag...`);

    setTimeout(async () => {
      if (isCorrect) {
        console.log(`[Flag Submission] ${flagType} flag is correct!`);

        toast({ title: "Correct Flag!", description: `Congratulations! You've captured the ${flagType} flag for ${lab.name}!`, className: "font-mono bg-green-600 text-white" });

        // Update lab_progress
        let updateObj = {};
        if (flagType === 'user') updateObj.user_flag_submitted = true;
        if (flagType === 'root') updateObj.root_flag_submitted = true;

        // If both flags are now submitted, set completed_at
        let completed = false;
        if (
          (flagType === 'user' && rootFlagSubmitted) ||
          (flagType === 'root' && userFlagSubmitted)
        ) {
          updateObj.completed_at = new Date().toISOString();
          completed = true;
          console.log("[Flag Submission] Both flags submitted. Lab completed.");
        }

        // Update lab_progress row
        await supabase
          .from('lab_progress')
          .update(updateObj)
          .eq('user_id', profileData.id)
          .eq('lab_id', lab.id);

        // Award points (update profile xp)
        const points = getPoints(flagType);
  await supabase.rpc('increment_profile_xp', { user_id: profileData.id, xp_delta: points });
        console.log(`[Flag Submission] Awarded ${points} points for ${flagType} flag.`);

        // Optionally, log activity
        await supabase.from('activity_logs').insert([{
          user_id: profileData.id,
          activity_type: `lab_${flagType}_flag_submit`,
          details: { lab_id: lab.id, flag_type: flagType, points_awarded: points },
        }]);

  // Profile XP is updated via RPC; no direct user.xp reference here

        // Update UI state
        if (flagType === 'user') setUserFlagSubmitted(true);
        if (flagType === 'root') setRootFlagSubmitted(true);

        if (completed) {
          toast({ title: "Lab Completed!", description: `You've completed ${lab.name}!`, className: "font-mono bg-green-700 text-white" });
        }
      } else {
        console.warn(`[Flag Submission] ${flagType} flag is incorrect.`);
        toast({ title: "Incorrect Flag", description: `The ${flagType} flag submitted is incorrect. Keep trying!`, variant: "destructive" });
      }
    }, 2000);

    if (flagType === 'user') setUserFlag("");
    if (flagType === 'root') setRootFlag("");
  };


  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!lab) {
    return <NotFoundPage message="Lab not found. It might be retired or you might have mistyped the ID." />;
  }

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Easy') return 'text-green-300 border-green-500/50 bg-green-500/20';
    if (difficulty === 'Medium') return 'text-yellow-300 border-yellow-500/50 bg-yellow-500/20';
    if (difficulty === 'Hard') return 'text-orange-300 border-orange-500/50 bg-orange-500/20';
    if (difficulty === 'Insane') return 'text-red-300 border-red-500/50 bg-red-500/20';
    return 'text-gray-300 border-gray-500/50 bg-gray-500/20';
  };

  const labCompleted = userFlagSubmitted && rootFlagSubmitted;

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
          <Link to="/labs" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-mono">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Labs
          </Link>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="glass-effect-purple rounded-xl overflow-hidden shadow-2xl shadow-primary/10"
        >
          <div className="p-6 md:p-8 bg-card/60 border-b border-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <img src={`https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100`} alt={`${lab.os} logo`} className="w-10 h-10 rounded-md border-2 border-primary/50" />
                  <h1 className="text-3xl md:text-4xl font-bold text-glow-primary font-orbitron">{lab.name}</h1>
                </div>
                <p className="text-muted-foreground font-mono text-sm">IP Address: <span className="text-secondary font-semibold">{lab.ip}</span></p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <span className={`px-4 py-1.5 text-sm font-semibold rounded-md border ${getDifficultyColor(lab.difficulty)}`}>
                  {lab.difficulty}
                </span>
                <div className="flex items-center text-sm text-muted-foreground font-mono">
                  <Star className="w-4 h-4 mr-1.5 text-yellow-400 fill-current" /> {lab.rating}/5
                  <span className="mx-1.5">·</span>
                  <Users className="w-4 h-4 mr-1.5 text-secondary" /> {lab.total_users} Solves
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {lab.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-xs bg-muted text-muted-foreground rounded-full font-mono">{tag}</span>
              ))}
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 bg-card/40 border-b border-border rounded-none p-0 h-12">
              <TabsTrigger value="overview" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">Overview</TabsTrigger>
              <TabsTrigger value="tasks" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">Tasks</TabsTrigger>
              <TabsTrigger value="walkthrough" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">Walkthrough</TabsTrigger>
              <TabsTrigger value="discussion" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full hidden md:flex">Discussion</TabsTrigger>
              <TabsTrigger value="submit" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">Submit Flag</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center font-orbitron"><Info className="text-secondary mr-3 w-6 h-6" />Lab Description</h2>
                <p className="text-muted-foreground leading-relaxed font-mono">{lab.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
                  <div className="bg-card p-4 rounded-md border border-border">
                    <h3 className="font-semibold text-primary mb-2 font-orbitron">Machine Info:</h3>
                    <p><strong>OS:</strong> {lab.os}</p>
                    <p className="flex items-center gap-2">
                      <strong className="min-w-[80px]">Creator:</strong>
                      {creator ? (
                        <span className="inline-flex items-center gap-2">
                          {creator.avatar_url && (
                            <Avatar className="w-6 h-6 shrink-0">
                              <AvatarImage src={creator.avatar_url} alt={creator.name} />
                              <AvatarFallback>{creator.name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                          )}
                          <span className="font-medium">{creator.name}</span>
                          {creator.country && (
                            <span className="text-xs text-muted-foreground">({creator.country})</span>
                          )}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Unknown</span>
                      )}
                    </p>
                    <p>
                      <strong>Release Date:</strong>{" "}
                      {lab.created_at
                        ? new Date(lab.created_at).toLocaleString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                        : "Unknown"}
                    </p>
                    <p><strong>Points:</strong> {lab.points}</p>
                  </div>
                  <div className="bg-card p-4 rounded-md border border-border">
                    <h3 className="font-semibold text-secondary mb-2 font-orbitron">Stats:</h3>
                    <p><strong>User Owns:</strong> {lab.userOwns}</p>
                    <p><strong>Root/System Owns:</strong> {lab.rootOwns}</p>
                    <p><strong>Active Users:</strong> {lab.activeUsers || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {!labCompleted ? (
                    <>
                      <Button
                        onClick={handleConnectVPN}
                        disabled={isConnecting}
                        className={`w-full md:w-auto font-mono text-primary-foreground button-3d-hover-purple ${isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
                      >
                        {isConnecting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-background border-t-transparent rounded-full mr-2"></motion.div> : (isConnected ? <WifiOff className="mr-2 h-5 w-5" /> : <Wifi className="mr-2 h-5 w-5" />)}
                        {isConnecting ? 'Connecting...' : (isConnected ? 'Disconnect VPN' : 'Connect to Lab VPN')}
                      </Button>
                      <Button variant="outline" className="w-full md:w-auto font-mono border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground button-3d-hover-purple">
                        <Download className="mr-2 h-5 w-5" /> Download VPN Pack
                      </Button>
                    </>
                  ) : (
                    <div className="w-full text-center py-4 font-mono text-green-400 font-semibold">
                      Lab already completed! 🎉
                    </div>
                  )}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="tasks" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center font-orbitron"><ListChecks className="text-primary mr-3 w-6 h-6" />Objectives</h2>
                <div className={`bg-card p-4 rounded-md border border-border font-mono ${userFlagSubmitted ? 'text-green-400' : 'text-muted-foreground'}`}>
                  <CheckCircle2 className={`${userFlagSubmitted ? 'text-green-400' : 'text-muted-foreground/50'} inline mr-2`} /> Find user.txt {userFlagSubmitted && "(Completed)"}
                </div>
                <div className={`bg-card p-4 rounded-md border border-border font-mono ${rootFlagSubmitted ? 'text-green-400' : 'text-muted-foreground'}`}>
                  <CheckCircle2 className={`${rootFlagSubmitted ? 'text-green-400' : 'text-muted-foreground/50'} inline mr-2`} /> Find root.txt {rootFlagSubmitted && "(Completed)"}
                </div>
                <p className="text-sm text-muted-foreground font-mono">Complete objectives to earn points and climb the leaderboard.</p>
              </motion.div>
            </TabsContent>

            <TabsContent value="walkthrough" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-3 font-orbitron">Official Walkthrough</h2>
                <p className="text-muted-foreground font-mono">Walkthroughs are typically available after a machine is retired or for VIP users. This lab is currently active.</p>
                <Button disabled className="font-mono">Unlock Walkthrough (VIP Only)</Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="discussion" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center font-orbitron"><MessageSquare className="text-secondary mr-3 w-6 h-6" />Lab Discussion</h2>
                <p className="text-muted-foreground font-mono">No spoilers! Discuss hints and techniques with the community on the forums.</p>
                <Button variant="outline" className="font-mono border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">Go to Forum Thread</Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="submit" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center font-orbitron"><Flag className="text-primary mr-3 w-6 h-6" />Submit Flags</h2>
                {!labCompleted ? (
                  <>
                    {/* User Flag Submission */}
                    <div className="space-y-3">
                      <label htmlFor="userFlag" className="block text-sm font-medium text-muted-foreground font-mono">User Flag</label>
                      <div className="flex gap-2">
                        <Input
                          id="userFlag"
                          type="text"
                          placeholder="PentStark{...}"
                          className="bg-input border-border focus:ring-primary font-mono flex-grow"
                          value={userFlag}
                          onChange={(e) => setUserFlag(e.target.value)}
                          disabled={userFlagSubmitted || !canSubmitFlag}
                        />
                        <Button
                          onClick={() => handleSubmitFlag('user')}
                          className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground button-3d-hover-purple"
                          disabled={userFlagSubmitted || !canSubmitFlag}
                        >
                          {userFlagSubmitted ? <Check className="mr-2 h-4 w-4" /> : null}
                          {userFlagSubmitted ? 'Submitted' : 'Submit User'}
                        </Button>
                      </div>
                      {!canSubmitFlag && <p className="text-xs text-red-400 font-mono">Connect to VPN to submit flags.</p>}
                    </div>

                    {/* Root Flag Submission */}
                    <div className="space-y-3">
                      <label htmlFor="rootFlag" className="block text-sm font-medium text-muted-foreground font-mono">Root/System Flag</label>
                      <div className="flex gap-2">
                        <Input
                          id="rootFlag"
                          type="text"
                          placeholder="PentStark{...}"
                          className="bg-input border-border focus:ring-primary font-mono flex-grow"
                          value={rootFlag}
                          onChange={(e) => setRootFlag(e.target.value)}
                          disabled={rootFlagSubmitted || !canSubmitFlag}
                        />
                        <Button
                          onClick={() => handleSubmitFlag('root')}
                          className="font-mono bg-secondary hover:bg-secondary/90 text-secondary-foreground button-3d-hover-purple"
                          disabled={rootFlagSubmitted || !canSubmitFlag}
                        >
                          {rootFlagSubmitted ? <Check className="mr-2 h-4 w-4" /> : null}
                          {rootFlagSubmitted ? 'Submitted' : 'Submit Root'}
                        </Button>
                      </div>
                      {!canSubmitFlag && <p className="text-xs text-red-400 font-mono">Connect to VPN to submit flags.</p>}
                    </div>
                  </>
                ) : (
                  <div className="text-center text-green-400 font-mono font-semibold text-lg">
                    You have already completed this lab. No further submissions allowed.
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <AlertDialog open={showConnectionModal}>
        <AlertDialogContent className="font-mono bg-card border-border text-card-foreground">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-orbitron text-primary flex items-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full mr-3"></motion.div>
              Connecting to PentStark Network...
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground pt-3 text-sm">
              {connectionStatus}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default LabDetailsPage;
