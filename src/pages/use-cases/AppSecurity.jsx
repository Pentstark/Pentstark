import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Shield,
  AlertCircle,
  Lock,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppSecurityAssessment() {
  return (
    <motion.div
      className="layout-container flex flex-col min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section with Bigger Layout */}
      <section className="relative py-36 px-6">
        <div className="relative flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-16">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-8">
            <motion.h1
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center md:text-left"
            >
              App Security Assessment
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-2xl text-center md:text-left"
            >
              Discover vulnerabilities, strengthen defenses, and safeguard your
              applications with precision and intelligence.
            </motion.p>
            <motion.div className="mt-10 flex justify-center md:justify-start">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-12 py-6 text-xl rounded-full hover:shadow-[0_0_35px_#00FFFF] transition-all duration-300">
                Start Assessment →
              </Button>
            </motion.div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center relative">
            <div className="absolute -top-28 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1055/1055672.png"
              alt="App Security Illustration"
              className="relative w-96 max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section — Glass Hover Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          App Security Core Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: Smartphone,
              title: "Mobile Security Testing",
              desc: "Detect vulnerabilities in mobile apps with advanced testing techniques.",
            },
            {
              icon: Shield,
              title: "Application Threat Modeling",
              desc: "Understand threats early and design your app to be secure-by-design.",
            },
            {
              icon: AlertCircle,
              title: "Real-Time Vulnerability Detection",
              desc: "Constantly scan and alert for potential security risks.",
            },
            {
              icon: Lock,
              title: "Encryption & Data Protection",
              desc: "Secure sensitive app data in transit and at rest.",
            },
            {
              icon: CheckCircle2,
              title: "Regulatory Compliance Checks",
              desc: "Ensure your app meets GDPR, ISO, HIPAA, and other standards.",
            },
            {
              icon: Zap,
              title: "Automated Security Reports",
              desc: "Get actionable insights to strengthen your app’s security posture.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-lg hover:shadow-[0_0_20px_#00FFFF40] transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <feature.icon className="w-10 h-10 text-cyan-400" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Benefits Section — Glass Mosaic */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Key Benefits
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {[
            "Improved App Security",
            "Faster Vulnerability Detection",
            "Regulatory Compliance",
            "Stronger User Trust",
            "Better Risk Management",
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg backdrop-blur-lg w-64 text-center transition-transform cursor-pointer"
            >
              <h3 className="font-semibold text-lg mb-2">{item}</h3>
              <p className="text-gray-300 text-sm">
                Detailed analysis and actionable insights for your application.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-24">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Secure Your Applications Today
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Start your app security assessment now and protect your digital
          ecosystem.
        </p>
        <Button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:shadow-[0_0_20px_#00FFFF] transition-all text-lg">
          Get Started
        </Button>
      </section>
    </motion.div>
  );
}
