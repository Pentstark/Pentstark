import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { pageVariants, sectionVariants, itemVariants } from '@/lib/animations';
import { MapPin, Mail, Phone } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import emailjs from '@emailjs/browser';

const SERVICE_EMAIL = "team@pentstark.com";

const ContactPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate(); // <-- Add this line
  const [serviceId, setServiceId] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    serviceInterest: '',
    message: '',
  });

  const serviceOptions = [
    { value: '', label: 'Choose your enterprise solution' },
    { value: 'penetration-testing', label: 'Penetration Testing & Vulnerability Assessment' },
    { value: 'security-monitoring', label: '24/7 Security Monitoring & SOC Services' },
    { value: 'compliance-audit', label: 'Compliance Audit & Risk Management' },
    { value: 'secure-development', label: 'Secure Code Development & DevSecOps' },
    { value: 'academy-general', label: 'Cybersecurity Academy & Certification' },
    { value: 'corporate-training', label: 'Executive & Corporate Security Training' },
    { value: 'other', label: 'Custom Enterprise Security Consultation' }
  ];

  // Detect interest param and fetch service from Supabase if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const interest = params.get('interest');
    if (interest) {
      setServiceId(interest);
      setLoading(true);
      supabase
        .from('services')
        .select('id, title, description, features, category')
        .eq('id', interest)
        .single()
        .then(({ data, error }) => {
          setService(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log('Supabase fetch catch error:', err);
          setLoading(false);
        });
    } else {
      setServiceId(null);
      setService(null);
    }
  }, [location.search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log('FormData changed:', { ...formData, [name]: value });
  };

  // Handle form submit: insert into DB and send email
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Insert into Supabase
    const { error } = await supabase
      .from('service_requests')
      .insert([
        {
          service_id: serviceId,
          details: formData.message,
        }
      ]);
    console.log('Supabase insert result:', { error });

    // 2. Send email via EmailJS
    let emailError = null;
    try {
      const emailResult = await emailjs.send(
        'service_ku5bb0c', // Your EmailJS service ID
        'template_nad5tcj', // Your EmailJS template ID
        {
          to_email: SERVICE_EMAIL,
          from_email: formData.email || 'noreply@pentstark.com',
          from_name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Contact Form',
          company: formData.company || 'N/A',
          service_name: service?.title || '',
          service_category: service?.category || '',
          service_description: service?.description || '',
          service_features: service?.features ? service.features.join(', ') : '',
          message: formData.message,
        },
        'xjLwcdZxjN3amECQE' // Your EmailJS public key
      );
      console.log('EmailJS result:', emailResult);
      console.log('Email sent to:', SERVICE_EMAIL);
      console.log('Email sent from:', formData.email || 'noreply@pentstark.com');
      console.log('Service requested:', service?.title);
      console.log('Message:', formData.message);
    } catch (err) {
      emailError = err;
      console.log('EmailJS error:', err);
      console.log('Failed to send email to:', SERVICE_EMAIL);
      console.log('Attempted to send from:', formData.email || 'noreply@pentstark.com');
      console.log('Service requested:', service?.title);
      console.log('Message:', formData.message);
    }

    setLoading(false);

    if (!error && !emailError) {
      toast({
        title: "Request Sent!",
        description: "Thank you for your interest. Our team will contact you soon.",
      });
      setFormData({ message: '' });
      setTimeout(() => {
        navigate('/'); // Go back to home page after toast
      }, 1500); // Wait 1.5 seconds for the toast to show
    } else {
      toast({
        title: "Error",
        description: "There was a problem submitting your request.",
        variant: "destructive",
      });
    }
  };

  // Debug: log state on each render

  // If interest param is present, show only the service interest and message fields
  if (serviceId) {
    if (loading || !service) {
      return (
        <div className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]">
          <div className="relative z-10 py-20 flex items-center justify-center min-h-[40vh]">
            <div className="text-center text-lg text-muted-foreground">Loading service details...</div>
          </div>
        </div>
      );
    }

    return (
      <div className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117]">
        <div className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Service Details Card */}
              <div className="space-y-8">
                <div className="enterprise-card rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-7 w-7 text-primary mr-3" />
                    <h2 className="text-2xl font-bold text-foreground mb-0 font-orbitron">Service Details</h2>
                  </div>
                  <div className="mb-4">
                    <div className="text-muted-foreground text-sm mb-1">Service Name</div>
                    <div className="text-xl font-semibold text-primary">{service.title}</div>
                  </div>
                  {service.category && (
                    <div className="mb-2">
                      <span className="text-muted-foreground text-sm">Category: </span>
                      <span className="text-foreground">{service.category}</span>
                    </div>
                  )}
                  {service.description && (
                    <div className="mb-2">
                      <span className="text-muted-foreground text-sm">Description:</span>
                      <div className="text-muted-foreground">{service.description}</div>
                    </div>
                  )}
                  {service.features && Array.isArray(service.features) && service.features.length > 0 && (
                    <div className="mb-2">
                      <span className="text-muted-foreground text-sm">Features:</span>
                      <ul className="list-disc list-inside text-muted-foreground mt-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* Service Request Form */}
              <div>
                <form onSubmit={handleSubmit} className="enterprise-card rounded-2xl p-8 space-y-6 shadow-lg">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 font-orbitron">Request This Service</h2>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Service</label>
                    <input
                      type="text"
                      value={service.title}
                      readOnly
                      className="w-full px-4 py-3 bg-background/50 border border-primary/40 rounded-lg text-primary font-semibold backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-lg text-foreground resize-none placeholder-muted-foreground backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={`Tell us about your needs or questions for "${service.title}"...`}
                    ></textarea>
                  </div>
                  <div>
                    <Button type="submit" size="xl" className="w-full auth-button-primary font-bold" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Request'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default contact form
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              className="text-center space-y-8 md:space-y-12"
            >
              <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-semibold border border-primary/20">
                  ENTERPRISE CONTACT
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-orbitron mb-6 leading-tight">
                Get Started <span className="enterprise-text-gradient">Today</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                Ready to secure your business or advance your career? Let's discuss your cybersecurity needs. 
                We're here to help you navigate the complexities of the digital threat landscape.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="enterprise-section py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
              <motion.div
                variants={sectionVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 font-orbitron">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-foreground font-medium">Pentstark LLP Headquarters</div>
                        <div className="text-muted-foreground">Address: Citadel A 1 Manipal County Club Road, Bangalore South, India</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-foreground font-medium">Email Support</div>
                        <div className="text-muted-foreground">team@pentstark.com</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-foreground font-medium">Phone Support</div>
                        <div className="text-muted-foreground">+91 9480620540</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="enterprise-card p-8 rounded-2xl">
                  <h2 className="text-xl font-semibold text-foreground mb-4 font-orbitron">Why Work With Us?</h2>
                  <ul className="space-y-3">
                    {[
                      "Industry-leading expertise and certifications",
                      "Customized solutions for your specific needs",
                      "Proven track record with 500+ successful projects",
                      "Comprehensive training and ongoing support",
                      "24/7 monitoring and rapid incident response"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              <motion.div
                variants={sectionVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <form onSubmit={handleSubmit} className="enterprise-card p-8 rounded-2xl space-y-6">
                  <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-foreground mb-6 font-orbitron">Send Us a Message</motion.h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-4 font-orbitron tracking-wide uppercase text-xs">First Name</label>
                      <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange}
                        className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground backdrop-blur-sm font-orbitron text-xs font-semibold tracking-wide uppercase placeholder:text-foreground placeholder:font-orbitron placeholder:text-xs placeholder:font-semibold placeholder:tracking-wide placeholder:uppercase"
                        placeholder="John" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-4 font-orbitron tracking-wide uppercase text-xs">Last Name</label>
                      <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange}
                        className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground backdrop-blur-sm font-orbitron text-xs font-semibold tracking-wide uppercase placeholder:text-foreground placeholder:font-orbitron placeholder:text-xs placeholder:font-semibold placeholder:tracking-wide placeholder:uppercase"
                        placeholder="Doe" />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-4 font-orbitron tracking-wide uppercase text-xs">Email</label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground backdrop-blur-sm font-orbitron text-xs font-semibold tracking-wide uppercase placeholder:text-foreground placeholder:font-orbitron placeholder:text-xs placeholder:font-semibold placeholder:tracking-wide placeholder:uppercase"
                      placeholder="john@company.com" />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-4 font-orbitron tracking-wide uppercase text-xs">Company (Optional)</label>
                    <input id="company" name="company" type="text" value={formData.company} onChange={handleChange}
                      className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground backdrop-blur-sm font-orbitron text-xs font-semibold tracking-wide uppercase placeholder:text-foreground placeholder:font-orbitron placeholder:text-xs placeholder:font-semibold placeholder:tracking-wide placeholder:uppercase"
                      placeholder="Your Company Inc." />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="serviceInterest" className="block text-sm font-semibold text-foreground mb-4 font-orbitron tracking-wide uppercase text-xs">Service Interest</label>
                    <div className="relative group dropdown-container">
                      {/* Premium layered background effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-purple-500/20 to-fuchsia-500/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1625]/95 via-[#1e1a2e]/95 to-[#252040]/95 rounded-xl"></div>
                      
                      {/* Custom Dropdown Button */}
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="relative w-full px-6 py-5 bg-transparent border-2 border-primary/20 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary/60 text-foreground cursor-pointer transition-all duration-500 hover:border-primary/40 font-medium text-base tracking-wide shadow-2xl shadow-black/20 backdrop-blur-xl group-hover:shadow-primary/5 text-left"
                        style={{
                          background: 'linear-gradient(135deg, rgba(26, 22, 37, 0.98) 0%, rgba(30, 26, 46, 0.98) 50%, rgba(37, 32, 64, 0.98) 100%)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(139, 92, 246, 0.1)'
                        }}>
                        <span className={`font-orbitron text-xs font-semibold tracking-wide uppercase ${formData.serviceInterest ? 'text-white' : 'text-muted-foreground'  }`}>
                          {serviceOptions.find(option => option.value === formData.serviceInterest)?.label || 'Choose your enterprise solution'}
                        </span>
                      </button>
                      
                      {/* Clean custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                        <ChevronDown className={`w-6 h-6 text-primary/80 group-hover:text-primary transition-all duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {/* Custom Dropdown Menu */}
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 mt-2 z-50 bg-gradient-to-br from-[#1a1625]/98 via-[#1e1a2e]/98 to-[#252040]/98 backdrop-blur-xl border border-primary/20 rounded-xl shadow-2xl shadow-black/40 overflow-hidden max-h-80 overflow-y-auto"
                          style={{
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          }}>
                          {serviceOptions.map((option, index) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, serviceInterest: option.value }));
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-6 py-4 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/10 hover:to-fuchsia-500/10 border-b border-white/5 last:border-b-0 ${
                                option.value === '' ? 'text-muted-foreground' : 'text-foreground hover:text-white'
                              } ${formData.serviceInterest === option.value ? 'bg-primary/10 text-primary' : ''}`}>
                              {option.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                      
                      {/* Hidden input for form submission */}
                      <input
                        type="hidden"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                      />
                      
                      {/* Premium border glow effect */}
                      <div className="absolute inset-0 rounded-xl ring-1 ring-primary/0 group-focus-within:ring-primary/30 transition-all duration-500 pointer-events-none"></div>
                      <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-primary/10 via-transparent to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                    </div>
                    
                    {/* Premium status indicator */}
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground/70 font-light tracking-wider uppercase">
                        {/*Enterprise-grade solutions tailored for your needs */}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-foreground font-orbitron tracking-wide uppercase text-xs">Available 24/7</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-4 font-orbitron tracking-wide uppercase text-xs">Message</label>
                    <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground backdrop-blur-sm font-orbitron text-xs font-semibold tracking-wide uppercase placeholder:text-foreground placeholder:font-orbitron placeholder:text-xs placeholder:font-semibold placeholder:tracking-wide placeholder:uppercase"
                      placeholder="Tell us about your cybersecurity needs or questions..."></textarea>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button type="submit" size="xl" className="w-full auth-button-primary font-bold" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ContactPage;