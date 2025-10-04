import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  RefreshCw,
  Gauge,
  Target,
  Search,
  FileText,
  Code,
  Monitor,
  Server,
  Cpu,
  Users,
  ArrowRight,
  Quote,
  Star,
  CheckCircle2,
  Shield,
  Zap,
  Layers,
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
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-blue-500/20 to-blue-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Card className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:border-blue-500/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/10">
      {/* Step badge */}
      <div className="absolute -top-3 left-6">
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-400 border border-blue-500/30 text-sm font-bold tracking-wider shadow-lg backdrop-blur-sm">
          {number}
        </div>
      </div>
      <CardContent className="p-6 md:p-8">
        {/* Accent bar */}
        <div className="mb-6 h-1 w-16 bg-gradient-to-r from-blue-500/60 to-blue-500/30 rounded-full opacity-80 group-hover:w-full transition-all duration-500" />
        <div className="flex items-start gap-5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 text-blue-400 ring-2 ring-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold font-orbitron mb-3 text-lg group-hover:text-blue-400 transition-colors">
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
    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative text-center border border-white/10 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/10">
      <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300 font-orbitron">
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
      <Quote className="h-6 w-6 text-blue-400/70 mb-3" />
      <p className="text-sm text-muted-foreground flex-1">"{quote}"</p>
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="font-medium">{author}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </div>
  </Card>
);

const FAQItem = ({ q, a }) => (
  <details className="group bg-white/5 rounded-xl border border-white/10 p-4 transition-all hover:border-blue-500/40 cursor-pointer">
    <summary className="list-none cursor-pointer flex items-center justify-between gap-3 py-2 min-h-[44px]">
      <span className="font-medium text-left pr-2">{q}</span>
      <span className="text-blue-400 transform transition-transform duration-300 group-open:rotate-45 flex-shrink-0 text-xl">
        +
      </span>
    </summary>
    <div className="text-sm text-muted-foreground mt-3 pt-3 border-t border-white/10 overflow-hidden transition-all duration-300">
      {a}
    </div>
  </details>
);

