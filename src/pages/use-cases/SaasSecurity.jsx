import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import {
  Server,
  ShieldCheck,
  Lock,
  Layers,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SaaSSecurity() {
  return (
      <motion.div
        className="text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
      {/* Hero Section — Center Focus */}
      <section className="relative text-center py-24 px-6">
        <div className="absolute w-80 h-80 bg-purple-500/20 blur-3xl rounded-full -top-20 left-1/3"></div>
        <div className="absolute w-72 h-72 bg-violet-500/20 blur-3xl rounded-full bottom-0 right-1/4"></div>

        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent"
        >
          SaaS Security & Compliance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 max-w-2xl mx-auto mt-4 text-lg"
        >
          Advanced security frameworks and compliance solutions to protect your
          SaaS ecosystem, build trust, and ensure global compliance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <Button variant="enterprise" className="px-8 py-4 text-lg rounded-xl">
            Explore SaaS Security
          </Button>
        </motion.div>
      </section>

      {/* Unique Vertical Carousel Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          Core Features
        </h2>

        <div className="flex overflow-x-auto gap-8 py-6 snap-x snap-mandatory scrollbar-hide">
          {[
            {
              icon: Server,
              title: "Secure Cloud Architecture",
              desc: "Robust infrastructure to safeguard SaaS applications.",
            },
            {
              icon: ShieldCheck,
              title: "Compliance Automation",
              desc: "Real-time compliance monitoring for regulations adherence.",
            },
            {
              icon: Lock,
              title: "Encryption Everywhere",
              desc: "Data encrypted at rest and in transit for confidentiality.",
            },
            {
              icon: Layers,
              title: "Multi-Layer Defenses",
              desc: "End-to-end protection across all application layers.",
            },
            {
              icon: CheckCircle2,
              title: "Continuous Risk Assessment",
              desc: "Constant monitoring for instant risk mitigation.",
            },
            {
              icon: Globe,
              title: "Global Regulation Support",
              desc: "Compliance with GDPR, SOC 2, ISO, HIPAA and more.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="snap-center bg-white/5 border border-white/10 p-8 rounded-3xl shadow-lg backdrop-blur-lg min-w-[280px] cursor-pointer transition-all duration-300"
            >
              <feature.icon className="w-10 h-10 text-purple-400 mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Benefits — Staggered Glass Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          Key Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            "Enhanced Data Protection",
            "Real-Time Compliance",
            "Risk Reduction",
            "Business Trust",
            "Operational Resilience",
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-lg text-center transition-transform cursor-pointer"
            >
              <h3 className="font-semibold text-lg mb-2">{item}</h3>
              <p className="text-gray-300 text-sm">
                Protect and strengthen your SaaS application with advanced
                security frameworks.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clean CTA Section — No Box or BG */}
      <section className="text-center py-24">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
          Secure & Compliant SaaS — Anytime, Anywhere
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Partner with us to ensure your SaaS platforms remain secure,
          compliant, and trusted worldwide.
        </p>
        <Button variant="enterprise" className="px-10 py-4 rounded-xl text-lg">
          Get SaaS Secure
        </Button>
      </section>
      </motion.div>
  );
}
