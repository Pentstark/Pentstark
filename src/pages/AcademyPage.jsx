import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Award, Star, ArrowRight, Users, Target, Brain } from 'lucide-react';
import { pageVariants, sectionVariants, itemVariants } from '@/lib/animations';
import { supabase } from '@/lib/supabase';
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

const AcademyPage = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [modulesMap, setModulesMap] = useState({}); // NEW: { [courseId]: [modules] }
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [courseEnrollmentCounts, setCourseEnrollmentCounts] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== undefined) {
      setUserLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const start = Date.now();

      // Fetch all courses
      const { data: coursesData } = await supabase.from('courses').select('*');
      setCourses(coursesData || []);

      // Fetch enrollment counts
      const { data: enrollmentAgg } = await supabase
        .from('course_enrollments')
        .select('course_id');
      const enrollmentCounts = {};
      (enrollmentAgg || []).forEach(e => {
        enrollmentCounts[e.course_id] = (enrollmentCounts[e.course_id] || 0) + 1;
      });
      setCourseEnrollmentCounts(enrollmentCounts);

      // Fetch modules for all courses
      if (coursesData && coursesData.length > 0) {
        const courseIds = coursesData.map(c => c.id);
        const { data: courseModules } = await supabase
          .from('course_modules')
          .select('*')
          .in('course_id', courseIds);
        const map = {};
        (courseModules || []).forEach(cm => {
          if (!map[cm.course_id]) map[cm.course_id] = [];
          map[cm.course_id].push({
            id: cm.module_id,
            name: cm.modules?.name,
            description: cm.modules?.description,
          });
        });
        setModulesMap(map);
      }

      // Artificial delay for loader
      const elapsed = Date.now() - start;
      const delay = Math.max(0, 3500 - elapsed);
      setTimeout(() => setLoading(false), delay);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchUserEnrollments = async () => {
      if (!user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('clerk_user_id', user.id)
        .single();

      if (!profileData) return;

      const { data: userEnrollData } = await supabase
        .from('course_enrollments')
        .select('course_id')
        .eq('user_id', profileData.id);

      setEnrollments(userEnrollData?.map(e => e.course_id) || []);
    };

    if (!userLoading) {
      fetchUserEnrollments();
    }
  }, [user, userLoading]);

  const handleEnroll = async (course) => {
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
    const { error } = await supabase
      .from('course_enrollments')
      .insert([{ user_id: profileData.id, course_id: course.id }]);
    if (!error) {
      setEnrollments(prev => [...prev, course.id]);
      await supabase.from('activity_logs').insert([{
        user_id: profileData.id,
        activity_type: 'enroll_course',
        details: { course_id: course.id, course_name: course.name },
      }]);
      toast({ title: "Enrolled!", description: `You are now enrolled in ${course.name}.`, className: "bg-primary text-primary-foreground" });
    }
  };

  const difficultyColors = {
    'Beginner': 'text-green-400 border-green-500/30 bg-green-500/10',
    'Intermediate': 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    'Advanced': 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    'Executive': 'text-purple-400 border-purple-500/30 bg-purple-500/10',
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
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-blue-500/10 text-blue-400 rounded-full text-xs md:text-sm font-semibold border border-blue-500/20">
                  EXPERT-LED EDUCATION
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                PentStark <span className="enterprise-text-gradient">Academy</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed px-4">
                Level up with expert-led courses. From fundamentals to advanced tactics, master the art of cybersecurity with industry-recognized certifications.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="enterprise-section py-12 md:py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {loading || userLoading ? (
                <div className="flex flex-col items-center justify-center py-16 col-span-full">
                  <img
                    key={loading ? 'loading-gif' : 'loaded'}
                    src="https://assets.pentstark.com/loading-labs.gif"
                    alt="Loading courses..."
                    className="h-52 mb-4"
                    style={{ imageRendering: 'auto' }}
                  />
                </div>
              ) : (
                courses.map((course) => (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="enterprise-card rounded-xl md:rounded-2xl overflow-hidden flex flex-col h-full group"
                  >
                    {/* Course Image */}
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.name}
                        className="w-full h-48 object-cover object-center bg-gray-900"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/30 to-background flex items-center justify-center text-4xl text-primary font-bold">
                        {course.name.charAt(0)}
                      </div>
                    )}
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-1">{course.name}</h2>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${difficultyColors[course.difficulty] || 'text-gray-400 border-gray-500/30 bg-gray-500/10'}`}>
                            {course.difficulty}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center text-yellow-400 mb-1">
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            <span className="text-sm font-semibold">{course.rating}</span>
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">{courseEnrollmentCounts[course.id] + 100 || 100} students</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-5 flex-grow font-mono line-clamp-3">{course.description}</p>

                      {/* <div className="mb-4">
                    <div className="font-semibold text-primary text-sm mb-1 flex items-center">
                      <Brain className="w-4 h-4 mr-1" /> Modules
                    </div>
                    <ul className="list-disc list-inside text-xs text-muted-foreground font-mono space-y-1">
                      {(modulesMap[course.id] || []).length > 0 ? (
                        modulesMap[course.id].map(mod => (
                          <li key={mod.id}>
                            <span className="font-semibold">{mod.name}</span>
                            {mod.description ? <> – <span className="text-xs">{mod.description}</span></> : null}
                          </li>
                        ))
                      ) : (
                        <li>No modules listed yet.</li>
                      )}
                    </ul>
                  </div> */}

                      <div className="flex items-center justify-between text-xs text-primary mb-5 font-mono">
                        <span className="flex items-center"><Brain className="w-4 h-4 mr-1" /> {modulesMap[course.id]?.length || 0} Modules</span>
                        <span className="flex items-center"><Award className="w-4 h-4 mr-1" /> {course.duration_hours} hours</span>
                      </div>

                      <div className="mt-auto space-y-2.5">
                        {isAuthenticated ? (
                          <Link to={`/academy/${course.id}`} className="block">
                            <Button variant="outline" className="w-full font-mono border-primary text-primary hover:bg-primary hover:text-background button-3d-hover">
                              View Course <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full font-mono border-primary text-primary hover:bg-primary hover:text-background button-3d-hover"
                            onClick={() => setShowAuthModal(true)}
                          >
                            View Course <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                        {userLoading ? (
                          <Button disabled className="w-full font-mono bg-gray-500 text-white">
                            Loading...
                          </Button>
                        ) : enrollments.includes(course.id) ? (
                          <Button disabled className="w-full font-mono bg-green-500 text-white">
                            Enrolled
                          </Button>
                        ) : (
                          <Button
                            className="w-full font-orbitron auth-button-primary"
                            onClick={() => handleEnroll(course)}
                          >
                            Enroll Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </section>

        {/* Corporate Training Section */}
        <section className="enterprise-section py-16 md:py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="enterprise-card rounded-xl md:rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 font-orbitron">
                  Corporate <span className="enterprise-text-gradient">Training</span>
                </h2>
                <p className="text-muted-foreground mb-8 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto">
                  Equip your team with cutting-edge cybersecurity skills. Custom programs tailored to your organization's needs.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 mb-8 text-sm font-mono">
                  <div className="text-center">
                    <Users className="h-10 w-10 text-secondary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Team Workshops</h3>
                    <p className="text-xs text-muted-foreground">Interactive & hands-on</p>
                  </div>
                  <div className="text-center">
                    <Target className="h-10 w-10 text-secondary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Skill-Specific Paths</h3>
                    <p className="text-xs text-muted-foreground">Targeted learning objectives</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-10 w-10 text-secondary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Certifications</h3>
                    <p className="text-xs text-muted-foreground">Industry recognized</p>
                  </div>
                </div>
                <Link to="/contact">
                  <Button size="lg" className="font-orbitron auth-button-secondary">
                    Inquire About Corporate Training
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              You need to sign in to access academy courses and track your progress.
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
    </motion.div>
  );
};

export default AcademyPage;