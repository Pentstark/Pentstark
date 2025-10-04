import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Globe, Monitor, Database, Wifi, Server, Smartphone, Code, ShieldCheck, Brain, HeartHandshake as Handshake } from 'lucide-react';
// Assuming pageVariants, sectionVariants, and itemVariants are defined elsewhere as they were in the original code.
// For a self-contained example, I'll define simple ones here.
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
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


const teamMembers = [
  // Updated image URLs to follow your specified pattern
  { name: 'K K Raju', role: 'Founder & CEO', image: 'https://assets.pentstark.com/person1.png', expertise: 'Cybersecurity Strategy, AI in Security' },
  { name: 'Harsh Singh', role: 'Head of Engineering', image: 'https://assets.pentstark.com/person2.png', expertise: 'Secure Development, Cloud Architecture' },
  { name: 'Pradeep', role: 'Lead Security Analyst', image: 'https://assets.pentstark.com/person3.png', expertise: 'Threat Intelligence, Incident Response' },
];

const AboutPage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]"
    >
      <div className="relative z-10">
        {/* Hero Section - Enterprise Style */}
        <section className="enterprise-section relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              className="text-center space-y-8 md:space-y-12"
            >
              <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-semibold border border-primary/20">
                  ABOUT PENTSTARK
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                Securing <span className="enterprise-text-gradient">Tomorrow's Digital World</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed px-4">
                We are a passionate team of cybersecurity experts dedicated to protecting your digital assets and empowering you with knowledge.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={sectionVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 font-orbitron">
                  Our <span className="enterprise-text-gradient">Mission</span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                  To provide cutting-edge cybersecurity solutions and comprehensive training programs that empower organizations and individuals to navigate the digital world securely and confidently.
                </motion.p>
                <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  We believe in a proactive approach to security, staying ahead of threats through continuous innovation, research, and education.
                </motion.p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-2xl">
                  {/* soft background glow to blend with page background */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-35 rounded-3xl"></div>
                  {/* image container with rounded, bordered, overflow-hidden */}
                  <div className="relative overflow-hidden rounded-2xl border border-primary/20">
                    <img
                      className="w-full h-64 md:h-72 lg:h-80 object-cover"
                      alt="Cybersecurity team collaborating"
                      src="https://assets.pentstark.com/office.png"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/800x500/a855f7/ffffff?text=Office+Image";
                      }}
                    />
                    {/* subtle top-right gradient to improve contrast */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent"></div>
                    {/* edge-only backdrop blur mask to blur borders and blend */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl backdrop-blur-[2px]"
                      style={{
                        WebkitMask: "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
                        mask: "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center space-y-8 md:space-y-12 mb-12"
            >
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 font-orbitron">
                Why Choose <span className="enterprise-text-gradient">Us?</span>
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: Zap, title: 'Cutting-Edge Technology', desc: 'Utilizing the latest tools and methodologies to stay ahead of evolving threats.' },
                  { icon: Users, title: 'Expert Team', desc: 'Certified professionals with decades of combined experience in diverse security domains.' },
                  { icon: Globe, title: 'Global Reach, Local Expertise', desc: 'Serving clients worldwide with tailored solutions and 24/7 support.' },
                  { icon: ShieldCheck, title: 'Proactive Defense', desc: 'Focusing on preventative measures and continuous monitoring to mitigate risks.' },
                  { icon: Brain, title: 'Knowledge Transfer', desc: 'Empowering your team through comprehensive training and skill development.' },
                  { icon: Handshake, title: 'Trusted Partnerships', desc: 'Building long-term relationships based on transparency and mutual success.' },
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="enterprise-card group hover:border-primary/50 transition-all duration-300 text-center p-6 md:p-8"
                  >
                    <item.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 font-orbitron">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Leadership Section */}
        {/* <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center space-y-8 md:space-y-12 mb-12"
            >
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 font-orbitron">
                Meet Our <span className="enterprise-text-gradient">Leadership</span>
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="enterprise-card group hover:border-primary/50 transition-all duration-300 text-center p-6 md:p-8"
                  >
                    <img 
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-primary/50 group-hover:border-primary transition-colors duration-300" 
                      alt={member.name} 
                      src={member.image} 
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = `https://placehold.co/128x128/a855f7/ffffff?text=${member.name.split(' ')[0]}`; 
                      }}
                    />
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 font-orbitron">{member.name}</h3>
                    <p className="text-primary text-sm mb-2 font-medium">{member.role}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{member.expertise}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section> */}

        {/* Expertise Section */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center space-y-8 md:space-y-12"
            >
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 font-orbitron">
                Our Areas of <span className="enterprise-text-gradient">Expertise</span>
              </motion.h2>
              <div className="space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                  {[
                    { icon: Monitor, label: 'Network Security' },
                    { icon: Database, label: 'Data Protection' },
                    { icon: Wifi, label: 'Cloud Security' },
                    { icon: Server, label: 'Infrastructure' },
                    { icon: Smartphone, label: 'Mobile Security' },
                    { icon: Code, label: 'Secure Coding' },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      className="enterprise-card group hover:border-primary/50 transition-all duration-300 text-center p-4 md:p-6"
                    >
                      <item.icon className="h-10 w-10 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-sm text-muted-foreground font-medium">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center pt-8 max-w-2xl mx-auto">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 font-orbitron">Comprehensive Security Coverage</h3>
                  <p className="text-muted-foreground leading-relaxed">End-to-end protection across all your digital assets, ensuring robust security posture.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutPage;
