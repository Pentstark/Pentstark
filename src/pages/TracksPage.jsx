import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Make sure this import exists
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, ArrowRight, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { pageVariants, sectionVariants, itemVariants } from '@/lib/animations';
import { useAuth } from '@/lib/clerk-auth.jsx';
import { SignInButton } from '@clerk/clerk-react';
import { clerkDarkTheme } from '@/lib/clerk-theme';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TracksPage = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true); // tracks loading
  const [userLoading, setUserLoading] = useState(true); // 👈 new state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [enrolledTracks, setEnrolledTrackIds] = useState([]);
  useEffect(() => {
    if (user !== undefined) {
      setUserLoading(false); // user finished loading (whether null or valid)
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      const enrolledTracks = async () => {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("id")
          .eq("clerk_user_id", user?.id)
          .single();

        if (profileData) {
          const { data, error } = await supabase
            .from("academy_enrollments")
            .select("track_id")
            .eq("user_id", profileData.id);

          if (!error && data) {
            const trackIds = data.map((enrollment) => enrollment.track_id);
            setEnrolledTrackIds(trackIds);
          }
        }
      };
      enrolledTracks();
    }
  }, [user]);
  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      const start = Date.now();
      const { data, error } = await supabase.from("tracks").select("*");
      if (!error) setTracks(data || []);
      const elapsed = Date.now() - start;
      const delay = Math.max(0, 3500 - elapsed);
      setTimeout(() => setLoading(false), delay);
    };
    fetchTracks();
  }, []);



  const handleExploreTrack = (trackId) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      navigate(`/tracks/${trackId}`);
    }
  };

  const filteredTracks = tracks
    .filter(track => track.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (track.tags || []).some(tag => (tag || '').toLowerCase().includes(searchTerm.toLowerCase())))
    .filter(track => categoryFilter === 'all' || track.category === categoryFilter)
    .filter(track => difficultyFilter === 'all' || track.difficulty === difficultyFilter)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'difficulty') {
        const diffOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
        return diffOrder[a.difficulty] - diffOrder[b.difficulty];
      }
      if (sortBy === 'labs') return (b.labs || 0) - (a.labs || 0);
      return 0;
    });

  const difficultyColors = {
    'Beginner': 'text-green-400 border-green-500/30 bg-green-500/10',
    'Intermediate': 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    'Advanced': 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    'Expert': 'text-red-400 border-red-500/30 bg-red-500/10',
  };
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]"
    >
      <div className="relative z-10">
        {/* Hero Section - Enterprise Style */}
        <section className="enterprise-section relative py-20 md:py-28 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              className="text-center mb-12 md:mb-16 lg:mb-20"
            >
              <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-secondary/10 text-secondary rounded-full text-xs md:text-sm font-semibold border border-secondary/20">
                  STRUCTURED LEARNING PATHS
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                Learning <span className="enterprise-text-gradient">Tracks</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed px-4">
                Follow structured paths to master specific cybersecurity domains. Each track is a curated collection of labs and challenges designed by industry experts.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="enterprise-section py-12 md:py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={itemVariants}
              initial="initial"
              animate="animate"
              className="mb-10 p-6 md:p-8 enterprise-card rounded-xl md:rounded-2xl relative z-10"
            >
              {/* Responsive horizontal filter bar with wrapping */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search tracks or tags..."
                      className="bg-input/90 border-border/90 focus:ring-secondary font-mono text-base py-3 pl-10 rounded-full shadow-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                    </span>
                  </div>
                </div>
                {/* Divider */}
                <div className="hidden md:block h-8 w-px bg-border/40 mx-2" />
                {/* Category dropdown */}
                <div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-32 bg-input/90 border-border/90 focus:ring-secondary font-mono text-xs py-2 rounded-full shadow-sm">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 border-border font-mono">
                      <SelectItem value="all">All</SelectItem>
                      {[...new Set(tracks.map(track => track.category))].map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {/* Divider */}
                <div className="hidden md:block h-8 w-px bg-border/40 mx-2" />
                {/* Difficulty dropdown */}
                <div>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="w-32 bg-input/90 border-border/90 focus:ring-secondary font-mono text-xs py-2 rounded-full shadow-sm">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 border-border font-mono">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Divider */}
                <div className="hidden md:block h-8 w-px bg-border/40 mx-2" />
                {/* Sort By pill buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground mr-1">SORT BY</span>
                  {[
                    { label: 'NAME', value: 'name' },
                    { label: 'DIFFICULTY', value: 'difficulty' },
                    { label: 'LABS', value: 'labs' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`px-4 py-1 rounded-full font-mono text-xs transition border shadow-sm
                    ${sortBy === opt.value
                          ? 'bg-secondary/90 text-secondary-foreground border-secondary/70 shadow-glow-blue'
                          : 'bg-background/40 text-muted-foreground/80 border-border/50 hover:bg-background/60 hover:text-foreground'}
                  `}
                      onClick={() => setSortBy(opt.value)}
                    >{opt.label}</button>
                  ))}
                </div>
              </div>
            </motion.div>

            {(loading || userLoading) ? (
              <div className="flex flex-col items-center justify-center py-16">
                <img
                  key={loading ? 'loading-gif' : 'loaded'}
                  src="https://assets.pentstark.com/loading-labs.gif"
                  alt="Loading tracks..."
                  className="h-52 mb-4"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            ) : filteredTracks.length > 0 ? (
              <motion.div
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredTracks.map((track) => (
                  <motion.div
                    key={track.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="enterprise-card rounded-xl md:rounded-2xl overflow-hidden flex flex-col h-full group"
                  >
                    <div className="relative h-40 bg-card">
                      <img
                        src={track.Image || `https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600`}
                        alt={track.name}
                        className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent"></div>

                      {/* Difficulty tag */}
                      <div
                        className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full border 
        ${difficultyColors[track.difficulty] ||
                          'text-gray-400 border-gray-500/30 bg-gray-500/10'}`}
                      >
                        {track.difficulty}
                      </div>

                      {/* ✅ Enrolled Badge */}
                      {enrolledTracks.includes(track.id) && (
                        <div className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full bg-green-500/90 text-white shadow">
                          Enrolled
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center mb-2">
                        <Activity className="w-6 h-6 text-secondary mr-2.5" />
                        <h2 className="text-xl font-bold text-foreground">{track.name}</h2>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow font-mono line-clamp-3">
                        {track.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 font-mono">
                        <span className="flex items-center">
                          <BookOpen className="w-3.5 h-3.5 mr-1 text-primary" /> {track.labs || 0} Labs
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1 text-primary" /> Approx. {track.duration_hours || 0} Hours
                        </span>
                        <span className="flex items-center">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1 text-primary" /> {track.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {(track.tags || []).slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button
                        onClick={() => handleExploreTrack(track.id)}
                        className="w-full font-orbitron auth-button-secondary mt-auto"
                      >
                        Explore Track <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>

                ))}
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="text-center py-16">
                <Activity className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-2">No Tracks Found</h2>
                <p className="text-muted-foreground font-mono">Try adjusting your search or filters. New tracks are added regularly!</p>
              </motion.div>
            )}
          </div>

          {/* Authentication Modal */}
          <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Sign In Required</DialogTitle>
                <DialogDescription>
                  You need to sign in to explore learning tracks and access the full curriculum.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 pt-4">
                <SignInButton mode="modal" appearance={clerkDarkTheme}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Sign In
                  </Button>
                </SignInButton>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <SignInButton mode="modal" appearance={clerkDarkTheme}>
                    <Button variant="link" className="p-0 h-auto font-semibold">
                      Sign up here
                    </Button>
                  </SignInButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </motion.div>
  );
};

export default TracksPage;
