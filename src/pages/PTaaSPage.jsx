import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Bug,
  Search,
  Users,
  Layers,
  Clock,
  LifeBuoy,
  Target,
  FileText,
  Wrench,
  RefreshCw,
  Globe,
  Smartphone,
  Code,
  Monitor,
  Server,
  Cpu,
  ArrowRight,
  Quote,
  Star,
  CheckCircle2,
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
    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Card className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:border-primary/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10">
      {/* Step badge */}
      <div className="absolute -top-3 left-6">
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 text-sm font-bold tracking-wider shadow-lg backdrop-blur-sm">
          {number}
        </div>
      </div>
      <CardContent className="p-6 md:p-8">
        {/* Accent bar */}
        <div className="mb-6 h-1 w-16 bg-gradient-to-r from-primary/60 to-primary/30 rounded-full opacity-80 group-hover:w-full transition-all duration-500" />
        <div className="flex items-start gap-5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary ring-2 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold font-orbitron mb-3 text-lg group-hover:text-primary transition-colors">
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
    <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative text-center border border-white/10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300 font-orbitron">
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
      <Quote className="h-6 w-6 text-primary/70 mb-3" />
      <p className="text-sm text-muted-foreground flex-1">“{quote}”</p>
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="font-medium">{author}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </div>
  </Card>
);

const FAQItem = ({ q, a }) => (
  <details className="group bg-white/5 rounded-xl border border-white/10 p-4 transition-all hover:border-primary/40 cursor-pointer">
    <summary className="list-none cursor-pointer flex items-center justify-between gap-3 py-2 min-h-[44px]">
      <span className="font-medium text-left pr-2">{q}</span>
      <span className="text-primary transform transition-transform duration-300 group-open:rotate-45 flex-shrink-0 text-xl">
        +
      </span>
    </summary>
    <div className="text-sm text-muted-foreground mt-3 pt-3 border-t border-white/10 overflow-hidden transition-all duration-300">
      {a}
    </div>
  </details>
);

