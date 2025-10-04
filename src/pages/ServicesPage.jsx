import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ShieldCheck, Lock, Globe2 } from 'lucide-react';
import { pageVariants, sectionVariants, itemVariants } from '@/lib/animations';
import { supabase } from '@/lib/supabase';

const iconMap = {
  // Map your service categories or names to icons here
  security: ShieldCheck,
  privacy: Lock,
  global: Globe2,
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const start = Date.now(); // For minimum loading duration
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
      if (!error) setServices(data || []);
      // Ensure at least 3.5 seconds of loading
      const elapsed = Date.now() - start;
      const delay = Math.max(0, 3500 - elapsed);
      setTimeout(() => setLoading(false), delay);
    };
    fetchServices();
  }, []);

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
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-purple-500/10 text-purple-400 rounded-full text-xs md:text-sm font-semibold border border-purple-500/20">
                  ENTERPRISE SECURITY SOLUTIONS
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                Our <span className="enterprise-text-gradient">Security Services</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed px-4">
                Expert-driven cybersecurity solutions to fortify your defenses and mitigate risks effectively with industry-leading methodologies.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="enterprise-section py-12 md:py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <img
                  key={loading ? 'loading-gif' : 'loaded'}
                  src="https://assets.pentstark.com/loading-labs.gif"
                  alt="Loading services..."
                  className="h-52 mb-4"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            ) : (
              <motion.div 
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {services.map((service) => {
                  // Pick an icon based on category or fallback
                  const Icon = iconMap[service.category?.toLowerCase()] || ShieldCheck;
                  return (
                    <motion.div
                      key={service.id}
                      variants={itemVariants}
                      whileHover="hover"
                      className="enterprise-card rounded-xl md:rounded-2xl overflow-hidden flex flex-col h-full group"
                    >
                      <div className="p-6 md:p-8 flex-grow flex flex-col">
                        <div className="flex items-center mb-6">
                          <div className="p-3 md:p-4 bg-primary/10 rounded-xl mr-4">
                            <Icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">{service.title}</h2>
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow font-light leading-relaxed">{service.description}</p>
                        
                        <ul className="space-y-2 mb-8 text-sm md:text-base font-light">
                          {(service.features || []).slice(0,3).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-muted-foreground">
                              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary mr-3 flex-shrink-0" />
                              {feature}
                        </li>
                      ))}
                      {(service.features || []).length === 0 && (
                        <li className="text-muted-foreground/70">Key features coming soon.</li>
                      )}
                    </ul>
                    <Link to={`/services/${service.id}`} className="mt-auto block">
                      <Button className="w-full font-orbitron auth-button-primary">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ServicesPage;