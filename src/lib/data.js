import { Shield, Lock, Eye, Code, Database, Wifi, Server, Monitor, Smartphone, Users, BookOpen, Award, Zap, Target, Globe, CheckCircle, AlertTriangle, CalendarDays, Layers, Terminal, Shuffle, Share2, Settings2, Briefcase, UserCheck, Building, Headphones as Headset } from 'lucide-react';

export const servicesData = [
  {
    id: "penetration-testing",
    icon: Shield,
    title: "Penetration Testing",
    description: "Comprehensive security assessments to identify vulnerabilities before attackers do.",
    longDescription: "Our penetration testing services simulate real-world attacks to identify vulnerabilities in your systems, applications, and networks. We provide detailed reports with actionable recommendations to strengthen your defenses. This includes network, web application, mobile app, and social engineering tests.",
    features: ["Network Security Testing", "Web Application Security Audits", "Mobile App Vulnerability Assessment", "Social Engineering Simulations", "Wireless Network Security Testing", "Physical Security Assessments"],
    caseStudy: { client: "FinTech Corp", summary: "Identified critical vulnerabilities in their online banking platform, preventing potential multi-million dollar losses." },
    focusArea: "Vulnerability Identification",
    typicalDuration: "1-4 Weeks",
    deliverables: ["Detailed Report", "Executive Summary", "Technical Findings", "Remediation Plan"],
    challengesAddressed: ["Unknown vulnerabilities", "Compliance requirements (e.g., PCI DSS)", "Pre-launch security validation", "Third-party risk assessment"]
  },
  {
    id: "security-monitoring",
    icon: Eye,
    title: "Security Monitoring & SOC",
    description: "24/7 threat detection and incident response to keep your systems secure.",
    longDescription: "Our Security Operations Center (SOC) provides round-the-clock monitoring of your IT environment. We leverage advanced SIEM technology, threat intelligence, and expert analysts to detect, analyze, and respond to security incidents rapidly, minimizing impact.",
    features: ["24/7 Real-time Security Monitoring", "Advanced Threat Intelligence Feeds", "Rapid Incident Response & Triage", "Security Information & Event Management (SIEM)", "Log Management & Analysis", "Vulnerability Scanning & Management"],
    caseStudy: { client: "Healthcare Provider X", summary: "Detected and neutralized a ransomware attack in its early stages, protecting sensitive patient data and ensuring operational continuity." },
    focusArea: "Threat Detection & Response",
    typicalDuration: "Ongoing Service",
    deliverables: ["Regular Security Posture Reports", "Incident Alerts & Notifications", "Threat Trend Analysis", "Compliance Reporting"],
    challengesAddressed: ["Sophisticated cyber attacks", "Alert fatigue", "Lack of in-house security expertise", "Regulatory compliance (HIPAA, GDPR)", "Insider threats"]
  },
  {
    id: "compliance-audit",
    icon: Lock,
    title: "Compliance & Audit",
    description: "Ensure your organization meets industry standards and regulatory requirements.",
    longDescription: "We help organizations navigate complex regulatory landscapes and achieve compliance with standards like ISO 27001, SOC 2, GDPR, HIPAA, and PCI DSS. Our services include gap analysis, readiness assessments, audit support, and policy development.",
    features: ["ISO 27001/27002 Implementation & Audit", "SOC 2 Type I & Type II Readiness", "GDPR & CCPA Compliance Assessment", "PCI DSS Scoping & Validation", "HIPAA Security Rule Compliance", "Security Policy & Procedure Development"],
    caseStudy: { client: "E-commerce Giant Ltd.", summary: "Successfully guided them through PCI DSS Level 1 certification, enabling secure processing of millions of transactions." },
    focusArea: "Regulatory Adherence",
    typicalDuration: "Project-based or Ongoing",
    deliverables: ["Gap Analysis Report", "Compliance Roadmap", "Audit Evidence Package", "Policy Documentation"],
    challengesAddressed: ["Meeting complex regulatory demands", "Preparing for external audits", "Establishing a strong security governance framework", "Data privacy concerns"]
  },
  {
    id: "secure-development",
    icon: Code,
    title: "Secure Development (DevSecOps)",
    description: "Build security into your software development lifecycle from the ground up.",
    longDescription: "Our DevSecOps services integrate security practices throughout your entire software development lifecycle (SDLC). We assist with secure code reviews, security architecture design, automated security testing, and training your developers on secure coding practices.",
    features: ["Secure SDLC Implementation", "Static & Dynamic Application Security Testing (SAST/DAST)", "Threat Modeling & Security Architecture Review", "Container & Kubernetes Security", "Infrastructure as Code (IaC) Security", "Developer Security Training"],
    caseStudy: { client: "SaaS Startup InnovateX", summary: "Implemented a DevSecOps pipeline, reducing vulnerabilities in new releases by 80% and accelerating secure deployment cycles." },
    focusArea: "Application Security",
    typicalDuration: "Ongoing or Project-based",
    deliverables: ["Secure Development Guidelines", "Vulnerability Reports", "Automated Security Test Scripts", "Architecture Recommendations"],
    challengesAddressed: ["Vulnerabilities in custom applications", "Integrating security into agile workflows", "Lack of developer security awareness", "Meeting secure coding standards"]
  },
  {
    id: "api-security-testing",
    icon: Shuffle, // Represents data exchange, connections
    title: "API Security Testing",
    description: "Secure your APIs against injection attacks, broken authentication, and data leaks.",
    longDescription: "APIs are critical components of modern applications. Our API security testing service focuses on identifying vulnerabilities specific to APIs, such as broken object level authorization (BOLA), broken authentication, excessive data exposure, and injection flaws. We test REST, GraphQL, and other API architectures.",
    features: ["OWASP API Top 10 Testing", "Authentication & Authorization Testing", "Data Exposure Analysis", "Injection Vulnerability Checks", "Rate Limiting & Resource Management Tests", "Security Misconfiguration Detection"],
    focusArea: "API Vulnerability Management",
    typicalDuration: "1-2 Weeks",
    deliverables: ["API Vulnerability Report", "Exploitation Scenarios", "Remediation Guidance"],
    challengesAddressed: ["API-specific vulnerabilities", "Securing microservices", "Protecting sensitive data transiting APIs", "Third-party API integrations"]
  },
  {
    id: "web-application-security",
    icon: Globe, // Represents web
    title: "Web Application Security",
    description: "Identify and remediate vulnerabilities in your web applications before they can be exploited.",
    longDescription: "Our web application security assessments dive deep into your web platforms to uncover critical vulnerabilities like XSS, SQLi, CSRF, and more. We provide comprehensive testing aligned with OWASP standards to ensure your applications are resilient against modern threats.",
    features: ["OWASP Top 10 Testing", "Authenticated & Unauthenticated Scanning", "Business Logic Flaw Detection", "Client-side & Server-side Vulnerability Analysis", "Security Header & Configuration Review", "Detailed Remediation Advice"],
    focusArea: "Web Platform Hardening",
    typicalDuration: "1-3 Weeks",
    deliverables: ["Web Application Security Report", "Proof-of-Concept Exploits", "Risk-Prioritized Findings"],
    challengesAddressed: ["Complex web vulnerabilities", "Protecting user data", "Ensuring application availability", "Compliance with web security standards"]
  },
  {
    id: "network-pen-testing",
    icon: Wifi, // Standard for network
    title: "Network Pen Testing",
    description: "Simulate real-world attacks to uncover weaknesses in your network infrastructure.",
    longDescription: "We conduct thorough penetration tests on your internal and external network infrastructure. This includes identifying misconfigurations, vulnerable services, weak passwords, and potential pathways for lateral movement, helping you fortify your network perimeter and internal defenses.",
    features: ["External & Internal Network Testing", "Vulnerability Scanning & Exploitation", "Firewall & Router Configuration Review", "Wireless Network Security Assessment", "Segmentation Testing", "Active Directory Security Review (Basic)"],
    focusArea: "Infrastructure Security",
    typicalDuration: "1-3 Weeks",
    deliverables: ["Network Penetration Test Report", "Attack Path Mapping", "Configuration Hardening Guides"],
    challengesAddressed: ["Perimeter vulnerabilities", "Internal network weaknesses", "Unpatched systems", "Weak access controls"]
  },
  {
    id: "mobile-app-security",
    icon: Smartphone, // Specific for mobile
    title: "Mobile App Security",
    description: "Assess Android and iOS apps for platform-specific risks and misconfigurations.",
    longDescription: "Our mobile application security testing covers both Android and iOS platforms. We look for vulnerabilities such as insecure data storage, insecure communication, code tampering risks, reverse engineering threats, and platform-specific misconfigurations, ensuring your mobile apps are secure.",
    features: ["Static & Dynamic Analysis (SAST/DAST)", "Reverse Engineering Resistance Testing", "Insecure Data Storage Review", "OWASP Mobile Top 10", "API Interaction Security", "Platform-Specific Vulnerability Checks"],
    focusArea: "Mobile Application Integrity",
    typicalDuration: "1-2 Weeks per Platform",
    deliverables: ["Mobile App Security Report", "Platform-Specific Findings", "Code-Level Recommendations"],
    challengesAddressed: ["Data leakage from mobile apps", "Platform-specific vulnerabilities", "Protecting intellectual property in apps", "Secure API usage by mobile apps"]
  },
  {
    id: "active-directory-security",
    icon: Users, // Represents user accounts and directories
    title: "Active Directory Security",
    description: "Detect misconfigurations, privilege escalation paths, and domain takeover risks.",
    longDescription: "Active Directory is a prime target for attackers. Our AD security assessment focuses on identifying common misconfigurations, weak policies, privilege escalation paths, and vulnerabilities that could lead to domain compromise. We help you harden your AD environment.",
    features: ["AD Misconfiguration Analysis (e.g., BloodHound, PingCastle)", "Password Policy & Audit Review", "Privilege Escalation Path Detection", "Group Policy Object (GPO) Security Review", "Kerberos Security Analysis", "Detection of Persistency Techniques"],
    focusArea: "Identity & Access Management Security",
    typicalDuration: "1 Week",
    deliverables: ["AD Security Assessment Report", "Prioritized Remediation Steps", "Hardening Checklist"],
    challengesAddressed: ["Domain compromise risks", "Insider threats leveraging AD", "Lateral movement via AD", "Ensuring least privilege"]
  },
  {
    id: "grc-services",
    icon: Briefcase, // Represents governance, business
    title: "GRC Services",
    description: "Align business and IT strategies through risk assessments, policy enforcement, and compliance tracking.",
    longDescription: "Our Governance, Risk, and Compliance (GRC) services help your organization establish a strong security posture aligned with business objectives. We assist with risk assessments, developing security policies and procedures, achieving compliance with various standards, and ongoing compliance monitoring.",
    features: ["Security Risk Assessments", "Policy & Procedure Development", "Compliance Framework Implementation (ISO 27001, NIST)", "Security Awareness Training Programs", "Vendor Risk Management", "Business Continuity & Disaster Recovery Planning"],
    focusArea: "Strategic Security Management",
    typicalDuration: "Project-based or Ongoing",
    deliverables: ["Risk Assessment Report", "Security Policy Suite", "Compliance Dashboards", "Training Materials"],
    challengesAddressed: ["Aligning security with business goals", "Managing complex compliance landscapes", "Building a security-aware culture", "Quantifying and mitigating risks"]
  },
  {
    id: "third-party-audit-support",
    icon: UserCheck, // Represents validation, checking
    title: "Third-Party Audit Support",
    description: "Independent security audits to validate findings and support vendor assessments.",
    longDescription: "We provide independent security audit services to validate internal findings, prepare for external audits (like SOC 2, ISO 27001), or assess the security posture of your third-party vendors. Our objective assessments help ensure accuracy and thoroughness.",
    features: ["Independent Verification & Validation (IV&V)", "Pre-Audit Readiness Assessments", "Vendor Security Risk Assessments", "Audit Finding Remediation Support", "Evidence Collection & Preparation", "Expert Opinion & Consultation"],
    focusArea: "Security Assurance & Validation",
    typicalDuration: "Project-based",
    deliverables: ["Independent Audit Report", "Validation Findings", "Vendor Risk Scorecards", "Remediation Tracking"],
    challengesAddressed: ["Preparing for formal audits", "Validating security controls objectively", "Managing third-party risks", "Ensuring compliance accuracy"]
  },
  {
    id: "network-operations-center",
    icon: Headset, // Represents support, monitoring
    title: "Network Operations Center (NOC)",
    description: "Ensure high availability and performance of your IT infrastructure through 24/7 monitoring and support.",
    longDescription: "Our Network Operations Center (NOC) provides 24/7 monitoring, management, and support for your critical IT infrastructure. We proactively identify and resolve issues to ensure optimal performance, minimize downtime, and maintain business continuity for your network services.",
    features: ["24/7 Infrastructure Monitoring", "Network Performance Management", "Incident Detection & Resolution", "Patch Management & Maintenance", "Backup & Disaster Recovery Oversight", "Vendor Escalation & Management"],
    focusArea: "IT Infrastructure Reliability",
    typicalDuration: "Ongoing Service",
    deliverables: ["Performance & Availability Reports", "Incident Logs & Resolution Details", "Maintenance Schedules", "Health Check Summaries"],
    challengesAddressed: ["Minimizing network downtime", "Ensuring optimal IT performance", "Rapid response to infrastructure issues", "Resource constraints for 24/7 coverage"]
  }
];

