import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/clerk-auth.jsx'; // <-- Updated for Clerk
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, ArrowRight, SlidersHorizontal, Shield, Users, BarChart3, Star, LayoutGrid, Rows } from 'lucide-react';
import { pageVariants, sectionVariants, itemVariants, cardHoverVariants } from '@/lib/animations';
import { supabase } from '@/lib/supabase'; // Make sure this import exists
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SignInButton } from '@clerk/clerk-react';
import { clerkDarkTheme } from '@/lib/clerk-theme';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LabsPage = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true); // 👈 wait for Clerk
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [osFilter, setOsFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [progress, setProgress] = useState([]);
  const [completedFilter, setCompletedFilter] = useState('all'); // NEW
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'card'
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, isAuthenticated } = useAuth(); // <-- Get current user and auth status
  useEffect(() => {
    if (user !== undefined) {
      setUserLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchLabsAndProgress = async () => {
      setLoading(true);
      const start = Date.now();
      const { data: labsData } = await supabase.from('labs').select('*');
      setLabs(labsData || []);
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('clerk_user_id', user.id)
          .single();
        const { data: progressData } = await supabase
          .from('lab_progress')
          .select('lab_id, user_flag_submitted, root_flag_submitted')
          .eq('user_id', profileData.id);
        setProgress(progressData || []);
      }
      // Ensure at least 2 seconds of loading
      const elapsed = Date.now() - start;
      const delay = Math.max(0, 3500 - elapsed);
      setTimeout(() => setLoading(false), delay);
    };
    fetchLabsAndProgress();
  }, [user]);

  // Helper: is lab completed?
  const isLabCompleted = (labId) => {
    const p = progress.find(pr => pr.lab_id === labId);
    return p && p.user_flag_submitted && p.root_flag_submitted;
  };

  // Helper: is lab ongoing (started but not both flags submitted)
  const isLabOngoing = (labId) => {
    const p = progress.find(pr => pr.lab_id === labId);
    return p && (!p.user_flag_submitted || !p.root_flag_submitted);
  };

  // Handle view details click - show auth modal if not authenticated
  const handleViewDetails = (labId, e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowAuthModal(true);
      return;
    }
    // If authenticated, let the Link navigate normally
  };

  // Filter and sort
  const filteredLabs = labs
    .filter(lab =>
      lab.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lab.tags || []).some(tag => (tag || '').toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(lab => difficultyFilter === 'all' || lab.difficulty?.toLowerCase() === difficultyFilter)
    .filter(lab => osFilter === 'all' || lab.os?.toLowerCase() === osFilter)
    .filter(lab => {
      if (completedFilter === 'completed') return isLabCompleted(lab.id);
      if (completedFilter === 'ongoing') return isLabOngoing(lab.id);
      if (completedFilter === 'not_completed') return !isLabCompleted(lab.id) && !isLabOngoing(lab.id);
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'difficulty') {
        const diffOrder = { 'easy': 1, 'medium': 2, 'hard': 3, 'insane': 4 };
        return diffOrder[a.difficulty?.toLowerCase()] - diffOrder[b.difficulty?.toLowerCase()];
      }
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'users') return (b.total_users || 0) - (a.total_users || 0);
      return 0;
    });

  // Group labs by model_type
  const labsByModelType = filteredLabs.reduce((acc, lab) => {
    const type = lab.model_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(lab);
    return acc;
  }, {});

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Easy') return 'text-green-400 border-green-500/30 bg-green-500/10';
    if (difficulty === 'Medium') return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    if (difficulty === 'Hard') return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
    if (difficulty === 'Insane') return 'text-red-400 border-red-500/30 bg-red-500/10';
    return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
  };

  // Tab state for model type
  const modelTypes = Object.keys(labsByModelType);
  const allTab = 'all';
  const tabList = [allTab, ...modelTypes];
  const [activeModelType, setActiveModelType] = useState(tabList[0] || '');

  // Helper to provide nicer tab labels (map specific model_type values)
  const getTabLabel = (type) => {
    if (type === allTab) return 'All Labs';
    // Normalize underscores and trim
    const label = String(type).replace(/_/g, ' ').trim();
    const lower = label.toLowerCase();
    // Map known values to prettier labels
    if (lower === 'red teaming' || lower === 'red-team' || lower === 'redteaming') return 'Red Team';
    // Add other mappings here if needed
    // Default: return label as-is (preserve case from model_type)
    return label;
  };

  // Update active tab if filter changes
  useEffect(() => {
    if (!tabList.includes(activeModelType)) {
      setActiveModelType(tabList[0] || '');
    }
  }, [tabList.join(','), activeModelType]);

  // Helper to render labs for a tab
  const renderLabsGrid = (labsArr) => (
    labsArr.length > 0 ? (
      <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8" : "flex flex-col gap-6"}
      >
        {labsArr.map((lab) => {
          const completed = isLabCompleted(lab.id);
          const ongoing = isLabOngoing(lab.id);
          return (
            <motion.div
              key={lab.id}
              variants={itemVariants}
              whileHover="hover"
              className={viewMode === 'grid' ? "enterprise-card rounded-xl md:rounded-2xl overflow-hidden flex flex-col h-full group" : "enterprise-card rounded-xl md:rounded-2xl overflow-hidden flex flex-row h-48 group"}
            >
              {/* Card/Grid view image and content layout */}
              {viewMode === 'grid' ? (
                <>
                  <div className="relative h-48 bg-card">
                    <img
                      src={lab.image_path || `https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600`}
                      alt={lab.name}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(lab.difficulty)}`}>{lab.difficulty}</span>
                      <span className="flex items-center text-xs text-yellow-400 bg-card/70 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 mr-1 fill-current" /> {(lab.rating || 0).toFixed(1)}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h2 className="text-2xl font-bold text-foreground text-glow-green">{lab.name}</h2>
                    </div>
                    {completed && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">Completed</div>
                    )}
                    {!completed && ongoing && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">Ongoing</div>
                    )}
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span className="flex items-center"><Shield className="w-4 h-4 mr-1.5 text-primary" /> {lab.os}</span>
                      <span className="flex items-center"><Users className="w-4 h-4 mr-1.5 text-secondary" /> {lab.total_users || 0} Solves</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(lab.tags || []).slice(0, 3).map(tag => <span key={tag} className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">{tag}</span>)}
                      {(lab.tags || []).length > 3 && <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">+{lab.tags.length - 3} more</span>}
                    </div>
                    <div className="text-xs text-green-400 mb-4 font-mono">{lab.active_users || 0} users currently pWning</div>
                    <Link to={`/labs/${lab.id}`} className="mt-auto" onClick={(e) => handleViewDetails(lab.id, e)}>
                      <Button className="w-full font-orbitron auth-button-primary">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                // Card/List view
                <>
                  <div className="relative w-48 h-full bg-card flex-shrink-0">
                    <img
                      src={lab.image_path || `https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600`}
                      alt={lab.name}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(lab.difficulty)}`}>{lab.difficulty}</span>
                      <span className="flex items-center text-xs text-yellow-400 bg-card/70 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 mr-1 fill-current" /> {(lab.rating || 0).toFixed(1)}
                      </span>
                    </div>
                    {completed && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">Completed</div>
                    )}
                    {!completed && ongoing && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">Ongoing</div>
                    )}
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground text-glow-green mb-2">{lab.name}</h2>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span className="flex items-center"><Shield className="w-4 h-4 mr-1.5 text-primary" /> {lab.os}</span>
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1.5 text-secondary" /> {lab.total_users || 0} Solves</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(lab.tags || []).slice(0, 3).map(tag => <span key={tag} className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">{tag}</span>)}
                        {(lab.tags || []).length > 3 && <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">+{lab.tags.length - 3} more</span>}
                      </div>
                      <div className="text-xs text-green-400 mb-2 font-mono">{lab.active_users || 0} users currently pWning</div>
                    </div>
                    <Link to={`/labs/${lab.id}`} className="mt-auto" onClick={(e) => handleViewDetails(lab.id, e)}>
                      <Button className="w-full font-orbitron auth-button-primary">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    ) : (
      <motion.div variants={itemVariants} className="text-center py-16">
        <Target className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-2">No Labs Found</h2>
        <p className="text-muted-foreground font-mono">Try adjusting your search or filters.</p>
      </motion.div>
    )
  );



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
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-semibold border border-primary/20">
                  ENTERPRISE TRAINING PLATFORM
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                Hacking <span className="enterprise-text-gradient">Labs</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed px-4">
                Choose your challenge. Pwn machines, learn new techniques, and climb the ranks in our enterprise-grade training environment.
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
              {/* Responsive filter/search bar: two-row layout on small screens */}
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                {/* Row 1: Search (flexible) + view toggles */}
                <div className="flex items-center w-full md:w-auto gap-3">
                  <div className="flex-1 min-w-0 md:min-w-[200px]">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search active machines..."
                        className="bg-input/90 border-border/90 focus:ring-primary font-mono text-base py-3 pl-10 rounded-full shadow-sm w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-2 md:mt-0">
                    <button
                      className={`p-2 rounded-full border transition ${viewMode === 'grid' ? 'bg-primary/90 text-primary-foreground border-primary/70 shadow-glow-green' : 'bg-background/40 text-muted-foreground/80 border-border/50 hover:bg-background/60 hover:text-foreground'}`}
                      onClick={() => setViewMode('grid')}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-2 rounded-full border transition ${viewMode === 'card' ? 'bg-primary/90 text-primary-foreground border-primary/70 shadow-glow-green' : 'bg-background/40 text-muted-foreground/80 border-border/50 hover:bg-background/60 hover:text-foreground'}`}
                      onClick={() => setViewMode('card')}
                      title="Card/List View"
                    >
                      <Rows className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Row 2: Filters — horizontally scrollable on small screens */}
                <div className="overflow-x-auto md:overflow-visible w-full md:w-auto scrollbar-visible">
                  <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap px-4 pr-10">
                    {/* Status filter */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground mr-1 hidden sm:inline">STATUS</span>
                      {[
                        { label: 'BOTH', value: 'all' },
                        { label: 'COMPLETED', value: 'completed' },
                        { label: 'ONGOING', value: 'ongoing' },
                        { label: 'NOT STARTED', value: 'not_completed' },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          className={`px-3 py-1 text-[11px] sm:text-xs rounded-full font-mono transition border shadow-sm whitespace-nowrap
                        ${completedFilter === opt.value
                              ? 'bg-primary/90 text-primary-foreground border-primary/70 shadow-glow-green'
                              : 'bg-background/40 text-muted-foreground/80 border-border/50 hover:bg-background/60 hover:text-foreground'}
                    `}
                          onClick={() => setCompletedFilter(opt.value)}
                        >{opt.label}</button>
                      ))}
                    </div>

                    <div className="hidden md:block h-8 w-px bg-border/40 mx-2" />

                    {/* Sort By */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground mr-1 hidden sm:inline">SORT BY</span>
                      {[
                        { label: 'NAME', value: 'name' },
                        { label: 'DIFFICULTY', value: 'difficulty' },
                        { label: 'RATING', value: 'rating' },
                        { label: 'MOST', value: 'users' },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          className={`px-3 py-1 text-[11px] sm:text-xs rounded-full font-mono transition border shadow-sm whitespace-nowrap
                        ${sortBy === opt.value
                              ? 'bg-primary/90 text-primary-foreground border-primary/70 shadow-glow-green'
                              : 'bg-background/40 text-muted-foreground/80 border-border/50 hover:bg-background/60 hover:text-foreground'}
                    `}
                          onClick={() => setSortBy(opt.value)}
                        >{opt.label}</button>
                      ))}
                    </div>

                    <div className="hidden md:block h-8 w-px bg-border/40 mx-2" />

                    {/* Difficulty dropdown */}
                    <div className="flex-shrink-0">
                      <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                        <SelectTrigger className="w-24 sm:w-28 bg-input/90 border-border/90 focus:ring-primary font-mono text-xs py-2 rounded-full shadow-sm">
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent className="bg-card/95 border-border font-mono">
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                          <SelectItem value="insane">Insane</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* OS dropdown */}
                    <div className="flex-shrink-0">
                      <Select value={osFilter} onValueChange={setOsFilter}>
                        <SelectTrigger className="w-24 sm:w-28 bg-input/90 border-border/90 focus:ring-primary font-mono text-xs py-2 rounded-full">
                          <SelectValue placeholder="OS" />
                        </SelectTrigger>
                        <SelectContent className="bg-card/95 border-border font-mono">
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="linux">Linux</SelectItem>
                          <SelectItem value="windows">Windows</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* spacer so the last filter (e.g., POPULARITY) can scroll fully into view */}
                    <div className="flex-shrink-20 w-1 md:w-5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabbed Model Type Segregation */}
            {(loading || userLoading) ? (
              <div className="flex flex-col items-center justify-center py-16">
                <img
                  key={loading ? 'loading-gif' : 'loaded'}
                  src="https://assets.pentstark.com/loading-labs.gif"
                  alt="Loading labs..."
                  className="h-52 mb-4"
                  style={{ imageRendering: 'auto' }}
                />
                {/* <span className="text-muted-foreground font-mono">Loading labs...</span> */}
              </div>
            ) : tabList.length === 0 ? (
              <motion.div variants={itemVariants} className="text-center py-16">
                <Target className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-2">No Labs Found</h2>
                <p className="text-muted-foreground font-mono">Try adjusting your search or filters.</p>
              </motion.div>
            ) : (
              <Tabs value={activeModelType} onValueChange={setActiveModelType} className="w-full">
                {/* Tabs: visually match the filter/search pill and behave well on mobile */}
                  <div className="mb-8 enterprise-card rounded-xl p-6 overflow-x-auto scrollbar-visible">
                    {/* make the list subtle so individual tabs are the primary visual elements */}
                    <TabsList className="p-1 flex gap-2 items-center bg-transparent px-3 pr-8 w-full md:w-full scrollbar-visible justify-start md:justify-center">
                      {tabList.map(type => (
                        <TabsTrigger
                          key={type}
                          value={type}
                          className={`flex-shrink-0 capitalize font-orbitron rounded-full transition-all duration-200 font-medium
                          px-1 sm:px-2 py-1 md:px-3 md:py-2 text-sm md:text-base
                          data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary
                          data-[state=active]:text-white data-[state=active]:shadow-lg
                          data-[state=active]:border data-[state=active]:border-primary/60
                          data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground/80 data-[state=inactive]:border data-[state=inactive]:border-border/30
                          hover:data-[state=inactive]:bg-background/6 whitespace-nowrap`}
                        >
                          {getTabLabel(type)}
                        </TabsTrigger>
                      ))}
                      {/* small spacer so the last tab can be scrolled fully into view on small screens */}
                      <div className="flex-shrink-0 w-6 md:w-12" aria-hidden="true" />
                    </TabsList>
                  </div>
                {tabList.map(type => (
                  <TabsContent key={type} value={type} className="enterprise-card rounded-xl p-4 md:p-6">
                    {type === allTab
                      ? renderLabsGrid(filteredLabs)
                      : renderLabsGrid(labsByModelType[type] || [])}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>

          {/* Authentication Modal */}
          <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Sign In Required</DialogTitle>
                <DialogDescription>
                  You need to sign in to access lab details and start hacking challenges.
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

export default LabsPage;