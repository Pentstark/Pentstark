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

export default function SaaSSecurityCompliance() {
  return (
    <motion.div
      className="layout-container flex flex-col min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white px-6 md:px-10 py-20"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section */}
      <motion.div
        variants={sectionVariants}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          SaaS Security & Compliance
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Comprehensive security and compliance solutions designed for SaaS
          platforms — ensuring data protection, regulatory compliance, and
          seamless user trust.
        </p>
      </motion.div>
    </motion.div>
  );
}
