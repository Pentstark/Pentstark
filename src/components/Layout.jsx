import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ChevronDown, Shield, ShieldCheck, Swords, Lock, ArrowRight, Cloud, Globe, Code, Smartphone, Server, Link2, Banknote as Bank, BrainCircuit as Brain } from "lucide-react";
import { useCases as useCasesData } from "@/data/useCases";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/clerk-auth.jsx";
import { supabase } from "@/lib/supabase";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { clerkDarkTheme } from "@/lib/clerk-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Avatar } from "@/components/ui/avatar"; // not used currently

// Navigation items will be defined inside the component

const Layout = ({ children }) => {
  // Navigation items definition
  const navItems = [
    { 
      name: "Services", 
      path: "/services", 
      requiresAuth: false, 
      hasDropdown: true,
      dropdownItems: [
        {
          id: 'ptaas',
          title: 'Pentest as a Service',
          description: 'Comprehensive security testing for your applications',
          icon: 'shield',
          path: '/services/ptaas'
        },
        {
          id: 'rtaas',
          title: 'Red Teaming',
          description: 'Real-world attack simulations to test your defenses',
          icon: 'swords',
          path: '/services/rtaas'
        },
        {
          id: 'psaas',
          title: 'Product Security',
          description: 'End-to-end security for your product development',
          icon: 'shield-lock',
          path: '/services/psaas'
        }
      ]
    },
    { 
      name: "Use Cases", 
      path: "/use-cases", 
      requiresAuth: false, 
      hasDropdown: true, 
      dropdownItems: useCasesData.map(uc => ({
        ...uc,
        path: `/use-cases/${uc.id}`
      }))
    },
    { name: "Training", path: "/labs", requiresAuth: false },
    { name: "Blogs", path: "/blogs", requiresAuth: false },
    { name: "About Us", path: "/about", requiresAuth: false },
      ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null); // 'services' | 'use-cases' | null
  
  const getUseCaseIcon = (iconName) => {
    switch (iconName) {
      // Service Icons
      case 'shield-check':
        return <ShieldCheck className="h-5 w-5" />;
      case 'swords':
        return <Swords className="h-5 w-5" />;
      case 'shield-lock':
        return <Lock className="h-5 w-5" />;
        
      // Use Case Icons
      case 'cloud':
        return <Cloud className="h-5 w-5" />;
      case 'globe':
        return <Globe className="h-5 w-5" />;
      case 'code':
        return <Code className="h-5 w-5" />;
      case 'smartphone':
        return <Smartphone className="h-5 w-5" />;
      case 'server':
        return <Server className="h-5 w-5" />;
      case 'link':
        return <Link2 className="h-5 w-5" />;
      case 'banknote':
        return <Bank className="h-5 w-5" />;
      case 'brain-circuit':
        return <Brain className="h-5 w-5" />;
        
      // Default icon
      default:
        return <Shield className="h-5 w-5" />;
    }
  };
  const location = useLocation();
  const navigate = useNavigate();
  const isBlogRoute = false;
  const { user, logout, loading } = useAuth();

  // Get Clerk user state directly for debugging
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();

  // Check if we're using Clerk or mock auth
  const hasClerk = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  // console.log("🔍 Layout Debug:", {
  //   user: user ? "Present" : "None",
  //   loading,
  //   hasClerk,
  //   isLoaded,
  //   isSignedIn,
  // });

  // Additional render condition debug
  // useEffect(() => {
  //   console.log("🎯 Render Check (Clerk):", {
  //     condition: !loading && user,
  //     loading,
  //     userExists: !!user,
  //     userEmail: user?.emailAddresses?.[0]?.emailAddress,
  //   });
  // }, [loading, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch services for navbar dropdown
  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title, description, category")
        .order("created_at", { ascending: true });
      if (!error && Array.isArray(data)) {
        setServices(data);
      }
    };
    fetchServices();
  }, []);
  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.id) {
        // console.log("Fetching profile for Clerk user:", user.emailAddresses[0].emailAddress);
        const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", user.emailAddresses[0].emailAddress)
        .single();
        // console.log("Fetching profile for Clerk user:", user.emailAddresses[0].emailAddress);
        if (!error && data) {
          // console.log("Profile fetched:", data);
          setProfile(data);
        } else {
          console.log("No profile found or error:", error);
          setProfile(null);
        }
      } else {
        // console.log("No user or user.id");
        setProfile(null);
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleNavLinkClick = (e, path, requiresAuth) => {
    if (requiresAuth && !user) {
      e.preventDefault();
      // Clerk will handle sign-in automatically when user clicks protected routes
    }
    setIsMenuOpen(false);
  };

  const userName =
    user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    user?.firstName ||
    "Account";

  return (
    <div className={`layout-container flex flex-col min-h-screen ${isBlogRoute ? 'bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]' : 'bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]'}`}>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[96%] max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px]">
        {/* Clean navbar with backdrop blur effects */}
        <div className="relative backdrop-blur-md bg-white/5 rounded-2xl overflow-visible">
          {/* Subtle gradient background effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 via-transparent to-fuchsia-500/5 opacity-60"></div>

          {/* Main navbar content - proper flexbox layout */}
          <div className="relative flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            {/* Logo with enhanced styling */}
            <Link
              to="/"
              className="flex items-center space-x-3 group flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
                <Zap className="relative h-9 w-9 text-primary transform -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <span className="text-4xl font-bold font-orbitron animated-gradient-text-purple group-hover:scale-105 transition-transform duration-300">
                PentStark
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center justify-center flex-grow mx-8 xl:mx-12 2xl:mx-16">
              <div className="flex items-center space-x-6 xl:space-x-8 2xl:space-x-10">
                {navItems.map((item) => {
                  if (item.requiresAuth && !user) return null;
                  
                  // Handle simple links without dropdown
                  if (!item.hasDropdown) {
                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={(e) => handleNavLinkClick(e, item.path, item.requiresAuth)}
                        className="relative px-2 py-2 rounded-xl transition-colors duration-200 group"
                      >
                        {({ isActive }) => (
                          <div className="flex items-center gap-2">
                            <span className={`${isActive ? "text-white font-semibold" : "text-gray-300/90"} text-sm group-hover:text-white`}>
                              {item.name}
                            </span>
                          </div>
                        )}
                      </NavLink>
                    );
                  }
                  
                  // Handle items with dropdown
                  const isServices = item.name === "Services";
                  const dropdownKey = isServices ? "services" : "use-cases";
                  const isOpen = dropdownOpen === dropdownKey;
                  
                  return (
                    <div key={item.name} className="relative">
                      <div 
                        className="group"
                        onMouseEnter={() => setDropdownOpen(dropdownKey)}
                        onMouseLeave={() => setDropdownOpen(null)}
                      >
                        <NavLink
                          to={item.path}
                          onClick={(e) => e.preventDefault()}
                          className="relative px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 group-hover:bg-white/5"
                          aria-haspopup="menu"
                          aria-expanded={isOpen}
                        >
                          <span className={`${isOpen ? "text-white" : "text-gray-300/90"} text-sm font-medium group-hover:text-white transition-colors`}>
                            {item.name}
                          </span>
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : 'text-gray-400'}`} />
                        </NavLink>

                        {/* Dropdown panel */}
                        {isOpen && (
                          <div
                            className="absolute left-0 top-full pt-1.5 transition-all duration-200 ease-out z-50"
                            onMouseEnter={() => setDropdownOpen(dropdownKey)}
                            onMouseLeave={() => setDropdownOpen(null)}
                          >
                            <div className="relative backdrop-blur-3xl bg-gradient-to-br from-white/8 via-gray-500/3 to-purple-500/5 border border-white/20 rounded-2xl shadow-2xl overflow-hidden w-[380px] ring-1 ring-white/10 ring-offset-2 ring-offset-black/20">
                              {/* Multiple gradient layers for premium depth */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-400/5 via-transparent to-purple-500/8 opacity-40"></div>
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-gray-300/3 to-transparent opacity-30"></div>
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-purple-500/3 via-transparent to-fuchsia-500/3 opacity-20"></div>

                              {/* Subtle animated gradient overlay */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-gray-300/2 to-transparent opacity-10 animate-pulse"></div>

                              {/* Premium inner glow effect */}
                              <div className="absolute inset-0 rounded-2xl shadow-inner shadow-white/5"></div>
                              <div className="relative p-1.5">
                                {item.dropdownItems.map((menuItem) => (
                                  <Link
                                    key={menuItem.id}
                                    to={menuItem.path}
                                    className="flex items-start gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-300/8 hover:to-gray-400/5 transition-all duration-500 group/item backdrop-blur-md relative overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 hover:scale-[1.03] border border-transparent hover:border-gray-300/10"
                                  >
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-lg transition-all duration-500 group-hover/item:scale-125 group-hover/item:rotate-3 ${
                                      isServices
                                        ? 'bg-gradient-to-br from-gray-300/8 to-gray-400/5 text-primary group-hover/item:bg-gradient-to-br group-hover/item:from-purple-500/25 group-hover/item:to-fuchsia-500/25 shadow-xl border border-gray-300/10' 
                                        : menuItem.color 
                                          ? `bg-gradient-to-br from-gray-300/8 to-gray-400/5 text-${menuItem.color.split(' ')[0].split('-')[1]}-400 group-hover/item:bg-gradient-to-br group-hover/item:from-purple-500/25 group-hover/item:to-fuchsia-500/25 shadow-xl border border-gray-300/10`
                                          : 'bg-gradient-to-br from-gray-300/8 to-gray-400/5 text-gray-200 group-hover/item:bg-gradient-to-br group-hover/item:from-purple-500/25 group-hover/item:to-fuchsia-500/25 shadow-xl border border-gray-300/10'
                                    }`}>
                                      {isServices ? (
                                        menuItem.icon === 'shield' ? <ShieldCheck className="h-4 w-4" /> :
                                        menuItem.icon === 'swords' ? <Swords className="h-4 w-4" /> :
                                        <Lock className="h-4 w-4" />
                                      ) : (
                                        getUseCaseIcon(menuItem.icon)
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-sm font-semibold text-white group-hover/item:text-primary transition-all duration-500 group-hover/item:translate-x-1 tracking-wide">
                                        {menuItem.title}
                                      </div>
                                      <p className="text-xs text-gray-300 mt-1 line-clamp-1 group-hover/item:text-gray-100 transition-all duration-500 leading-relaxed">
                                        {menuItem.description}
                                      </p>
                                    </div>
                                    <ArrowRight className="ml-auto h-5 w-5 text-gray-300 group-hover/item:translate-x-2 group-hover/item:text-primary transition-all duration-500 group-hover/item:scale-110" />
                                  </Link>
                                ))}
                              </div>
                              {isServices && (
                                <div className="border-t border-gray-300/20 p-3 bg-gradient-to-r from-transparent via-gray-400/5 to-transparent backdrop-blur-md">
                                  <Link
                                    to={item.path}
                                    className="w-full flex items-center justify-center gap-3 text-sm font-medium text-gray-200 hover:text-white px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-fuchsia-500/10 transition-all duration-500 group/all-items hover:scale-105 border border-transparent hover:border-gray-300/20 hover:shadow-lg"
                                  >
                                    Explore all services
                                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover/all-items:translate-x-2 group-hover/all-items:scale-110 transition-all duration-500" />
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side container - Get Started button and auth/mobile */}
            <div className="flex items-center space-x-3 xl:space-x-4 2xl:space-x-5 flex-shrink-0">
              {/* Book a Call button (desktop) */}
              <a 
                href="https://cal.com/pentstark/speak-to-an-expert" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden lg:block"
              >
                <Button
                  size="sm"
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-5 py-2 shadow-md hover:shadow-lg hover:brightness-110 transition-all hover:from-purple-500 hover:to-fuchsia-500"
                >
                  Book a Call
                </Button>
              </a>
              
              {/* Get Started button (desktop) */}
              <Link to="/contact" className="hidden lg:block ml-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-white/20 text-white px-5 py-2 hover:bg-white/5 hover:border-white/30 transition-all"
                >
                  Get Started
                </Button>
              </Link>
              {/* Auth avatar (desktop) */}
              <div className="hidden lg:flex items-center">
                {hasClerk && (
                  <SignedIn>
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox:
                              "relative h-10 w-10 hover:scale-110 transition-transform duration-300 border-2 border-primary/40 hover:border-primary/60",
                          },
                        }}
                      />
                    </div>
                  </SignedIn>
                )}
              </div>

              {/* Minimalist mobile menu button - clean and simple */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:text-primary hover:bg-white/5 transition-all duration-300 rounded-lg p-3 w-12 h-12 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative flex items-center justify-center">
                  {isMenuOpen ? (
                    <X className="h-6 w-6 transition-transform duration-300 text-white" />
                  ) : (
                    <Menu className="h-6 w-6 transition-transform duration-300 text-white" />
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden absolute top-full left-0 right-0 mt-2"
            >
              <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-2xl shadow-purple-500/20 mx-4 overflow-hidden">
                {/* Subtle gradient border effect for mobile menu */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-transparent to-fuchsia-500/10 opacity-60"></div>

                <div className="relative px-4 py-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="w-full"
                    >
                      <div className="flex flex-col">
                        <NavLink
                          to={item.path}
                          onClick={(e) => {
                            if (item.hasDropdown) {
                              e.preventDefault();
                              setDropdownOpen(dropdownOpen === item.name.toLowerCase() ? null : item.name.toLowerCase());
                            } else {
                              handleNavLinkClick(e, item.path, item.requiresAuth);
                            }
                          }}
                          className="group relative flex items-center justify-between py-2.5 px-3 rounded-lg transition-all duration-300 hover:bg-white/5 min-h-[44px]"
                        >
                          {({ isActive }) => (
                            <>
                              <div className="relative flex items-center space-x-3">
                                <span
                                  className={`font-medium text-sm uppercase tracking-wide transition-all duration-300 ${
                                    isActive
                                      ? "text-white"
                                      : "text-gray-300/90 group-hover:text-white"
                                  }`}
                                >
                                  {item.name}
                                </span>
                                {isActive && (
                                  <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></div>
                                )}
                              </div>
                              {item.hasDropdown && (
                                <ChevronDown 
                                  className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen === item.name.toLowerCase() ? 'rotate-180' : ''}`} 
                                />
                              )}
                            </>
                          )}
                        </NavLink>

                        {/* Mobile Dropdown Items */}
                        {item.hasDropdown && dropdownOpen === item.name.toLowerCase() && (
                          <div className="ml-6 mt-1 space-y-1">
                            {item.dropdownItems?.map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (subIndex * 0.05), duration: 0.2 }}
                              >
                                <Link
                                  to={subItem.path}
                                  className="flex items-center gap-2 py-2 px-3 text-sm text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5 backdrop-blur-sm min-h-[44px]"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                  {subItem.title}
                                </Link>
                              </motion.div>
                            ))}
                            {item.name === "Services" && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + ((item.dropdownItems?.length || 0) * 0.05), duration: 0.2 }}
                                className="pt-1"
                              >
                                <Link
                                  to={item.path}
                                  className="flex items-center gap-2 py-2 px-3 text-sm text-primary hover:text-primary/80 font-medium rounded-lg transition-all duration-200 hover:bg-white/5 backdrop-blur-sm"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <ArrowRight className="h-3.5 w-3.5" />
                                  View all services
                                </Link>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Mobile CTA buttons and auth avatar */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: navItems.length * 0.05,
                      duration: 0.2,
                    }}
                    className="pt-3 space-y-3 border-t border-white/10"
                  >
                    {/* CTA buttons (mobile) */}
                    <div className="grid grid-cols-1 gap-2">
                      <a
                        href="https://cal.com/pentstark/speak-to-an-expert"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          size="sm"
                          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-2.5 shadow-md hover:shadow-lg hover:brightness-110 transition-all hover:from-purple-500 hover:to-fuchsia-500"
                        >
                          Book a Call
                        </Button>
                      </a>
                      <Link to="/contact" className="w-full" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full rounded-lg border-white/20 text-white py-2.5 hover:bg-white/5 hover:border-white/30 transition-all"
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>

                    {/* Mobile auth avatar only */}
                    {hasClerk && (
                      <SignedIn>
                        <div className="flex items-center justify-center pt-1">
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                            <UserButton
                              afterSignOutUrl="/"
                              appearance={{
                                elements: {
                                  avatarBox: "relative h-10 w-10 border-2 border-primary/40",
                                },
                              }}
                            />
                          </div>
                        </div>
                      </SignedIn>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <main className="flex-grow pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 relative z-10">
        {children}
      </main>
      <footer className="relative enterprise-section py-10">
        {/* Gradient backgrounds */}
        {!isBlogRoute && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
          </>
        )}

        {/* Middle horizontal lines and CTA */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-12 pb-6 relative">
          <div className="relative">
            <div className="absolute top-0 left-[-15px] right-[-15px] h-px bg-white/10 scale-y-50 origin-top"></div>
            <div className="absolute bottom-0 left-[-15px] right-[-15px] h-px bg-white/10 scale-y-50 origin-bottom"></div>
          </div>
          <div className="space-y-1 pt-10 sm:pt-14">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-white font-medium text-[1.5rem] sm:text-[2em] ml-[-15px]">
                  Your work matters.
                </h2>
                <h2 className="font-medium text-[1.5rem] sm:text-[2em] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent ml-[-15px]">
                  Together, we secure the future.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 whitespace-nowrap mr-[-15px]">
                <a
                  href="http://cal.com/pentstark/speak-to-an-expert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-md border border-white text-white text-sm sm:text-base font-semibold transition hover:bg-white hover:text-black"
                >
                  <span className="px-6 py-3 flex items-center">
                    Speak to an Expert <span className="ml-2">»</span>
                  </span>
                </a>

                <a
                  href="https://cal.com/pentstark/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-md border border-white text-white text-sm sm:text-base font-semibold transition hover:bg-white hover:text-black"
                >
                  <span className="px-6 py-3 flex items-center">
                    Schedule a Demo <span className="ml-2">»</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Top horizontal line */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-6 sm:pt-8 mb-2 sm:mb-3 relative">
          <div className="relative">
            <div className="absolute top-0 left-[-15px] right-[-15px] h-px bg-white/10"></div>
          </div>

          {/* Logo and badges */}
          <div className="flex flex-col sm:flex-row items-start sm:items-start mb-4 pt-12 gap-8">
            {/* Mobile: ISO left, AWS logos right */}
            <div className="flex justify-between items-center w-full sm:hidden mb-4">
              <img
                src="https://assets.pentstark.com/ISOcertified.png"
                alt="Company Logo"
                className="h-16 w-16"
              />
              <div className="flex gap-2">
                <img
                  src="https://assets.pentstark.com/awspartner.png"
                  alt="AWS Partner"
                  className="h-16 w-16"
                />
                <img
                  src="https://assets.pentstark.com/qualitysoft.png"
                  alt="AWS Qualified Software"
                  className="h-16 w-16"
                />
              </div>
            </div>

            {/* Desktop: original layout */}
            <div className="hidden sm:flex flex-col space-y-6 min-w-[200px]">
              <img
                src="https://assets.pentstark.com/ISOcertified.png"
                alt="Company Logo"
                className="h-[5em] w-[5em]"
              />
              <div className="flex gap-4">
                <img
                  src="https://assets.pentstark.com/awspartner.png"
                  alt="AWS Partner"
                  className="h-[5em] w-[5em]"
                />
                <img
                  src="https://assets.pentstark.com/qualitysoft.png"
                  alt="AWS Qualified Software"
                  className="h-[5em] w-[5em]"
                />
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-8 sm:ml-auto w-full sm:w-auto">
              {/* Company */}
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-4 font-orbitron">
                  Company
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li>
                    <a
                      href="/services"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="/labs"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      Training Labs
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/careers"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-4 font-orbitron">
                  Resources
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li>
                    <a
                      href="/contact"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="/security"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      Security
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/pentstark"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/pentstark"
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      X
                    </a>
                  </li>
                </ul>
              </div>

              {/* Offices */}
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-4 font-orbitron">
                  Offices
                </h3>
                <div className="space-y-2 sm:space-y-3 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-white">India</h4>
                    <p>Citadel A 1 Manipal County Club Road,</p>
                    <p>Bangalore South, India</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">California</h4>
                    <p>1601 S California Avenue, Palo Alto</p>
                    <p>CA 94304, United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom horizontal line and legal links */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-6 sm:pt-8 relative">
          <div className="relative">
            <div className="absolute top-0 left-[-15px] right-[-15px] h-px bg-white/10"></div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-muted-foreground relative mt-6 gap-2 sm:gap-0">
            <a
              href="/privacy"
              className="hover:text-primary transition-colors sm:ml-[-15px] ml-0"
            >
              PRIVACY POLICY
            </a>
            <a
              href="/terms"
              className="hover:text-primary transition-colors sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 relative"
            >
              TERMS OF SERVICE
            </a>
            <a
              href="/about"
              className="hover:text-primary transition-colors sm:mr-[-15px] mr-0"
            >
              © 2025 PENTSTARK LLP
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
