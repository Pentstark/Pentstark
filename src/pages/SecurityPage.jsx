import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Award, Database, Globe, AlertTriangle, FileText, Zap, Target, Users, CheckCircle } from 'lucide-react';

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

const SecurityPage = () => {
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
                  SECURITY OVERVIEW
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                Enterprise-Grade <span className="enterprise-text-gradient">Security</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                At PentStark, security isn't just what we teach—it's how we operate. Our platform is built with enterprise-grade security controls to protect your data and maintain your trust.
              </motion.p>
              <motion.div variants={itemVariants} className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>SOC 2 Type II</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>ISO 27001</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Security Framework */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.div variants={itemVariants} className="text-center space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-orbitron w-full text-center">Security Framework</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto w-full text-center">Our comprehensive security framework follows industry best practices and regulatory requirements to ensure maximum protection of your data.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                <div className="enterprise-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <div className="mb-4 w-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 w-full text-center">Data Encryption</h3>
                    <p className="text-sm text-muted-foreground w-full text-center">All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption with regular key rotation.</p>
                  </div>
                </div>

                <div className="enterprise-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <div className="mb-4 w-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 w-full text-center">Access Control</h3>
                    <p className="text-sm text-muted-foreground w-full text-center">Multi-factor authentication, role-based access control, and principle of least privilege across all systems.</p>
                  </div>
                </div>

                <div className="enterprise-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <div className="mb-4 w-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 w-full text-center">Secure Infrastructure</h3>
                    <p className="text-sm text-muted-foreground w-full text-center">Cloud infrastructure hosted in SOC 2 Type II certified data centers with 24/7 monitoring and incident response.</p>
                  </div>
                </div>

                <div className="enterprise-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <div className="mb-4 w-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 w-full text-center">Continuous Testing</h3>
                    <p className="text-sm text-muted-foreground w-full text-center">Regular penetration testing, vulnerability assessments, and security audits by third-party security firms.</p>
                  </div>
                </div>

                <div className="enterprise-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <div className="mb-4 w-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 w-full text-center">Team Training</h3>
                    <p className="text-sm text-muted-foreground w-full text-center">All team members undergo regular security training and background checks to maintain security awareness.</p>
                  </div>
                </div>

                <div className="enterprise-card p-6 rounded-2xl flex flex-col items-center text-center">
                  <div className="mb-4 w-full flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 w-full text-center">Incident Response</h3>
                    <p className="text-sm text-muted-foreground w-full text-center">24/7 security operations center with automated threat detection and rapid incident response procedures.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Compliance & Certifications */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.div variants={itemVariants} className="text-center space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-orbitron w-full text-center">Compliance & Certifications</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto w-full text-center">We maintain the highest standards of compliance with industry regulations and security frameworks.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 text-center">
                <div className="enterprise-card p-8 rounded-2xl border border-primary/20 flex flex-col items-center text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 mb-6 w-full text-center">
                    <Award className="h-6 w-6 text-primary mx-auto" />
                    <h3 className="text-xl font-bold text-foreground font-orbitron w-full text-center">SOC 2 Type II</h3>
                  </div>
                  <div className="space-y-4 w-full text-center">
                    <p className="text-muted-foreground w-full text-center">Our SOC 2 Type II certification demonstrates our commitment to security, availability, processing integrity, confidentiality, and privacy.</p>
                    <div className="space-y-2 w-full text-center">
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">Annual independent audits</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">Continuous monitoring and reporting</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">Third-party validation of controls</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="enterprise-card p-8 rounded-2xl border border-primary/20 flex flex-col items-center text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 mb-6 w-full text-center">
                    <Globe className="h-6 w-6 text-primary mx-auto" />
                    <h3 className="text-xl font-bold text-foreground font-orbitron w-full text-center">ISO 27001</h3>
                  </div>
                  <div className="space-y-4 w-full text-center">
                    <p className="text-muted-foreground w-full text-center">ISO 27001 certification ensures our information security management system meets international standards.</p>
                    <div className="space-y-2 w-full text-center">
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">Risk-based security approach</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">Continuous improvement processes</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">Regular management reviews</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="enterprise-card p-8 rounded-2xl border border-primary/20 flex flex-col items-center text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 mb-6 w-full text-center">
                    <Shield className="h-6 w-6 text-primary mx-auto" />
                    <h3 className="text-xl font-bold text-foreground font-orbitron w-full text-center">GDPR Compliance</h3>
                  </div>
                  <div className="space-y-4 w-full text-center">
                    <p className="text-muted-foreground w-full text-center">Full compliance with the General Data Protection Regulation for handling personal data of EU residents.</p>
                    <div className="space-y-2 w-full text-center">
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">Data subject rights implementation</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">Privacy by design principles</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">Data Protection Officer on staff</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="enterprise-card p-8 rounded-2xl border border-primary/20 flex flex-col items-center text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 mb-6 w-full text-center">
                    <FileText className="h-6 w-6 text-primary mx-auto" />
                    <h3 className="text-xl font-bold text-foreground font-orbitron w-full text-center">Additional Standards</h3>
                  </div>
                  <div className="space-y-4 w-full text-center">
                    <p className="text-muted-foreground w-full text-center">We also adhere to additional security frameworks and industry best practices.</p>
                    <div className="space-y-2 w-full text-center">
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">NIST Cybersecurity Framework</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">OWASP Security Guidelines</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full text-center">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-center">CSA Cloud Security Alliance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Security Measures */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.div variants={itemVariants} className="text-center space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-orbitron">
                  Technical Security Measures
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our technical infrastructure implements multiple layers of security controls to protect against evolving threats.
                </p>
              </motion.div>

              {/* Enhanced Security Grid */}
              <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
                {/* Network Security Card */}
                <div className="enterprise-card p-8 rounded-2xl relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground font-orbitron">Network Security</h3>
                        <p className="text-xs text-muted-foreground">Advanced protection layer</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">Web Application Firewall (WAF)</p>
                          <p className="text-xs text-muted-foreground">Advanced threat detection and filtering</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">DDoS Protection</p>
                          <p className="text-xs text-muted-foreground">Multi-layered attack mitigation</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">Network Segmentation</p>
                          <p className="text-xs text-muted-foreground">Isolated environments and access controls</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Protection Card */}
                <div className="enterprise-card p-8 rounded-2xl relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground font-orbitron">Data Protection</h3>
                        <p className="text-xs text-muted-foreground">Military-grade encryption</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">AES-256 Encryption</p>
                          <p className="text-xs text-muted-foreground">Military-grade encryption at rest</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">TLS 1.3 in Transit</p>
                          <p className="text-xs text-muted-foreground">Secure communication channels</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">Regular Backups</p>
                          <p className="text-xs text-muted-foreground">Automated, encrypted backup systems</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monitoring & Detection Card */}
                <div className="enterprise-card p-8 rounded-2xl relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground font-orbitron">Monitoring & Detection</h3>
                        <p className="text-xs text-muted-foreground">24/7 threat intelligence</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">24/7 SOC Monitoring</p>
                          <p className="text-xs text-muted-foreground">Round-the-clock threat detection</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">SIEM Integration</p>
                          <p className="text-xs text-muted-foreground">Advanced security information management</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">Anomaly Detection</p>
                          <p className="text-xs text-muted-foreground">AI-powered threat identification</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vulnerability Management Card */}
                <div className="enterprise-card p-8 rounded-2xl relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground font-orbitron">Vulnerability Management</h3>
                        <p className="text-xs text-muted-foreground">Proactive security testing</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">Regular Pen Testing</p>
                          <p className="text-xs text-muted-foreground">Quarterly security assessments</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">Automated Scanning</p>
                          <p className="text-xs text-muted-foreground">Continuous vulnerability detection</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-background/30 rounded-lg backdrop-blur-sm hover:bg-background/50 transition-all duration-300">
                        <div className="w-3 h-3 bg-lime-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">Patch Management</p>
                          <p className="text-xs text-muted-foreground">Rapid security update deployment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Security Contact */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-center flex flex-col items-center">
                <div className="flex flex-col items-center justify-center space-y-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-primary mx-auto" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground font-orbitron">Security Contact</h2>
                </div>
                <div className="space-y-6 w-full flex flex-col items-center">
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    If you have security concerns, vulnerabilities to report, or questions about our security practices, please contact our security team:
                  </p>
                  <div className="flex flex-col md:flex-row justify-center gap-6 w-full items-center text-center">
                    <div className="flex-1 min-w-[220px] flex flex-col items-center text-center">
                      <h3 className="font-semibold text-foreground mb-3">Security Team</h3>
                      <div className="space-y-2 text-sm w-full flex flex-col items-center text-center">
                        <p className="text-foreground"><strong>Email:</strong> <span className="text-primary">security@pentstark.com</span></p>
                        <p className="text-foreground"><strong>PGP Key:</strong> <span className="text-primary">Available on request</span></p>
                        <p className="text-foreground"><strong>Response Time:</strong> <span className="text-muted-foreground">24 hours for critical issues</span></p>
                      </div>
                    </div>
                    <div className="flex-1 min-w-[220px] flex flex-col items-center text-center">
                      <h3 className="font-semibold text-foreground mb-3">Responsible Disclosure</h3>
                      <div className="space-y-2 text-sm w-full flex flex-col items-center text-center">
                        <p className="text-foreground"><strong>Bug Bounty:</strong> <span className="text-primary">bug-bounty@pentstark.com</span></p>
                        <p className="text-foreground"><strong>Vulnerability Reports:</strong> <span className="text-primary">vuln-reports@pentstark.com</span></p>
                        <p className="text-foreground"><strong>Acknowledgment:</strong> <span className="text-muted-foreground">All reports acknowledged</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 w-full flex flex-col items-center">
                    <h3 className="font-semibold text-foreground mb-3">Enterprise Contact</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-foreground"><strong>Address:</strong> <span className="text-muted-foreground">Pentstark LLP<br />Security Operations Center<br />Citadel A 1 Manipal County Club Road,<br />Bangalore South, India</span></p>
                      <p className="text-foreground"><strong>Phone:</strong> <span className="text-primary">+91 94806 20540</span></p>
                      <p className="text-foreground"><strong>Emergency Hotline:</strong> <span className="text-primary">+91 94806 20540</span></p>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20 max-w-2xl mx-auto">
                    <p className="text-sm text-yellow-400">
                      <strong>Note:</strong> We appreciate responsible disclosure. Please allow us to investigate and address security issues before public disclosure.
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

export default SecurityPage;