export const academyProgramsData = [
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    duration: "8 weeks",
    level: "Beginner",
    students: 1250,
    rating: 4.9,
    description: "Master the basics of cybersecurity including network security, cryptography, and risk management. Ideal for those starting their cybersecurity journey.",
    longDescription: "This foundational course provides a comprehensive overview of cybersecurity principles. Students will learn about common threats, vulnerabilities, and the technologies and practices used to protect systems and data. Topics include network security, cryptography, access control, risk management, and security policies. Hands-on labs and real-world examples are used throughout.",
    modules: ["Introduction to Cybersecurity", "Network Security Basics", "Cryptography Essentials", "Access Control & Identity Management", "Risk Assessment & Management", "Security Policies & Procedures", "Incident Response Basics", "Introduction to Ethical Hacking"],
    learningOutcomes: [
      "Understand core cybersecurity concepts and terminology.",
      "Identify common cyber threats and vulnerabilities.",
      "Explain basic network security principles.",
      "Describe fundamental cryptographic techniques.",
      "Understand risk management processes.",
      "Recognize the importance of security policies."
    ],
    prerequisites: "Basic computer literacy",
    targetAudience: "IT professionals, career changers, students, anyone interested in cybersecurity basics.",
    certification: "CyberShield Certified Cybersecurity Fundamentals (CCCF)",
    format: "Online, Self-paced with weekly live Q&A sessions"
  },
  {
    id: "ethical-hacking-certification",
    title: "Ethical Hacking Certification",
    duration: "12 weeks",
    level: "Intermediate",
    students: 890,
    rating: 4.8,
    description: "Learn penetration testing techniques and become a certified ethical hacker. Gain hands-on experience in a safe, virtual lab environment.",
    longDescription: "This intensive program equips students with the knowledge and skills to perform ethical hacking and penetration testing. Covering reconnaissance, scanning, enumeration, exploitation, and post-exploitation, this course provides in-depth understanding of attacker methodologies. Students will practice using industry-standard tools in our virtual labs.",
    modules: ["Ethical Hacking Overview & Legal Frameworks", "Footprinting & Reconnaissance", "Scanning Networks & Enumeration", "Vulnerability Analysis", "System Hacking (Windows & Linux)", "Malware Threats & Countermeasures", "Sniffing & Social Engineering", "Denial-of-Service Attacks", "Session Hijacking", "Web Server & Application Hacking", "Wireless Network Hacking", "Mobile Platform Hacking", "Cryptography in Hacking", "Cloud Computing Threats", "IoT Hacking"],
    learningOutcomes: [
      "Perform comprehensive penetration tests.",
      "Identify and exploit system vulnerabilities.",
      "Understand attacker methodologies and mindsets.",
      "Use common ethical hacking tools effectively.",
      "Write professional penetration testing reports.",
      "Understand legal and ethical considerations."
    ],
    prerequisites: "Cybersecurity Fundamentals or equivalent knowledge, basic networking concepts.",
    targetAudience: "Security analysts, network administrators, IT managers, aspiring penetration testers.",
    certification: "CyberShield Certified Ethical Hacker (CCEH)",
    format: "Online, Blended (Self-paced + Live Labs)"
  },
  {
    id: "advanced-threat-hunting",
    title: "Advanced Threat Hunting",
    duration: "16 weeks",
    level: "Advanced",
    students: 420,
    rating: 4.9,
    description: "Master advanced techniques for proactively detecting and responding to sophisticated cyber threats that evade traditional security measures.",
    longDescription: "This course is designed for experienced security professionals looking to develop advanced threat hunting capabilities. Students will learn to proactively search for indicators of compromise (IOCs) and tactics, techniques, and procedures (TTPs) of advanced persistent threats (APTs). The curriculum covers threat intelligence, data analysis, behavioral analysis, and forensic techniques.",
    modules: ["Introduction to Threat Hunting", "Threat Intelligence Integration", "Hypothesis-Driven Hunting", "Network Traffic Analysis for Hunting", "Endpoint Data Analysis (EDR)", "Log Analysis & SIEM for Hunting", "Memory Forensics in Threat Hunting", "Malware Analysis for Hunters", "Hunting for APTs & Advanced Attackers", "Automating Threat Hunting Tasks", "Building a Threat Hunting Program"],
    learningOutcomes: [
      "Develop and execute threat hunting hypotheses.",
      "Utilize threat intelligence for proactive defense.",
      "Analyze network and endpoint data for malicious activity.",
      "Identify advanced attacker TTPs.",
      "Understand basic malware analysis techniques.",
      "Contribute to or build a threat hunting program."
    ],
    prerequisites: "Solid understanding of networking, operating systems, and security principles. Experience with security tools (SIEM, EDR) is beneficial.",
    targetAudience: "SOC analysts, incident responders, cybersecurity engineers, intelligence analysts.",
    certification: "CyberShield Certified Threat Hunter (CCTH)",
    format: "Online, Project-based with mentorship"
  },
  {
    id: "security-leadership",
    title: "Cybersecurity Leadership & Management",
    duration: "10 weeks",
    level: "Executive",
    students: 320,
    rating: 4.7,
    description: "Develop leadership skills for managing cybersecurity teams, strategies, and budgets effectively within an organization.",
    longDescription: "This program is tailored for current and aspiring cybersecurity leaders. It covers strategic planning, risk management, team leadership, budget management, and communication with executive stakeholders. Participants will learn how to build and mature a cybersecurity program aligned with business objectives.",
    modules: ["Cybersecurity Governance & Frameworks", "Strategic Security Planning", "Risk Management & Business Impact Analysis", "Building & Leading Security Teams", "Budgeting & Financial Management for Security", "Security Awareness & Training Program Development", "Vendor & Third-Party Risk Management", "Incident Response Management & Crisis Communication", "Communicating Security to the Board", "Cyber Law, Ethics, & Compliance Leadership"],
    learningOutcomes: [
      "Develop and implement effective cybersecurity strategies.",
      "Lead and motivate cybersecurity teams.",
      "Manage cybersecurity budgets and resources.",
      "Communicate security risks and initiatives to executives.",
      "Establish strong security governance.",
      "Oversee incident response and crisis management."
    ],
    prerequisites: "Several years of experience in cybersecurity or IT management.",
    targetAudience: "CISOs, security managers, IT directors, senior security analysts aspiring to leadership roles.",
    certification: "CyberShield Certified Cybersecurity Leader (CCCL)",
    format: "Online, Cohort-based with case studies"
  }
];

export const statsData = [
  { number: "500+", label: "Projects Completed" },
  { number: "99.9%", label: "Client Satisfaction" },
  { number: "50+", label: "Security Experts" },
  { number: "24/7", label: "Monitoring Support" }
];

export const icons = {
  Shield, Lock, Eye, Code, Database, Wifi, Server, Monitor, Smartphone, Users, BookOpen, Award, Zap, Target, Globe, CheckCircle, AlertTriangle, CalendarDays, Layers, Terminal, Shuffle, Share2, Settings2, Briefcase, UserCheck, Building, Headset
};