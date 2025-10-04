import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Swords,
  Eye,
  ShieldAlert,
  Target,
  Search,
  FileText,
  Users,
  Layers,
  Clock,
  LifeBuoy,
  ArrowRight,
  Quote,
  Star,
  CheckCircle2,
  Zap,
  Shield,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { pageVariants, sectionVariants, itemVariants } from "@/lib/animations";

const FeatureCard = ({ icon: Icon, title, children }) => (
  <Card className="h-full border-white/10 bg-white/5 hover:border-primary/40 transition-colors group relative overflow-hidden">
    <CardContent className="p-5 md:p-6">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-primary/10 rounded-lg text-primary shrink-0 group-hover:scale-110 transition-transform">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold mb-1.5">{title}</h3>
          <p className="text-sm text-muted-foreground">{children}</p>
        </div>
      </div>
    </CardContent>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </Card>
);

const StepCard = ({ number, title, description, icon: Icon }) => (
  <div className="group relative">
    <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 via-red-500/20 to-red-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Card className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:border-red-500/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-red-500/10">
      {/* Step badge */}
      <div className="absolute -top-3 left-6">
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-red-500/10 text-red-400 border border-red-500/30 text-sm font-bold tracking-wider shadow-lg backdrop-blur-sm">
          {number}
        </div>
      </div>
      <CardContent className="p-6 md:p-8">
        {/* Accent bar */}
        <div className="mb-6 h-1 w-16 bg-gradient-to-r from-red-500/60 to-red-500/30 rounded-full opacity-80 group-hover:w-full transition-all duration-500" />
        <div className="flex items-start gap-5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 text-red-400 ring-2 ring-red-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold font-orbitron mb-3 text-lg group-hover:text-red-400 transition-colors">
              {title}
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="group relative">
    <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-red-500/10 to-red-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative text-center border border-white/10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/10">
      <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300 font-orbitron">
        {value}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium font-orbitron">
        {label}
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ quote, author, role }) => (
  <Card className="h-full border-transparent bg-gradient-to-br from-white/5 to-transparent p-[1px] rounded-2xl">
    <div className="bg-[#111319] h-full rounded-[15px] p-5 md:p-6 flex flex-col">
      <div className="flex items-center gap-1 text-yellow-400 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <Quote className="h-6 w-6 text-red-400/70 mb-3" />
      <p className="text-sm text-muted-foreground flex-1">"{quote}"</p>
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="font-medium">{author}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </div>
  </Card>
);

const FAQItem = ({ q, a }) => (
  <details className="group bg-white/5 rounded-xl border border-white/10 p-4 transition-all hover:border-red-500/40 cursor-pointer">
    <summary className="list-none cursor-pointer flex items-center justify-between gap-3 py-2 min-h-[44px]">
      <span className="font-medium text-left pr-2">{q}</span>
      <span className="text-red-400 transform transition-transform duration-300 group-open:rotate-45 flex-shrink-0 text-xl">
        +
      </span>
    </summary>
    <div className="text-sm text-muted-foreground mt-3 pt-3 border-t border-white/10 overflow-hidden transition-all duration-300">
      {a}
    </div>
  </details>
);

