import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, itemVariants, sectionVariants } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, AlertTriangle, ShieldCheck, Lock, Globe2, Zap, ListChecks, FileText } from 'lucide-react';
import NotFoundPage from '@/pages/NotFoundPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/lib/supabase';

const iconMap = {
  security: ShieldCheck,
  privacy: Lock,
  global: Globe2,
};

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', serviceId)
        .single();
      setService(data || null);
      setLoading(false);
    };
    fetchService();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="text-center py-24 text-lg font-mono text-muted-foreground">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return <NotFoundPage message="Sorry, the service you're looking for doesn't exist or has been deprecated." />;
  }

  // Pick an icon based on category or fallback
  const Icon = iconMap[service.category?.toLowerCase()] || ShieldCheck;

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
          <Link to="/services" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-mono">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Services
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
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-md">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold animated-gradient-text">{service.title}</h1>
              </div>
              <Link to={`/contact?interest=${service.id}`} className="mt-4 md:mt-0">
                <Button size="lg" className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground button-3d-hover">
                  Request This Service
                </Button>
              </Link>
            </div>
          </div>
          
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/30 border-b border-border rounded-none p-0 h-12">
              <TabsTrigger value="description" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">
                 <FileText className="w-4 h-4 mr-2 hidden sm:inline-block"/>Description
              </TabsTrigger>
              <TabsTrigger value="features" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">
                 <ListChecks className="w-4 h-4 mr-2 hidden sm:inline-block"/>Features
              </TabsTrigger>
              <TabsTrigger value="casestudy" className="font-mono text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none h-full">
                 <Zap className="w-4 h-4 mr-2 hidden sm:inline-block"/>Case Study
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Service Overview</h2>
                <p className="text-muted-foreground leading-relaxed font-mono">{service.longDescription || service.description}</p>
                <div className="grid sm:grid-cols-2 gap-6 font-mono text-sm mt-6">
                    <div className="bg-card p-4 rounded-md border border-border">
                        <h4 className="font-semibold text-primary mb-1.5">Focus Area:</h4>
                        <p className="text-muted-foreground">{service.focusArea || 'Comprehensive Security Assessment'}</p>
                    </div>
                     <div className="bg-card p-4 rounded-md border border-border">
                        <h4 className="font-semibold text-primary mb-1.5">Typical Duration:</h4>
                        <p className="text-muted-foreground">{service.typicalDuration || 'Varies by scope'}</p>
                    </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="features" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Key Features & Benefits</h2>
                <ul className="space-y-3 grid sm:grid-cols-2 gap-x-6 gap-y-3 font-mono text-sm">
                  {(service.features || []).map((feature, idx) => (
                    <li key={idx} className="flex items-start text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {(service.features || []).length === 0 && (
                    <li className="text-muted-foreground/70">No features listed for this service.</li>
                  )}
                </ul>
                 <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Deliverables</h3>
                 <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {(service.deliverables || ["Detailed Report", "Executive Summary", "Remediation Guidance"]).map((item, idx) => (
                         <span key={idx} className="px-3 py-1 bg-muted text-muted-foreground rounded-full">{item}</span>
                    ))}
                 </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="casestudy" className="p-6 md:p-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Success Story Highlight</h2>
                {service.caseStudy ? (
                  <div className="bg-card p-6 rounded-lg border border-border font-mono">
                    <h3 className="text-xl font-semibold text-primary mb-2">{service.caseStudy.client}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.caseStudy.summary}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground font-mono">Case study information is not available for this service yet. Please check back later or contact us for more details.</p>
                )}
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Common Challenges Addressed</h3>
                <div className="flex flex-wrap gap-3 font-mono text-sm">
                     {(service.challengesAddressed || ["Data Breaches", "System Vulnerabilities", "Compliance Gaps", "Insider Threats"]).map((challenge, idx) => (
                      <div key={idx} className="flex items-center bg-card p-3 rounded-md border border-border">
                        <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{challenge}</span>
                      </div>
                    ))}
                 </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceDetailsPage;