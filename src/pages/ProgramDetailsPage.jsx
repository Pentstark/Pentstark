import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/clerk-auth.jsx';
import { motion } from 'framer-motion';
import { pageVariants, itemVariants, sectionVariants } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Award, Star, CalendarDays, Users, BookOpen, CheckCircle, Layers, Target as TargetIcon, Brain, TrendingUp, FileText } from 'lucide-react';
import NotFoundPage from '@/pages/NotFoundPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from '@/components/ui/checkbox'; // <-- Make sure you have a Checkbox component


const ProgramDetailsPage = () => {
  const { programId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [moduleProgress, setModuleProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [enrollmentId, setEnrollmentId] = useState(null); // Track enrollment row

  // Track Clerk readiness
  useEffect(() => {
    if (user !== undefined) {
      setUserLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);

      // 1. Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', programId)
        .single();

      if (courseError || !courseData) {
        setCourse(null);
        setLoading(false);
        return;
      }
      setCourse(courseData);
      console.log('Fetched course data:', courseData);

      // 2. Fetch modules for this course
      const { data: moduleLinks } = await supabase
        .from('course_modules')
        .select('module_id, order_index, modules!inner(name, description)')
        .eq('course_id', programId)
        .order('order_index', { ascending: true });
      setModules(
        (moduleLinks || []).map(link => ({
          id: link.module_id,
          name: link.modules?.name,
          description: link.modules?.description,
        }))
      );

      setLoading(false);
    };
    
    fetchCourseData();
  }, [programId]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setIsEnrolled(false);
        setEnrollmentId(null);
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

      // 3. Fetch enrollment/progress for this user
      const { data: enrollment } = await supabase
        .from('course_enrollments')
        .select('id, progress_percentage')
        .eq('user_id', profileData.id)
        .eq('course_id', programId)
        .maybeSingle();

      setIsEnrolled(!!enrollment);
      setEnrollmentId(enrollment?.id || null);
      setProgress(enrollment?.progress_percentage || 0);

      // 4. Fetch module progress for this course/user
      const { data: progressRows } = await supabase
        .from('course_module_progress')
        .select('module_id, is_completed')
        .eq('user_id', profileData.id)
        .eq('course_id', programId);

      const progressMap = {};
      (progressRows || []).forEach(row => {
        progressMap[row.module_id] = row.is_completed;
      });
      setModuleProgress(progressMap);
    };
    
    if (!userLoading) {
      fetchUserData();
    }
  }, [user, userLoading, programId]);

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
    // Upsert progress row for this module/user/course
    const { error } = await supabase
      .from('course_module_progress')
      .upsert({
        user_id: profileData.id,
        course_id: programId,
        module_id: moduleId,
        is_completed: checked,
        completed_at: checked ? new Date().toISOString() : null,
      }, { onConflict: 'user_id,course_id,module_id' });

    if (!error) {
      setModuleProgress(prev => ({ ...prev, [moduleId]: checked }));

      // Recalculate progress percentage
      const total = modules.length;
      const completed = Object.values({ ...moduleProgress, [moduleId]: checked }).filter(Boolean).length;
      const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

      setProgress(newProgress);

      // Update progress in course_enrollments
      await supabase
        .from('course_enrollments')
        .update({ progress_percentage: newProgress })
        .eq('user_id', profileData.id)
        .eq('course_id', programId);
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
      .from('course_enrollments')
      .insert([{ user_id: profileData.id, course_id: programId, progress_percentage: 0 }]);

    // Log activity
    console.log("User details:", user)
    await supabase
      .from('activity_logs')
      .insert([{
        user_id: profileData.id,
        activity_type: 'enroll_course',
        details: { course_id: programId, course_name: course?.name },
      }]);

    if (!enrollError) {
      setIsEnrolled(true);
      setProgress(0);
      toast({
        title: "Enrolled in Course!",
        description: `You have enrolled in ${course.name}.`,
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
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!course) {
    return <NotFoundPage message="Sorry, the academy program you're looking for doesn't exist." />;
  }

  const handleEnrollment = () => {
    toast({
      title: "Enrollment Request Confirmed!",
      description: `Your interest in ${course.name} has been noted. Expect an email soon!`,
      variant: "default",
      className: "bg-secondary text-secondary-foreground border-border font-mono",
    });
  };

  const difficultyColors = {
    'Beginner': 'text-green-400 border-green-500/50 bg-green-500/10',
    'Intermediate': 'text-blue-400 border-blue-500/50 bg-blue-500/10',
    'Advanced': 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10',
    'Executive': 'text-purple-400 border-purple-500/50 bg-purple-500/10',
  };


  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="py-12 md:py-20 bg-background"
    >
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="mb-8">
          <Link to="/academy" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-mono">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Academy
          </Link>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="glass-effect-dark rounded-xl overflow-hidden shadow-2xl shadow-primary/10"
        >
          <div className="p-6 md:p-8 bg-card/50 border-b border-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Brain className="h-10 w-10 text-primary" />
                  <h1 className="text-3xl md:text-4xl font-bold animated-gradient-text">{course.name}</h1>
                </div>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2 font-mono">
                  <span className={`px-3 py-1 rounded-full border text-xs ${difficultyColors[course.difficulty] || 'text-gray-400 border-gray-500/30 bg-gray-500/10'}`}>{course.difficulty}</span>
                  <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1.5 text-primary" /> {course.duration_hours} hours</span>
                  <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" /> {course.rating} ({course.students} students)</span>
                </div>
              </div>
              {isEnrolled ? (
                <Button
                  size="lg"
                  disabled
                  className="font-mono bg-green-600 text-white cursor-default pointer-events-none mt-4 md:mt-0"
                >
                  <CheckCircle className="mr-2 h-5 w-5" /> Enrolled
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground button-3d-hover mt-4 md:mt-0"
                  onClick={handleEnroll}
                  disabled={loading}
                >
                  Enroll Now
                </Button>
              )}
            </div>
            {isEnrolled && (
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs font-mono text-muted-foreground mt-1">{progress}% completed</div>
              </div>
            )}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/30 border-b border-border rounded-none p-0 h-12">
              <TabsTrigger value="overview" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">
                <BookOpen className="w-4 h-4 mr-2 hidden sm:inline-block" />Overview
              </TabsTrigger>
              <TabsTrigger value="modules" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">
                <Layers className="w-4 h-4 mr-2 hidden sm:inline-block" />Modules
              </TabsTrigger>
              <TabsTrigger value="details" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">
                <FileText className="w-4 h-4 mr-2 hidden sm:inline-block" />Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Program Description</h2>
                <p className="text-muted-foreground leading-relaxed font-mono">{course.longDescription || course.description}</p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3 flex items-center">
                  <TrendingUp className="text-secondary mr-3 w-5 h-5" />Key Learning Outcomes
                </h3>
                <ul className="space-y-2.5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 font-mono text-sm">
                  {(course.learningOutcomes && course.learningOutcomes.length > 0
                    ? course.learningOutcomes
                    : modules.slice(0, 6).map(m => m.name)
                  ).map((outcome, idx) => (
                    <li key={idx} className="flex items-start text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>

            <TabsContent value="modules" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Core Modules</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {modules.length > 0 ? modules.map((module, idx) => (
                    <div key={module.id} className="bg-card p-4 rounded-md border border-border font-mono text-sm flex items-start gap-3">
                      {isEnrolled && (
                        <Checkbox
                          checked={!!moduleProgress[module.id]}
                          onCheckedChange={checked => handleModuleToggle(module.id, checked)}
                          disabled={loading}
                          className="mt-1"
                        />
                      )}
                      <div>
                        <p className="text-foreground font-semibold mb-1">
                          {module.name}
                        </p>
                        <p className="text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-2 text-muted-foreground">No modules listed yet.</div>
                  )}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="details" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-6 font-mono text-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Additional Information</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-md border border-border">
                    <h4 className="font-semibold text-primary mb-1.5">Prerequisites:</h4>
                    <p className="text-muted-foreground">{course.prerequisites || 'Basic IT knowledge recommended.'}</p>
                  </div>
                  <div className="bg-card p-4 rounded-md border border-border">
                    <h4 className="font-semibold text-primary mb-1.5">Target Audience:</h4>
                    <p className="text-muted-foreground">{course.targetAudience || 'Individuals looking to advance their cybersecurity skills.'}</p>
                  </div>
                  <div className="bg-card p-4 rounded-md border border-border">
                    <h4 className="font-semibold text-primary mb-1.5">Certification:</h4>
                    <p className="text-muted-foreground">{course.certification || 'Certificate of Completion from CyberCore Academy.'}</p>
                  </div>
                  <div className="bg-card p-4 rounded-md border border-border">
                    <h4 className="font-semibold text-primary mb-1.5">Format:</h4>
                    <p className="text-muted-foreground">{course.format || 'Online, self-paced learning with practical exercises.'}</p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProgramDetailsPage;