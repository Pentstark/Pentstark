import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, Database, Globe, FileText, AlertTriangle } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeOut" } },
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PrivacyPolicyPage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]"
    >
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="enterprise-section relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              className="text-center space-y-8 md:space-y-12"
            >
              <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-semibold border border-primary/20">
                  PRIVACY POLICY
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                Your Privacy is Our <span className="enterprise-text-gradient">Priority</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                At PentStark, we are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and safeguard your data.
              </motion.p>
              <motion.div variants={itemVariants} className="flex justify-center">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Last Updated: January 18, 2025</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12 text-center"
            >
              {/* Information We Collect */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Database className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Information We Collect</h2>
                </div>
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Personal Information</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4 text-center">
                      We collect personal information that you voluntarily provide to us when:
                    </p>
                    <ul className="space-y-2 text-muted-foreground text-left max-w-2xl mx-auto">
                      <li className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Creating an account or registering for our services</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Subscribing to our training programs or newsletters</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Contacting us for support or inquiries</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Participating in surveys or promotional activities</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Technical Information</h3>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      We automatically collect certain technical information when you visit our website or use our services, including IP addresses, browser type, device information, and usage patterns.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* How We Use Your Information */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Eye className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">How We Use Your Information</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Service Delivery</h3>
                      <p className="text-muted-foreground">Provide, maintain, and improve our cybersecurity training services and platform functionality.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Communication</h3>
                      <p className="text-muted-foreground">Send you important updates, security alerts, and respond to your inquiries.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Personalization</h3>
                      <p className="text-muted-foreground">Customize your learning experience and recommend relevant content.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Security</h3>
                      <p className="text-muted-foreground">Protect against fraud, unauthorized access, and ensure platform security.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Data Protection */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Lock className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Data Protection & Security</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    We implement industry-standard security measures to protect your personal information:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Encryption</h4>
                        <p className="text-sm text-muted-foreground">All data is encrypted in transit and at rest using AES-256 encryption.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Access Control</h4>
                        <p className="text-sm text-muted-foreground">Strict access controls limit who can view your information.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Database className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Secure Storage</h4>
                        <p className="text-sm text-muted-foreground">Data is stored in SOC 2 Type II compliant data centers.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">GDPR Compliance</h4>
                        <p className="text-sm text-muted-foreground">We adhere to GDPR and other privacy regulations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Your Rights */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Your Rights</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    You have the following rights regarding your personal information:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-foreground mb-2">Access & Portability</h4>
                      <p className="text-sm text-muted-foreground">Request access to your personal data and receive it in a portable format.</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-foreground mb-2">Rectification</h4>
                      <p className="text-sm text-muted-foreground">Request correction of inaccurate or incomplete personal information.</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-foreground mb-2">Deletion</h4>
                      <p className="text-sm text-muted-foreground">Request deletion of your personal data under certain circumstances.</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-foreground mb-2">Objection</h4>
                      <p className="text-sm text-muted-foreground">Object to processing of your personal data for specific purposes.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Contact Us</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                  </p>
                  <div className="space-y-2 text-sm text-center">
                    <p className="text-foreground"><strong>Email:</strong> <span className="text-primary">privacy@pentstark.com</span></p>
                    <p className="text-foreground"><strong>Data Protection Officer:</strong> <span className="text-primary">dpo@pentstark.com</span></p>
                    <p className="text-foreground"><strong>Address:</strong> <span className="text-muted-foreground">Pentstark LLP<br />Legal & Compliance Department<br />Citadel A 1 Manipal County Club Road,<br />Bangalore South, India</span></p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
