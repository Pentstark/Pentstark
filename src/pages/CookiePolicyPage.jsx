import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, Eye, Shield, BarChart3, Globe, AlertTriangle, FileText } from 'lucide-react';

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

const CookiePolicyPage = () => {
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
                  COOKIE POLICY
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                Cookie Usage & <span className="enterprise-text-gradient">Privacy Control</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                This policy explains how PentStark uses cookies and similar technologies to enhance your experience on our platform while respecting your privacy preferences.
              </motion.p>
              <motion.div variants={itemVariants} className="flex justify-center">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Cookie className="h-4 w-4 text-primary" />
                    <span>Last Updated: January 18, 2025</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Cookie Policy Content */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* What Are Cookies */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl text-left">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Cookie className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">What Are Cookies?</h2>
                </div>
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-muted-foreground leading-relaxed text-center">
                    Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better user experience by remembering your preferences and enabling certain functionality.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Cookies do not contain any personal information that can identify you individually</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">They are used to improve website functionality and user experience</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">You can control and manage cookies through your browser settings</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Types of Cookies */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Settings className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Types of Cookies We Use</h2>
                </div>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-green-400" />
                        <h3 className="text-lg font-semibold text-foreground">Essential Cookies</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Required for basic website functionality, security, and user authentication. These cannot be disabled.
                      </p>
                      <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">Always Active</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-foreground">Analytics Cookies</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors use our website to improve user experience and platform performance.
                      </p>
                      <div className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Optional</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-purple-400" />
                        <h3 className="text-lg font-semibold text-foreground">Functional Cookies</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Remember your preferences and settings to provide a personalized experience across sessions.
                      </p>
                      <div className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded">Optional</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-orange-400" />
                        <h3 className="text-lg font-semibold text-foreground">Marketing Cookies</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
                      </p>
                      <div className="text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded">Optional</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Cookie Details */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Detailed Cookie Information</h2>
                </div>
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Cookie Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Purpose</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b border-primary/10">
                          <td className="py-3 px-4 font-mono text-primary">pentstark_session</td>
                          <td className="py-3 px-4">User authentication and session management</td>
                          <td className="py-3 px-4">Session</td>
                          <td className="py-3 px-4"><span className="text-green-400">Essential</span></td>
                        </tr>
                        <tr className="border-b border-primary/10">
                          <td className="py-3 px-4 font-mono text-primary">pentstark_preferences</td>
                          <td className="py-3 px-4">Store user preferences and settings</td>
                          <td className="py-3 px-4">1 year</td>
                          <td className="py-3 px-4"><span className="text-purple-400">Functional</span></td>
                        </tr>
                        <tr className="border-b border-primary/10">
                          <td className="py-3 px-4 font-mono text-primary">pentstark_analytics</td>
                          <td className="py-3 px-4">Website usage analytics and performance</td>
                          <td className="py-3 px-4">2 years</td>
                          <td className="py-3 px-4"><span className="text-blue-400">Analytics</span></td>
                        </tr>
                        <tr className="border-b border-primary/10">
                          <td className="py-3 px-4 font-mono text-primary">pentstark_marketing</td>
                          <td className="py-3 px-4">Marketing campaign tracking</td>
                          <td className="py-3 px-4">30 days</td>
                          <td className="py-3 px-4"><span className="text-orange-400">Marketing</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>

              {/* Third-Party Cookies */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Third-Party Services</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    We use trusted third-party services that may place cookies on your device. These services help us provide better functionality and user experience.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Google Analytics</h3>
                      <p className="text-sm text-muted-foreground">
                        Provides website usage analytics and performance insights to help us improve our platform.
                      </p>
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm">
                        Google Privacy Policy →
                      </a>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Intercom</h3>
                      <p className="text-sm text-muted-foreground">
                        Powers our customer support chat system and helps us provide better user assistance.
                      </p>
                      <a href="https://www.intercom.com/terms-and-policies#privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm">
                        Intercom Privacy Policy →
                      </a>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Stripe</h3>
                      <p className="text-sm text-muted-foreground">
                        Secure payment processing for our enterprise services and training subscriptions.
                      </p>
                      <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm">
                        Stripe Privacy Policy →
                      </a>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Cloudflare</h3>
                      <p className="text-sm text-muted-foreground">
                        Provides security, performance optimization, and content delivery network services.
                      </p>
                      <a href="https://www.cloudflare.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm">
                        Cloudflare Privacy Policy →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Cookie Controls */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Settings className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Managing Your Cookie Preferences</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Browser Settings</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You can control cookies through your browser settings. Most browsers allow you to:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">View and delete existing cookies</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">Block cookies from specific websites</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">Block all cookies (may affect website functionality)</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Opt-Out Links</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You can also opt out of specific tracking services:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                          Google Analytics Opt-out
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                          Your Online Choices
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Updates to Policy */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Policy Updates</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. 
                    We will notify you of any significant changes by posting the updated policy on our website.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Changes will be effective immediately upon posting</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">We recommend reviewing this policy periodically</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">Continued use of our services constitutes acceptance of changes</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-center flex flex-col items-center">
                <div className="flex flex-col items-center justify-center space-y-3 mb-6 w-full">
                  <AlertTriangle className="h-6 w-6 text-primary mx-auto" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron text-center w-full">Questions About Cookies?</h2>
                </div>
                <div className="space-y-6 w-full flex flex-col items-center">
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    If you have any questions about our use of cookies or this policy, please contact us:
                  </p>
                  <div className="space-y-2 text-sm w-full flex flex-col items-center text-center max-w-md mx-auto">
                    <p className="text-foreground"><strong>Email:</strong> <span className="text-primary">privacy@pentstark.com</span></p>
                    <p className="text-foreground"><strong>Cookie Preferences:</strong> <span className="text-primary">cookies@pentstark.com</span></p>
                    <p className="text-foreground"><strong>Address:</strong> <span className="text-muted-foreground block">Pentstark LLP<br />Legal & Compliance Department<br />1601 S California Avenue<br />Palo Alto, CA 94304, United States</span></p>
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

export default CookiePolicyPage;