const PSaaSPage = () => {
  useEffect(() => {
    console.info(
      "[Services] Opened: PSaaSPage.jsx (Product Security as a Service)"
    );
  }, []);

  const testimonials = [
    {
      quote:
        "PSaaS transformed how we approach security in our development lifecycle. The continuous monitoring caught issues we never would have found otherwise.",
      author: "VP of Engineering, SaaS",
      role: "Enterprise Software Company",
    },
    {
      quote:
        "The shift-left approach helped us identify vulnerabilities during development rather than after deployment. Our release cycles are now much more secure.",
      author: "CTO, Fintech",
      role: "Digital Banking Platform",
    },
    {
      quote:
        "The integration with our CI/CD pipeline was seamless. We now have security built into every commit and deployment.",
      author: "DevSecOps Lead, Healthcare",
      role: "Healthcare Technology",
    },
  ];

  const faqs = [
    {
      q: "How does PSaaS integrate with our existing development workflow?",
      a: "PSaaS integrates with your existing CI/CD pipelines, IDEs, and development tools. We provide APIs, plugins, and automated scanning that fits seamlessly into your current processes without disrupting developer productivity.",
    },
    {
      q: "What types of vulnerabilities can PSaaS detect?",
      a: "PSaaS detects a wide range including OWASP Top 10, authentication flaws, injection vulnerabilities, misconfigurations, secrets exposure, dependency vulnerabilities, and business logic flaws through static, dynamic, and behavioral analysis.",
    },
    {
      q: "Can PSaaS help with compliance requirements?",
      a: "Absolutely. PSaaS helps with SOC 2, ISO 27001, PCI-DSS, HIPAA, GDPR, and other compliance frameworks by providing continuous monitoring, audit trails, and automated evidence collection.",
    },
    {
      q: "How quickly can we see results after implementing PSaaS?",
      a: "Most teams see immediate benefits within the first week, with significant improvements in vulnerability detection and remediation speed visible within the first month of implementation.",
    },
  ];

  const whyItems = [
    {
      text: "Continuous security monitoring across the entire development lifecycle.",
    },
    { text: "Automated vulnerability detection and remediation guidance." },
    {
      text: "Seamless integration with existing development tools and workflows.",
    },
    { text: "Compliance automation and audit trail generation." },
    { text: "Developer-friendly security training and guidance." },
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
      <div className="absolute -z-10 top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/30 via-blue-500/10 to-transparent blur-3xl opacity-60" />
      <div className="absolute -z-10 bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/20 via-transparent to-blue-500/10 blur-3xl opacity-50" />
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-30" />

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
            <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/25 via-blue-500/5 to-transparent blur-3xl opacity-70" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/15 via-transparent to-blue-500/10 blur-2xl opacity-60" />

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-50" />
                <div className="relative flex items-start gap-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5 border border-blue-500/20">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl text-blue-400 shadow-lg">
                    <RefreshCw className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold font-orbitron bg-gradient-to-r from-white via-blue-400/90 to-white bg-clip-text text-transparent">
                      Product Security as a Service (PSaaS)
                    </h1>
                    <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
                      Embed security throughout your product lifecycle with
                      continuous monitoring, automated remediation, and
                      developer-centric tooling.
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
                    Rated 5/5 by development teams
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    variant="enterprise"
                    size="lg"
                    className="shadow-2xl shadow-blue-500/25"
                  >
                    <Link to="/contact" className="gap-2">
                      Start PSaaS Implementation
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="backdrop-blur-sm border-white/20 hover:border-white/40"
                  >
                    <Link to="/contact">Schedule Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[300px] md:min-h-full">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-60" />
                <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl">
                  <img
                    src="/favicons/psaas.png"
                    alt="Product Security as a Service"
                    className="w-full h-auto object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent opacity-30" />
                </div>
              </div>
            </div>

            {/* TRUST BAR */}
            <div className="mt-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/40" />
                <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                  Trusted by Development Teams at
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/40" />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-sm">
                {[
                  "Fortune 500",
                  "Startups",
                  "Healthcare",
                  "Fintech",
                  "E-commerce",
                  "SaaS Platforms",
                ].map((name) => (
                  <div
                    key={name}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-br from-white/10 to-white/5 rounded-lg p-3 border border-white/10 hover:border-blue-500/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-blue-500/5 transition-all duration-300"
                  >
                    <span className="font-medium text-muted-foreground group-hover:text-blue-400 transition-colors">
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <StatCard label="Setup Time" value="< 1 Hour" />
            <StatCard label="Vulnerability Detection" value="95%+" />
            <StatCard label="MTTR" value="< 24 Hours" />
            <StatCard label="Compliance Coverage" value="SOC 2 / PCI" />
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/3 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 gap-8 md:gap-16"
          >
            <motion.div variants={itemVariants}>
              <div className="sticky top-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                  >
                    Why choose PSaaS
                  </Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-white via-blue-400/90 to-white bg-clip-text text-transparent">
                  Why Product Security as a Service with PentStark?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Developer-centric security that enhances productivity while
                  maintaining the highest security standards across your entire
                  product lifecycle.
                </p>
                <div className="flex gap-4">
                  <Button
                    asChild
                    variant="enterprise"
                    className="shadow-xl shadow-blue-500/20"
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
                  className="group flex items-start gap-4 p-5 rounded-xl border border-transparent bg-gradient-to-br from-white/8 to-white/3 hover:border-blue-500/30 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-blue-500/5 transition-all duration-300"
                >
                  <div className="mt-1 p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="h-5 w-5 text-blue-400" />
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
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/2 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            className="glass-effect-purple rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
          >
            {/* Enhanced background effects */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent blur-3xl opacity-60" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-blue-500/10 via-transparent to-blue-500/5 blur-2xl opacity-50" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                >
                  How it works
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-white via-blue-400/90 to-white bg-clip-text text-transparent">
                PSaaS Implementation Process
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl">
                A structured approach from assessment to continuous security
                integration.
              </p>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <motion.div variants={itemVariants}>
                  <StepCard
                    number="STEP 1"
                    title="Security Assessment"
                    description="Comprehensive analysis of your current security posture, development processes, and risk profile."
                    icon={Search}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <StepCard
                    number="STEP 2"
                    title="Tool Integration"
                    description="Seamless integration with your existing CI/CD pipelines, IDEs, and development workflows."
                    icon={Code}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <StepCard
                    number="STEP 3"
                    title="Automated Monitoring"
                    description="Continuous vulnerability scanning, dependency analysis, and security policy enforcement."
                    icon={Monitor}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <StepCard
                    number="STEP 4"
                    title="Developer Training"
                    description="Security awareness and secure coding training tailored to your development team's needs."
                    icon={Users}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <StepCard
                    number="STEP 5"
                    title="Continuous Improvement"
                    description="Ongoing optimization, compliance monitoring, and adaptation to evolving security threats and requirements."
                    icon={TrendingUp}
                  />
                </motion.div>
              </div>

              <div className="mt-12 flex items-center justify-center gap-4">
                <Button
                  asChild
                  variant="enterprise"
                  size="lg"
                  className="shadow-2xl shadow-blue-500/25"
                >
                  <Link to="/contact" className="gap-2">
                    Start PSaaS Implementation
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <span className="text-sm md:text-base text-muted-foreground">
                  Includes setup, training, and 30-day success guarantee.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold">
                  Secure Your Products from Day One
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Integrate security seamlessly into your development lifecycle
                  with expert guidance and automation.
                </p>
              </div>
              <div className="flex md:justify-end items-center gap-4">
                <Button asChild variant="enterprise" size="lg">
                  <Link to="/contact" className="gap-2">
                    Schedule PSaaS Consultation
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
              PSaaS Solutions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Gauge} title="Continuous Monitoring">
                  Real-time vulnerability scanning and security posture
                  assessment across your entire product portfolio.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={ShieldCheck} title="Secure SDLC Integration">
                  Automated security testing, code analysis, and compliance
                  checks built into your development pipeline.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={RefreshCw} title="Automated Remediation">
                  AI-powered vulnerability triage, prioritization, and guided
                  remediation with actionable fix suggestions.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Code} title="Developer Tooling">
                  IDE plugins, security linters, and automated code review
                  integration for developer-friendly security.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={Server} title="Infrastructure Security">
                  Container security, infrastructure as code scanning, and cloud
                  security posture management.
                </FeatureCard>
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard icon={FileText} title="Compliance Automation">
                  Automated evidence collection, audit trail generation, and
                  compliance reporting for SOC 2, PCI-DSS, and more.
                </FeatureCard>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="enterprise" size="lg">
                <Link to="/contact" className="gap-2">
                  Start PSaaS Implementation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <span className="text-xs md:text-sm text-muted-foreground">
                Setup in under 1 hour with dedicated support included.
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
              Trusted by Development Teams
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
                className="inline-flex items-center gap-2 text-blue-400 hover:underline"
              >
                Read more success stories
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
              Why Development Teams Choose Our PSaaS
            </h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
              <motion.div variants={itemVariants}>
                <Card className="border-white/10 bg-white/5 hover:border-blue-500/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      E-commerce Scale-up: DevSecOps Pipeline Transformation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Online marketplace processing $500M+ annually integrated
                    PSaaS into their Kubernetes-native development workflow.
                    Security scanning time reduced from 45 minutes to 3 minutes
                    per deployment, while catching 97% of vulnerabilities
                    pre-production. This enabled 5x faster release cycles
                    without compromising security posture.
                    <div className="mt-3">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1 text-blue-400 text-sm hover:text-blue-300 transition-colors"
                      >
                        Read full case study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="border-white/10 bg-white/5 hover:border-blue-500/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Telemedicine Platform: HIPAA & GDPR Dual Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Healthcare startup handling 100K+ patient consultations
                    monthly automated both HIPAA and GDPR compliance
                    requirements. PSaaS reduced compliance overhead by 80%
                    through intelligent policy mapping and automated evidence
                    collection, allowing their compliance team to focus on
                    strategic security initiatives rather than manual
                    documentation.
                    <div className="mt-3">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1 text-blue-400 text-sm hover:text-blue-300 transition-colors"
                      >
                        Read full case study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="border-white/10 bg-white/5 hover:border-blue-500/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Crypto Exchange: Real-time Threat Detection at Scale
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Cryptocurrency exchange processing $10B+ daily volume
                    implemented PSaaS for continuous security monitoring.
                    Real-time anomaly detection identified and blocked 2,847
                    potential security incidents in the first quarter,
                    preventing potential losses exceeding $50M while maintaining
                    sub-100ms transaction latency.
                    <div className="mt-3">
                      <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1 text-blue-400 text-sm hover:text-blue-300 transition-colors"
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

export default PSaaSPage;