const RTaaSPage = () => {
  useEffect(() => {
    console.info("[Services] Opened: RTaaSPage.jsx (Red Teaming as a Service)");
  }, []);

  const testimonials = [
    {
      quote:
        "The red team exercise exposed critical gaps in our detection capabilities that no automated tool could find. Their methodology was exceptional.",
      author: "CISO, Financial Services",
      role: "Fortune 500 Bank",
    },
    {
      quote:
        "From initial planning to post-exercise debrief, the red team operated with military precision. The insights were immediately actionable.",
      author: "Security Director, Healthcare",
      role: "Regional Hospital Network",
    },
    {
      quote:
        "The purple team collaboration helped us mature our detection engineering and response processes significantly.",
      author: "SOC Manager, Technology",
      role: "Global SaaS Platform",
    },
  ];

  const faqs = [
    {
      q: "What's the difference between red teaming and penetration testing?",
      a: "Red teaming goes beyond traditional pentesting by simulating sophisticated, persistent adversaries with specific objectives, testing detection and response capabilities, and providing strategic insights for security program improvement.",
    },
    {
      q: "How long does a red team exercise typically take?",
      a: "Most red team engagements span 2-6 weeks, depending on scope, objectives, and the size of your environment. This includes planning, execution, and comprehensive reporting phases.",
    },
    {
      q: "Do you work with our existing security team during the exercise?",
      a: "Absolutely. We can operate in purple team mode, collaborating with your blue team for knowledge transfer, or conduct black-box exercises where defenders are unaware of the operation.",
    },
    {
      q: "What deliverables do we receive after the engagement?",
      a: "You'll receive detailed reports on TTPs used, detection gaps identified, remediation recommendations, and strategic guidance for improving your overall security posture.",
    },
  ];

  const whyItems = [
    {
      text: "Adversary emulation using real-world TTPs and threat intelligence.",
    },
    { text: "Comprehensive detection and response capability assessment." },
    { text: "Purple team collaboration for maximum learning and improvement." },
    { text: "Strategic insights beyond technical vulnerabilities." },
    { text: "Post-engagement support and program maturity guidance." },
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-transparent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute -z-10 top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-red-500/30 via-red-500/10 to-transparent blur-3xl opacity-60" />
      <div className="absolute -z-10 bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-red-500/20 via-transparent to-red-500/10 blur-3xl opacity-50" />
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-radial from-red-500/5 via-transparent to-transparent opacity-30" />

      {/* HERO */}
      <section className="enterprise-section py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="glass-effect-purple rounded-2xl p-6 md:p-10 border border-white/10 relative overflow-hidden"
          >
            {/* Enhanced background effects */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-red-500/25 via-red-500/5 to-transparent blur-3xl opacity-70" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-red-500/15 via-transparent to-red-500/10 blur-2xl opacity-60" />

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/10 rounded-2xl blur-xl opacity-50" />
                <div className="relative flex items-start gap-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-red-500/10 via-transparent to-red-500/5 border border-red-500/20">
                  <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-xl text-red-400 shadow-lg">
                    <Swords className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold font-orbitron bg-gradient-to-r from-white via-red-400/90 to-white bg-clip-text text-transparent">
                      Red Teaming as a Service (RTaaS)
                    </h1>
                    <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
                      Simulate sophisticated adversaries to test your detection
                      capabilities, response processes, and overall security
                      resilience.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6 p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-transparent border border-yellow-500/20">
                  <div className="flex items-center gap-2 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                      />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">
                    Rated 5/5 by security leaders
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    variant="enterprise"
                    size="lg"
                    className="shadow-2xl shadow-red-500/25"
                  >
                    <Link to="/contact" className="gap-2">
                      Start Red Team Exercise
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="backdrop-blur-sm border-white/20 hover:border-white/40"
                  >
                    <Link to="/contact">Schedule Consultation</Link>
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[300px] md:min-h-full">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/10 rounded-2xl blur-xl opacity-60" />
                <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl">
                  <img
                    src="/favicons/rtaas.png"
                    alt="Red Teaming as a Service"
                    className="w-full h-auto object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-transparent opacity-30" />
                </div>
              </div>
            </div>

            {/* TRUST BAR */}
            <div className="mt-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/40" />
                <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                  Trusted by Security Teams at
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/40" />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-sm">
                {[
                  "Financial Services",
                  "Healthcare",
                  "Government",
                  "Technology",
                  "Defense",
                  "Critical Infrastructure",
                ].map((name) => (
                  <div
                    key={name}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-br from-white/10 to-white/5 rounded-lg p-3 border border-white/10 hover:border-red-500/30 hover:bg-gradient-to-br hover:from-red-500/10 hover:to-red-500/5 transition-all duration-300"
                  >
                    <span className="font-medium text-muted-foreground group-hover:text-red-400 transition-colors">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <StatCard label="Avg. Duration" value="2-6 Weeks" />
            <StatCard label="Detection Rate" value="85%+" />
            <StatCard label="Response Time" value="< 4 Hours" />
            <StatCard label="TTP Coverage" value="MITRE ATT&CK" />
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/3 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 gap-8 md:gap-16"
          >
            <motion.div variants={itemVariants}>
              <div className="sticky top-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                  <Badge
                    variant="secondary"
                    className="bg-red-500/20 text-red-400 border-red-500/30"
                  >
                    Why choose RTaaS
                  </Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-white via-red-400/90 to-white bg-clip-text text-transparent">
                  Why Red Teaming as a Service with PentStark?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Military-grade adversary emulation with real-world threat
                  intelligence and comprehensive detection assessment.
                </p>
                <div className="flex gap-4">
                  <Button
                    asChild
                    variant="enterprise"
                    className="shadow-xl shadow-red-500/20"
                  >
                    <Link to="/contact" className="gap-2">
                      Get started
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="backdrop-blur-sm">
                    <Link to="/services">Explore services</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              {whyItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-transparent bg-gradient-to-br from-white/8 to-white/3 hover:border-red-500/30 hover:bg-gradient-to-br hover:from-red-500/10 hover:to-red-500/5 transition-all duration-300"
                >
                  <div className="mt-1 p-2 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="h-5 w-5 text-red-400" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="glass-effect-purple rounded-2xl p-6 md:p-10 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">How it works</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">
              Red Team Exercise Process
            </h2>
            <p className="text-muted-foreground mt-2">
              A structured approach from intelligence gathering to strategic
              recommendations.
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-8">
              <motion.div variants={itemVariants}>
                <StepCard
                  number="STEP 1"
                  title="Intelligence & Planning"
                  description="Threat intelligence gathering and exercise scoping aligned with your threat model and business objectives."
                  icon={Target}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StepCard
                  number="STEP 2"
                  title="Reconnaissance"
                  description="Passive and active intelligence gathering to map your attack surface and identify initial access vectors."
                  icon={Search}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StepCard
                  number="STEP 3"
                  title="Initial Access & Persistence"
                  description="Simulate sophisticated adversaries establishing footholds and maintaining persistence in your environment."
                  icon={Swords}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StepCard
                  number="STEP 4"
                  title="Lateral Movement"
                  description="Test internal network segmentation, privilege escalation, and data exfiltration capabilities."
                  icon={Eye}
                />
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-2">
                <StepCard
                  number="STEP 5"
                  title="Detection & Response Assessment"
                  description="Comprehensive analysis of blue team detection, response times, and effectiveness against real-world TTPs."
                  icon={ShieldAlert}
                />
              </motion.div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button asChild variant="enterprise" size="lg">
                <Link to="/contact" className="gap-2">
                  Start Red Team Exercise
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <span className="text-xs md:text-sm text-muted-foreground">
                Includes post-exercise debrief and strategic recommendations.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-red-500/20 via-red-500/10 to-transparent p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold">
                  Test Your Defenses Against Real Adversaries
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Get comprehensive red team assessments aligned with today's
                  threat landscape.
                </p>
              </div>
              <div className="flex md:justify-end items-center gap-4">
                <Button asChild variant="enterprise" size="lg">
                  <Link to="/contact" className="gap-2">
                    Schedule Red Team Exercise
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">
              Red Teaming Solutions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Eye} title="Adversary Emulation">
                  Simulate nation-state and criminal threat actors using current
                  TTPs and real-world scenarios.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={ShieldAlert} title="Detection Engineering">
                  Test and improve your security monitoring, alerting, and
                  automated response capabilities.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Users} title="Purple Team Exercises">
                  Collaborative engagements with your security team for maximum
                  knowledge transfer.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Target} title="Objective-Based Testing">
                  Goal-oriented exercises focused on specific business risks and
                  compliance requirements.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Layers} title="Multi-Vector Attacks">
                  Test defenses across network, application, physical, and
                  social engineering vectors.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={FileText} title="Executive Reporting">
                  Strategic insights and actionable recommendations for security
                  program improvement.
                </FeatureCard>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="enterprise" size="lg">
                <Link to="/contact" className="gap-2">
                  Start Red Team Exercise
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <span className="text-xs md:text-sm text-muted-foreground">
                Comprehensive reporting and strategic guidance included.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Client success</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">
              Trusted by Security Leaders
            </h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
              {testimonials.map((t, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <TestimonialCard {...t} />
                </motion.div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-red-400 hover:underline"
              >
                Read more case studies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">
              Why Organizations Choose Our Red Teaming
            </h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
              <motion.div variants={itemVariants}>
                <Card className="border-white/10 bg-white/5 hover:border-red-500/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Fortune 500 Bank: Ransomware Attack Chain Disruption
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Major international bank with $2.3T in assets tested their
                    ransomware defenses. Our red team successfully simulated a
                    sophisticated ransomware attack chain, compromising 47
                    systems across 3 domains in under 4 hours. This exposed
                    critical gaps in their backup segregation and network
                    isolation strategies.
                    <div className="mt-3">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1 text-red-400 text-sm hover:text-red-300 transition-colors"
                      >
                        Read full case study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="border-white/10 bg-white/5 hover:border-red-500/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Aerospace Giant: Insider Threat Detection Enhancement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Leading aerospace manufacturer engaged our red team to test
                    insider threat scenarios. We demonstrated how a compromised
                    privileged account could exfiltrate sensitive design data
                    and disrupt manufacturing systems. Result: 65% improvement
                    in insider threat detection and implementation of zero-trust
                    access controls.
                    <div className="mt-3">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1 text-red-400 text-sm hover:text-red-300 transition-colors"
                      >
                        Read full case study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="border-white/10 bg-white/5 hover:border-red-500/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Government Agency: Cloud Migration Security Validation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Federal intelligence agency migrating to multi-cloud
                    infrastructure needed comprehensive security validation. Our
                    red team identified 19 misconfigurations and 8 attack paths
                    across AWS, Azure, and GCP environments, preventing
                    potential data exposure of classified information and
                    ensuring compliance with federal security standards.
                    <div className="mt-3">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1 text-red-400 text-sm hover:text-red-300 transition-colors"
                      >
                        Read full case study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-6">
              {faqs.map((f, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <FAQItem q={f.q} a={f.a} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default RTaaSPage;