const PTaaSPage = () => {
  useEffect(() => {
    console.info("[Services] Opened: PTaaSPage.jsx (Pentest as a Service)");
  }, []);

  const testimonials = [
    {
      quote:
        "The team uncovered critical issues scanners missed and provided actionable fixes. Turnaround was fast and highly professional.",
      author: "Security Lead, Fintech Co.",
      role: "Global Payments Platform",
    },
    {
      quote:
        "Clear reporting, realistic exploit paths, and collaborative remediation support. Exactly what we needed before a major release.",
      author: "Head of Engineering, SaaS",
      role: "B2B Collaboration Suite",
    },
    {
      quote:
        "From scoping to retesting, the process was smooth. The findings helped us uplift our overall security posture.",
      author: "CTO, Healthcare",
      role: "Digital Health Services",
    },
  ];

  const faqs = [
    {
      q: "How long does a typical pentest take?",
      a: "Most assessments complete within 7–14 days depending on scope, complexity, and the number of assets in scope.",
    },
    {
      q: "What methodology do you follow?",
      a: "We combine manual hacker-led testing with automation aligned to OWASP, NIST, CREST, and MITRE ATT&CK, adapted to your environment.",
    },
    {
      q: "Do you provide remediation support and retesting?",
      a: "Yes. We offer guided remediation with code and configuration examples, followed by retesting to validate fixes.",
    },
    {
      q: "Can you test during our release cycle?",
      a: "Absolutely. We align with sprints and release milestones, and can provide on-demand or recurring coverage.",
    },
  ];

  const whyItems = [
    { text: "Manual + automated testing with real attacker mindset." },
    { text: "Led by top bug bounty hunters and seasoned pentesters." },
    { text: "Compliance-ready outputs (SOC 2, ISO 27001, PCI-DSS)." },
    {
      text: "Actionable reports with PoCs, clear reproduction steps, and risk ratings.",
    },
    { text: "Remediation assistance and free retesting included." },
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
      <div className="absolute -z-10 top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-3xl opacity-60" />
      <div className="absolute -z-10 bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-3xl opacity-50" />
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />

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
            <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-primary/25 via-primary/5 to-transparent blur-3xl opacity-70" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-primary/15 via-transparent to-primary/10 blur-2xl opacity-60" />

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 rounded-2xl blur-xl opacity-50" />
                <div className="relative flex items-start gap-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 border border-primary/20">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl text-primary shadow-lg">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold font-orbitron bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text text-transparent">
                      Pentest as a Service (PTaaS)
                    </h1>
                    <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
                      Identify, analyze, and remediate vulnerabilities with
                      expert-driven pentesting tailored for your needs.
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
                    Rated 5/5 by security-conscious teams
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    variant="enterprise"
                    size="lg"
                    className="shadow-2xl shadow-primary/25"
                  >
                    <Link to="/contact" className="gap-2">
                      Request a Penetration Test
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="backdrop-blur-sm border-white/20 hover:border-white/40"
                  >
                    <Link to="/contact">Book a demo</Link>
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[300px] md:min-h-full">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 rounded-2xl blur-xl opacity-60" />
                <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl">
                  <img
                    src="/favicons/ptaas.png"
                    alt="Pentest as a Service"
                    className="w-full h-auto object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-30" />
                </div>
              </div>
            </div>

            {/* TRUST BAR */}
            <div className="mt-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
                <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                  Trusted In Environments Like
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-sm">
                {["AWS", "Azure", "GCP", "Kubernetes", "PCI-DSS", "HIPAA"].map(
                  (name) => (
                    <div
                      key={name}
                      className="group flex items-center justify-center gap-2 bg-gradient-to-br from-white/10 to-white/5 rounded-lg p-3 border border-white/10 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/5 transition-all duration-300"
                    >
                      <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        {name}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <StatCard label="Avg. Delivery" value="7–14 Days" />
            <StatCard label="TTP Coverage" value=">90%" />
            <StatCard label="Retesting" value="Included" />
            <StatCard label="Standards" value="NIST/OWASP" />
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/3 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 gap-8 md:gap-16"
          >
            <motion.div variants={itemVariants}>
              <div className="sticky top-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary border-primary/30"
                  >
                    Why choose us
                  </Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text text-transparent">
                  Why Pentest as a Service with PentStark?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Hacker-led methodology, streamlined delivery, and high-signal
                  reports that accelerate remediation.
                </p>
                <div className="flex gap-4">
                  <Button
                    asChild
                    variant="enterprise"
                    className="shadow-xl shadow-primary/20"
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
                  className="group flex items-start gap-4 p-5 rounded-xl border border-transparent bg-gradient-to-br from-white/8 to-white/3 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/5 transition-all duration-300"
                >
                  <div className="mt-1 p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
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
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/2 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="glass-effect-purple rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
          >
            {/* Enhanced background effects */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl opacity-60" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 blur-2xl opacity-50" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary border-primary/30"
                >
                  How it works
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text text-transparent">
                How Our Pen Test Works
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl">
                A structured approach from scoping to retesting.
              </p>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <motion.div variants={itemVariants}>
                  <StepCard
                    number="STEP 1"
                    title="Scoping"
                    description="Our team defines goals and a scope tailored to your applications and infrastructure."
                    icon={Target}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <StepCard
                    number="STEP 2"
                    title="Testing"
                    description="Skilled security experts simulate real-world attack scenarios to identify vulnerabilities."
                    icon={Search}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <StepCard
                    number="STEP 3"
                    title="Reporting"
                    description="Comprehensive VA/PT reports provide clear, detailed, and actionable insights."
                    icon={FileText}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <StepCard
                    number="STEP 4"
                    title="Remediation"
                    description="Guided solutions to identify and address hidden vulnerabilities within your systems."
                    icon={Wrench}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <StepCard
                    number="STEP 5"
                    title="Retesting"
                    description="Thorough validation of fixes to ensure your systems remain secure at all times."
                    icon={RefreshCw}
                  />
                </motion.div>
              </div>

              <div className="mt-12 flex items-center justify-center gap-4">
                <Button
                  asChild
                  variant="enterprise"
                  size="lg"
                  className="shadow-2xl shadow-primary/25"
                >
                  <Link to="/contact" className="gap-2">
                    Request a Penetration Test
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <span className="text-sm md:text-base text-muted-foreground">
                  Includes remediation support and retesting.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold">
                  Protect Your Business with a Hacker-Focused Approach
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Get expert-led testing aligned to your technology stack and
                  risk profile.
                </p>
              </div>
              <div className="flex md:justify-end items-center gap-4">
                <Button asChild variant="enterprise" size="lg">
                  <Link to="/contact" className="gap-2">
                    Talk to an expert
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
              Penetration Testing Solutions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={Globe}
                  title="Web Application Penetration Testing"
                >
                  Business-logic testing beyond OWASP Top 10 with real exploit
                  chains.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={Smartphone}
                  title="Mobile Application Penetration Testing"
                >
                  Deep analysis of Android and iOS apps, APIs, storage, and
                  transport security.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Code} title="API Penetration Testing">
                  Schema-driven and abuse-case testing for REST/GraphQL/gRPC
                  endpoints.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={Monitor}
                  title="Thick Client App Penetration Testing"
                >
                  Reverse engineering, protocol analysis, and local privilege
                  risk assessment.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Server} title="Network Penetration Testing">
                  Internal and external network assessments with
                  lateral-movement mapping.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Cpu} title="IoT Device Penetration Testing">
                  Firmware, hardware interfaces, and wireless attack surface
                  evaluation.
                </FeatureCard>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="enterprise" size="lg">
                <Link to="/contact" className="gap-2">
                  Request a Penetration Test
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <span className="text-xs md:text-sm text-muted-foreground">
                Delivery in as little as 7 days. Includes remediation guidance
                and retesting.
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
              <Badge variant="secondary">Social proof</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">
              People Love What We Do
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
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Read more references
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES / RESOURCES */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-orbitron">
              Why Businesses Trust Our Penetration Testing
            </h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
              <motion.div variants={itemVariants}>
                <Card className="border-white/10 bg-white/5 hover:border-primary/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Fintech Unicorn: Critical API Vulnerabilities Prevented
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    A fintech startup with $50M+ funding discovered 23 critical
                    API vulnerabilities before launch, including authentication
                    bypass and injection flaws. Our testing prevented potential
                    breaches that could have cost millions in regulatory fines
                    and reputational damage.
                    <div className="mt-3">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1 text-primary text-sm hover:text-primary/80 transition-colors"
                      >
                        Read case study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="border-white/10 bg-white/5 hover:border-primary/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Healthcare Platform: HIPAA Compliance Secured
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Major telemedicine provider identified and fixed 15
                    high-severity vulnerabilities in their patient portal before
                    HIPAA audit. Our detailed reporting with remediation
                    guidance ensured zero findings during compliance review,
                    saving $200K+ in potential penalties.
                    <div className="mt-3">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1 text-primary text-sm hover:text-primary/80 transition-colors"
                      >
                        Read case study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="border-white/10 bg-white/5 hover:border-primary/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      E-commerce Giant: Payment System Hardened
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Leading online marketplace discovered critical payment
                    processing vulnerabilities that could have exposed customer
                    financial data. Our penetration testing identified and
                    helped remediate issues affecting 10M+ transactions monthly,
                    preventing potential PCI-DSS violations.
                    <div className="mt-3">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1 text-primary text-sm hover:text-primary/80 transition-colors"
                      >
                        Read case study
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
              Questions You May Have
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

export default PTaaSPage;
