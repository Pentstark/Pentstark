import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  CreditCard,
  AlertTriangle,
  Users,
  Server,
  Zap,
  TrendingUp,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageVariants, sectionVariants } from "@/lib/animations";

export default function UseCaseDetailPage() {
  return (
    <motion.div
      className="layout-container flex flex-col min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white px-6 md:px-10 py-20"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section with Glassmorphism */}
      <motion.div
        variants={sectionVariants}
        className="max-w-4xl mx-auto text-center mb-16 p-8 rounded-lg backdrop-blur-lg bg-white/10 shadow-xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
          Fintech Security
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          In the digital finance world, security is the heartbeat of trust.
          Fintech Security safeguards digital transactions, protects sensitive
          data, ensures compliance, and creates trust between businesses and
          customers.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20"
      >
        <CardFeature icon={Shield} title="End-to-End Encryption">
          Military-grade encryption securing all data and transactions at every stage.
        </CardFeature>
        <CardFeature icon={Lock} title="Multi-Factor Authentication">
          Biometric authentication, OTPs, and device verification to strengthen security.
        </CardFeature>
        <CardFeature icon={CreditCard} title="Fraud Detection">
          AI-based fraud detection preventing suspicious transactions in real time.
        </CardFeature>
        <CardFeature icon={AlertTriangle} title="Threat Intelligence">
          Real-time threat intelligence for continuous protection.
        </CardFeature>
        <CardFeature icon={Users} title="Privacy Protection">
          Compliance with GDPR, CCPA, and other privacy regulations.
        </CardFeature>
        <CardFeature icon={Server} title="Secure Infrastructure">
          Cloud-based infrastructure with automated security updates.
        </CardFeature>
        <CardFeature icon={Zap} title="Rapid Incident Response">
          Tools for detecting and mitigating breaches instantly.
        </CardFeature>
        <CardFeature icon={TrendingUp} title="Regulatory Compliance">
          Ensuring compliance with global fintech regulations.
        </CardFeature>
        <CardFeature icon={Layers} title="Layered Security">
          Multi-layered defenses for robust protection.
        </CardFeature>
        <CardFeature icon={CheckCircle2} title="Continuous Monitoring">
          24/7 monitoring to detect threats before they occur.
        </CardFeature>
      </motion.div>

      {/* Why Fintech Security Section */}
      <motion.div variants={sectionVariants} className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Fintech Security is Vital
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          Fintech platforms handle massive amounts of sensitive financial
          data and real-time transactions, making them a prime target for
          cyber threats. Strong security measures protect user assets,
          maintain regulatory compliance, and preserve brand trust.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Investing in fintech security is not optional — it’s the foundation
          for long-term success in the digital financial world.
        </p>
      </motion.div>

      {/* Security by Numbers Section */}
      <motion.div
        variants={sectionVariants}
        className="bg-gray-800 rounded-lg p-12 max-w-6xl mx-auto mb-20 shadow-lg"
      >
        <h2 className="text-5xl font-bold mb-10 text-center text-primary">
          Security by Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "99.9%", desc: "Uptime with secure infrastructure" },
            { value: "24/7", desc: "Continuous monitoring and threat detection" },
            { value: "100%", desc: "Compliance with global security standards" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="bg-white/5 border border-white/10 rounded-lg p-8 flex flex-col items-center justify-center transition-transform duration-300 cursor-pointer shadow-lg"
            >
              <h3 className="text-5xl font-bold text-primary mb-2">{item.value}</h3>
              <p className="text-gray-300 text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div variants={sectionVariants} className="max-w-6xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-center mb-10">Why Choose Our Security</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: "Secure Architecture" },
            { icon: Lock, title: "Data Privacy" },
            { icon: Zap, title: "Rapid Threat Detection" },
            { icon: CheckCircle2, title: "Compliance Assured" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(255,255,255,0.5)" }}
              className="p-6 bg-white/5 rounded-lg shadow-lg text-center cursor-pointer transition-transform duration-300"
            >
              <item.icon className="mx-auto text-primary h-10 w-10 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        variants={sectionVariants}
        className="text-center mt-16 flex flex-col items-center"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Protect Your Digital Finance Platform
        </h2>
        <p className="text-gray-400 max-w-xl mb-6">
          Partner with us to build a secure, resilient, and compliant fintech
          ecosystem. Protect your customers, strengthen trust, and stay ahead
          of threats.
        </p>
        <Button asChild className="group">
          <a
            href="#more-info"
            className="bg-primary/20 hover:bg-primary/30 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <span>Learn More</span>
            <span className="group-hover:translate-x-1 transition-transform text-lg">
              →
            </span>
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}

// Card feature component
const CardFeature = ({ icon: Icon, title, children }) => (
  <motion.div variants={sectionVariants}>
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(255,255,255,0.3)" }}
      className="h-full border-white/10 bg-white/5 rounded-lg p-5 md:p-6 shadow-lg transition-transform duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-primary/10 rounded-lg text-primary shrink-0 group-hover:scale-110 transition-transform">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold mb-1.5">{title}</h3>
          <p className="text-sm text-muted-foreground">{children}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  </motion.div>
);
