import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, Users, AlertTriangle, Clock, Globe, Lock } from 'lucide-react';

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

const TermsOfServicePage = () => {
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
                  TERMS OF SERVICE
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                Service Terms & <span className="enterprise-text-gradient">Conditions</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                These terms and conditions govern your use of PentStark's cybersecurity training platform and services. Please read them carefully before using our services.
              </motion.p>
              <motion.div variants={itemVariants} className="flex justify-center">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Last Updated: January 18, 2025</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Acceptance of Terms */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Scale className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Acceptance of Terms</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    By accessing and using PentStark's services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you should not use our services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    These terms apply to all visitors, users, and others who access or use our cybersecurity training platform, penetration testing services, and related offerings.
                  </p>
                </div>
              </motion.div>

              {/* Service Description */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Service Description</h2>
                </div>
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Training Platform</h3>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      Our platform provides interactive cybersecurity training, including hands-on labs, vulnerability assessments, and penetration testing scenarios designed for educational purposes.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Professional Services</h3>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      We offer professional penetration testing, security assessments, and consulting services to enterprise clients under separate service agreements.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Educational Content</h3>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      All training materials, labs, and educational content are provided for legitimate educational and professional development purposes only.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* User Responsibilities */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">User Responsibilities</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    By using our services, you agree to:
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Use our services only for lawful purposes and in accordance with these terms</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Not use our training content or tools for malicious activities or unauthorized access</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Maintain the confidentiality of your account credentials</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Respect intellectual property rights and not share or distribute our proprietary content</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Comply with all applicable laws and regulations in your jurisdiction</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Prohibited Activities */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/5 to-red-700/5 text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Prohibited Activities</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    The following activities are strictly prohibited:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-center">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-400">Malicious Use</h4>
                      <p className="text-sm text-muted-foreground">Using our tools or knowledge for unauthorized access, hacking, or illegal activities</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-400">Content Piracy</h4>
                      <p className="text-sm text-muted-foreground">Unauthorized copying, distribution, or resale of our training materials</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-400">Account Sharing</h4>
                      <p className="text-sm text-muted-foreground">Sharing account credentials or allowing unauthorized access to your account</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-400">System Abuse</h4>
                      <p className="text-sm text-muted-foreground">Attempting to disrupt, damage, or gain unauthorized access to our systems</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Intellectual Property */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Lock className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Intellectual Property</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    All content, including but not limited to text, graphics, logos, images, software, and training materials, is the exclusive property of PentStark and is protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">You may not modify, reproduce, distribute, or create derivative works</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Limited license granted for personal, non-commercial educational use only</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">All rights not expressly granted are reserved by PentStark</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Liability & Disclaimers */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Liability & Disclaimers</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Service Availability</h3>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      While we strive to maintain 99.9% uptime, we cannot guarantee uninterrupted service availability. We reserve the right to modify, suspend, or discontinue services with reasonable notice.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Educational Purpose</h3>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      Our training content is provided for educational purposes only. We are not liable for any misuse of the knowledge or tools provided through our platform.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Limitation of Liability</h3>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      In no event shall PentStark be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Termination */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Termination</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including but not limited to breach of these terms.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">You may terminate your account at any time by contacting us</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Upon termination, your right to use the service ceases immediately</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Provisions that should survive termination will remain in effect</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Contact Information</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-sm text-center">
                    <p className="text-foreground"><strong>Email:</strong> <span className="text-primary">legal@pentstark.com</span></p>
                    <p className="text-foreground"><strong>Legal Department:</strong> <span className="text-primary">terms@pentstark.com</span></p>
                    <p className="text-foreground"><strong>Address:</strong> <span className="text-muted-foreground">Pentstark LLP<br />Legal & Compliance Department<br />Citadel A 1 Manipal County Club Road,<br />Bangalore South, India</span></p>
                  </div>
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground text-center">
                      <strong>Note:</strong> These terms are governed by applicable laws and regulations. Any disputes will be resolved through binding arbitration in accordance with our dispute resolution policy.
                    </p>
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

export default TermsOfServicePage;
