import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Cpu,
  Lock,
  Network,
  Eye,
  Radar,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiSecurity() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="layout-container flex flex-col min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative text-center py-28 px-6 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute w-60 h-60 bg-purple-500/20 rounded-full blur-3xl top-20 left-1/3 animate-pulse"></div>
        <div className="absolute w-48 h-48 bg-violet-500/20 rounded-full blur-3xl top-24 left-1/2 animate-pulse"></div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          AI Security
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed relative"
        >
          AI Security integrates artificial intelligence and machine learning
          into cybersecurity to detect, analyze, and respond to threats faster
          than conventional methods. It transforms the cybersecurity landscape
          through intelligent, adaptive, and proactive defense mechanisms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 relative"
        >
          <Button
            className="bg-gradient-to-r from-purple-500 to-violet-600 px-8 py-4 text-lg rounded-full hover:shadow-[0_0_25px_#9B59B6] transition-all duration-300"
            onClick={() =>
              document
                .getElementById("core-capabilities")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore AI Defense →
          </Button>
        </motion.div>
      </section>

      {/* AI Security Overview */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          AI Security Overview
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
          In an era where cyber threats evolve constantly, AI Security acts as
          the frontline of defense. It combines real-time analytics, deep
          learning, and automated response systems to ensure threats are
          identified and mitigated instantly — without human delay.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
          From detecting zero-day vulnerabilities to adaptive threat prevention,
          AI Security empowers businesses, governments, and organizations to
          operate with confidence, compliance, and resilience.
        </p>

        <div className="flex flex-wrap justify-center gap-10">
          {[
            {
              title: "Real-Time Threat Analysis",
              desc: "Continuous scanning of networks to identify and respond to threats instantly.",
            },
            {
              title: "Automated Defense",
              desc: "AI-driven automation reduces human intervention and speeds up response time.",
            },
            {
              title: "Data Privacy & Compliance",
              desc: "Ensures compliance with global standards while keeping sensitive data secure.",
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.07, y: -5 }}
              className="relative bg-gradient-to-b from-[#1c1429] to-[#1a1625] rounded-2xl p-8 w-80 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 shadow-[0_0_30px_rgba(155,89,182,0.15)] hover:shadow-[0_0_40px_rgba(155,89,182,0.45)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-violet-500/10 to-transparent blur-xl animate-pulse"></div>
              <h3 className="text-xl font-semibold text-purple-400 mb-3 relative">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm relative">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core AI Security Capabilities */}
      <section
        id="core-capabilities"
        style={{ paddingTop: "120px", marginTop: "-120px" }}
        className="max-w-6xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-4xl font-bold mb-14 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          Core AI Security Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: Shield,
              color: "text-purple-400",
              title: "Predictive Threat Intelligence",
              desc: "AI-powered analytics forecast emerging threats and enable preemptive action.",
            },
            {
              icon: Cpu,
              color: "text-violet-400",
              title: "Adaptive Machine Learning",
              desc: "Constantly evolving algorithms that adapt to new attack methods and environments.",
            },
            {
              icon: Lock,
              color: "text-purple-300",
              title: "Zero-Trust Security Model",
              desc: "Continuous verification for every access request to minimize insider risks.",
            },
            {
              icon: Radar,
              color: "text-violet-300",
              title: "Real-Time Threat Detection",
              desc: "AI systems process massive datasets in real time to detect anomalies instantly.",
            },
            {
              icon: Network,
              color: "text-purple-500",
              title: "Neural Threat Networks",
              desc: "Deep learning frameworks for multi-layered threat analysis and mitigation.",
            },
            {
              icon: Eye,
              color: "text-violet-500",
              title: "Behavioral Analytics",
              desc: "AI learns normal patterns and detects deviations that signal potential threats.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-gradient-to-b from-[#1c1429] to-[#1a1625] rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/60 transition-all duration-300 shadow-[0_0_30px_rgba(155,89,182,0.2)] hover:shadow-[0_0_40px_rgba(155,89,182,0.5)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/15 via-violet-500/10 to-transparent blur-lg animate-pulse"></div>
              <div className="flex flex-col items-center text-center space-y-4 relative">
                <f.icon className={`w-10 h-10 ${f.color}`} />
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Threat Detection Workflow */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          AI Threat Detection Workflow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              step: "Data Intake & Sensing",
              desc: "AI gathers and analyzes vast amounts of data from networks, sensors, and endpoints to identify unusual patterns.",
            },
            {
              step: "Real-Time Analysis",
              desc: "Advanced algorithms evaluate threats instantly using pattern recognition and anomaly detection.",
            },
            {
              step: "Automated Response",
              desc: "Systems autonomously initiate mitigation strategies like network isolation and alerting security teams.",
            },
            {
              step: "Continuous Adaptation",
              desc: "Machine learning models evolve continuously to handle emerging threat tactics and techniques.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative bg-gradient-to-b from-[#1c1429] to-[#1a1625] rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/60 transition-all duration-300 shadow-[0_0_25px_rgba(155,89,182,0.2)] hover:shadow-[0_0_40px_rgba(155,89,182,0.5)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/15 via-violet-500/10 to-transparent blur-lg animate-pulse"></div>
              <h3 className="text-2xl font-semibold text-purple-400 mb-4 relative">
                {item.step}
              </h3>
              <p className="text-gray-300 text-sm relative">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
<section id="faq" className="py-20 bg-transparent">
  <motion.div
    className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6">
      {[
        {
          q: "What is AI Security?",
          a: "AI Security integrates artificial intelligence and machine learning into cybersecurity to automatically detect, analyze, and respond to digital threats in real time.",
        },
        {
          q: "How does AI improve cybersecurity?",
          a: "AI continuously learns from network data, identifies suspicious patterns, predicts potential attacks, and helps automate defense mechanisms against evolving threats.",
        },
        {
          q: "Can AI prevent zero-day attacks?",
          a: "Yes. Using predictive analytics and anomaly detection, AI can detect unfamiliar behaviors, preventing zero-day attacks before they cause harm.",
        },
        {
          q: "Is AI Security suitable for all industries?",
          a: "Absolutely. AI Security is adaptable across industries such as finance, healthcare, defense, and government to strengthen cybersecurity posture and compliance.",
        },
        {
          q: "Does AI replace human cybersecurity teams?",
          a: "No. AI enhances human capabilities by automating repetitive tasks, allowing experts to focus on critical threat analysis and strategic response planning.",
        },
      ].map((item, index) => {
        const [open, setOpen] = React.useState(false);

        return (
          <motion.div
            key={index}
            whileHover={{
              boxShadow: "0px 0px 25px rgba(168, 85, 247, 0.4)",
            }}
            className="bg-white/5 p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-500"
            onClick={() => setOpen(!open)}
          >
            {/* Question */}
            <div className="font-semibold text-lg cursor-pointer flex justify-between items-center text-purple-400">
              <span>{item.q}</span>
              <span className="ml-2 text-purple-400 text-xl">
                {open ? "×" : "+"}
              </span>
            </div>

            {/* Answer */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              {open && (
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.a}
                </p>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
</section>


      {/* Call to Action */}
      <section className="text-center py-24 mt-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          The Future of Cyber Defense is Intelligent
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          AI Security provides intelligent defense, continuous adaptation, and
          faster response times — securing your digital infrastructure for
          tomorrow’s threats.
        </p>
        <Button asChild className="group">
  <a
    href="#get-started"
    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center space-x-3 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_#9B59B6]"
  >
    <span>Get Started with AI Security</span>
    <span className="group-hover:translate-x-2 transition-transform text-lg">
      →
    </span>
  </a>
</Button>

      </section>
    </motion.div>
  );
}
