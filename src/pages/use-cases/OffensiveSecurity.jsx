import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { AlertCircle, Cpu, GitPullRequest, ShieldOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OffensiveSecurity() {
  return (
      <motion.div
        className="text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
      {/* Hero Section */}
      <section className="relative text-center py-24 px-6 overflow-hidden">
        {/* Two Floating Circles behind heading */}
        <div className="absolute w-60 h-60 bg-purple-500/20 rounded-full blur-3xl top-16 left-1/3 animate-pulse"></div>
        <div className="absolute w-48 h-48 bg-violet-500/20 rounded-full blur-3xl top-24 left-1/2 animate-pulse"></div>

        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent relative"
        >
          Offensive Security
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed relative"
        >
          Stay ahead by thinking like an attacker. Offensive Security is about
          proactive vulnerability discovery, simulated attack scenarios, and
          continuous improvement of your security posture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 relative"
        >
          <Button variant="enterprise" className="px-8 py-4 text-lg rounded-xl">
            Start Offensive Security →
          </Button>
        </motion.div>
      </section>

      {/* Features Section — Animated Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          Offensive Security Core Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: AlertCircle,
              title: "Ethical Hacking Simulations",
              desc: "Simulate real-world attacks to proactively identify vulnerabilities before malicious actors.",
            },
            {
              icon: Cpu,
              title: "Advanced Threat Simulation",
              desc: "Leverage sophisticated attack models to assess system resilience.",
            },
            {
              icon: GitPullRequest,
              title: "Red Team Operations",
              desc: "Full-scale security exercises that test defenses end-to-end.",
            },
            {
              icon: ShieldOff,
              title: "Vulnerability Research",
              desc: "Discover weaknesses in applications, networks, and cloud infrastructures.",
            },
            {
              icon: Zap,
              title: "Continuous Pen Testing",
              desc: "Automated and continuous testing to keep security sharp and updated.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <feature.icon className="w-10 h-10 text-purple-400" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flashcard Threat Intelligence Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          Threat Intelligence Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Real-Time Attack Alerts",
              desc: "Stay updated with instant alerts for emerging threats and anomalies.",
              icon: "⚡",
            },
            {
              title: "Vulnerability Reports",
              desc: "Get detailed reports on vulnerabilities to secure systems proactively.",
              icon: "🛡️",
            },
            {
              title: "Attack Trend Analysis",
              desc: "Visual insights into evolving attack patterns and techniques.",
              icon: "📊",
            },
            {
              title: "Dark Web Monitoring",
              desc: "Track leaked credentials and emerging threats from the dark web.",
              icon: "🌐",
            },
            {
              title: "Threat Actor Profiles",
              desc: "Understand the profiles and motives of attackers targeting your assets.",
              icon: "👤",
            },
            {
              title: "Incident Forensics",
              desc: "Comprehensive analysis of incidents for improved future prevention.",
              icon: "🔍",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-lg cursor-pointer transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-4xl">{card.icon}</div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-400 text-sm">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-24">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          Strengthen Your Security by Thinking Like an Attacker
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Adopt Offensive Security practices to identify vulnerabilities before
          attackers do, and transform them into strengths.
        </p>
        <Button variant="enterprise" className="px-10 py-4 rounded-xl text-lg">
          Start Offensive Security
        </Button>
      </section>
      </motion.div>
  );
}
