import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { updateFavicon } from "@/utils/faviconUtils";
import {
  Target,
  Shield,
  ArrowRight,
  Zap,
  Flag,
  Bell,
  AlertTriangle,
  CheckCircle,
  Star,
  Award,
  Globe,
  Users,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { pageVariants, sectionVariants, itemVariants } from "@/lib/animations";
import { servicesData as allServices } from "@/lib/data";

const featuredServices = allServices.slice(0, 3);

// Enterprise-grade statistics
const enterpriseStats = [
  { label: "Security Professionals Trained", value: "10,000+", icon: Users },
  { label: "Vulnerabilities Discovered", value: "50,000+", icon: Target },
  { label: "Enterprise Clients", value: "500+", icon: Globe },
  { label: "Success Rate", value: "99.9%", icon: TrendingUp },
];

// Trust indicators
const trustIndicators = [
  { name: "ISO 27001 Certified", icon: Award },
  { name: "SOC 2 Type II Compliant", icon: Shield },
  { name: "GDPR Compliant", icon: CheckCircle },
  { name: "Industry Leading", icon: Trophy },
];

const FlagIcon = ({ active }) => (
  <Flag
    className={`w-5 h-5 md:w-6 md:h-6 ${
      active ? "text-primary" : "text-muted-foreground/30"
    }`}
  />
);

const EncryptedText = ({ children, className = "", delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const finalText = children;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    const startDecryption = () => {
      setIsDecrypting(true);
      let iteration = 0;
      const maxIterations = finalText.length * 10;

      const interval = setInterval(() => {
        setDisplayText((prev) => {
          return finalText
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (char === "\n") return "\n";

              if (index < iteration / 10) {
                return finalText[index];
              }

              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");
        });

        iteration++;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(finalText);
          setIsDecrypting(false);
        }
      }, 50);
    };

    const timer = setTimeout(startDecryption, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [finalText, delay]);

  return (
    <span
      className={`${className} ${
        isDecrypting ? "text-green-400" : ""
      } font-mono`}
    >
      {displayText || finalText}
    </span>
  );
};

const CodeEditor = () => (
  <div className="enterprise-card rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-primary/20 w-full mx-auto">
    <div className="flex items-center px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/20">
      <div className="flex gap-2 md:gap-3">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 shadow-lg"></div>
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-500 shadow-lg"></div>
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 shadow-lg"></div>
      </div>
      <div className="ml-4 md:ml-6 flex-1 min-w-0">
        <div className="text-xs md:text-sm font-semibold text-foreground truncate">
          PentStark Labs - Enterprise Security Challenge
        </div>
        <div className="text-xs text-muted-foreground truncate">
          vulnerability-assessment.html
        </div>
      </div>
    </div>
    <div className="p-4 md:p-6 lg:p-8 font-mono text-xs md:text-sm text-muted-foreground/90 overflow-x-auto bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] min-h-[400px] md:min-h-[500px]">
      <pre className="language-html whitespace-pre-wrap break-words min-w-0">
        {`<div class="enterprise-challenge">
  <!-- Advanced SQL Injection Challenge -->
  <header class="secure-header" data-protection="waf">
    <h1>Enterprise Login Portal</h1>
    <div class="auth-system" data-encryption="aes-256">
      <!-- Can you bypass enterprise security? -->
      <input type="text" name="username" 
             placeholder="Enterprise Username"
             data-validation="strict" />
      <input type="password" name="password" 
             placeholder="Password"
             data-hash="bcrypt" />
      <!-- Flag: PENT{adv4nc3d_sql_1nj3ct10n} -->
    </div>
  </header>
  
  <main class="dashboard-container">
    <div class="privilege-escalation-zone">
      <!-- XSS Prevention Challenge -->
      <script>
        // Advanced DOM manipulation challenge
        const validateInput = (data) => {
          // Security bypass opportunity here...
          return sanitizeData(data);
        };
      </script>
    </div>
  </main>
</div>`}
      </pre>
    </div>

    {/* Simple Progress Section - Match target design */}
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-t border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Flags Discovered:
          </span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((flag, index) => (
            <FlagIcon key={index} active={index < 5} />
          ))}
          <span className="text-sm text-muted-foreground ml-2">5/7</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Progress:</span>
          <span className="text-sm font-semibold text-foreground">71%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
            style={{ width: "71%" }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">Level:</span>
        <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full border border-primary/30">
          Advanced
        </span>
      </div>
    </div>
  </div>
);

// RadarScan component: concentric rings + rotating sweep + nodes that light up
const RadarScan = ({
  size = 1400, // Even larger base size for more impact
  sweepWidth = 25, // Slightly reduced sweep width for better visibility
  ringCount = 5, // Increased ring count for more detail
  isMobile = false,
}) => {
  // Adjust size and opacity for mobile
  const mobileScale = isMobile ? 0.7 : 1;
  const adjustedSize = size * mobileScale;
  const [angle, setAngle] = useState(0);
  const rafRef = useRef(null);

  // Predefined issues (angle in degrees, radius as 0..1 of max)
  const nodes = useRef([
    {
      id: 1,
      angle: 30,
      r: 0.6,
      label: "AI Prompt Leak",
      color: "#FF0000",
      danger: true,
    },
    {
      id: 2,
      angle: 75,
      r: 0.4,
      label: "Priv. Escalation",
      color: "#FF0000",
      danger: true,
    },
    {
      id: 3,
      angle: 120,
      r: 0.75,
      label: "XSS/XSRF",
      color: "#FF0000",
      danger: true,
    },
    {
      id: 4,
      angle: 180,
      r: 0.5,
      label: "Auth Bypass",
      color: "#FF0000",
      danger: true,
    },
    {
      id: 5,
      angle: 225,
      r: 0.8,
      label: "Data Exfiltration",
      color: "#FF0000",
      danger: true,
    },
    {
      id: 6,
      angle: 270,
      r: 0.35,
      label: "Prompt Injection",
      color: "#FF0000",
      danger: true,
    },
    {
      id: 7,
      angle: 315,
      r: 0.65,
      label: "Supply Chain",
      color: "#FF0000",
      danger: true,
    },
  ]).current;

  // Track the currently active node for favicon changes
  const [activeNode, setActiveNode] = useState(null);

  // Update favicon when active node changes
  useEffect(() => {
    updateFavicon(activeNode?.label);
  }, [activeNode]);

  // Update active node based on radar sweep position
  useEffect(() => {
    const checkActiveNodes = () => {
      const newActiveNode = nodes.find((node) => isActive(node.angle));
      if (newActiveNode?.id !== activeNode?.id) {
        setActiveNode(newActiveNode || null);
      }
    };

    let lastTs = 0;
    const speedDegPerSec = 40; // rotation speed

    const loop = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      setAngle((prev) => (prev + speedDegPerSec * dt) % 360);
      checkActiveNodes();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      // Reset favicon when component unmounts
      updateFavicon(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cx = adjustedSize / 2;
  const cy = adjustedSize / 2;
  const maxR = adjustedSize * 0.45; // Slightly increase max radius for bigger radar

  // Theme colors with better visibility
  const primaryColor = "hsl(280, 100%, 70%)"; // Brighter purple
  const secondaryColor = "hsl(330, 100%, 65%)"; // Brighter pink
  const ringColor = "hsla(280, 100%, 70%, 0.3)"; // More visible rings
  const gridColor = "hsla(280, 100%, 70%, 0.15)"; // More visible grid
  const sweepColor = "hsla(280, 100%, 90%, 0.4)"; // More visible sweep

  const toXY = (deg, r) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  const sweepPath = () => {
    const a1 = angle;
    const a2 = (angle + sweepWidth) % 360;
    const p1 = toXY(a1, maxR);
    const p2 = toXY(a2, maxR);
    const largeArc = sweepWidth > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${p1[0]} ${p1[1]} A ${maxR} ${maxR} 0 ${largeArc} 1 ${p2[0]} ${p2[1]} Z`;
  };

  const isActive = (nodeAngle) => {
    const a = ((nodeAngle - angle + 540) % 360) - 180; // [-180,180]
    return Math.abs(a) <= sweepWidth / 2 + 4; // small buffer
  };

  const rings = Array.from(
    { length: ringCount },
    (_, i) => ((i + 1) / ringCount) * maxR
  );

  return (
    <div
      className="relative w-full h-full flex items-center justify-center p-4"
      style={{
        minHeight: isMobile ? "260px" : "400px",
        width: "100%",
        position: "relative",
        zIndex: 1,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
        className="block m-auto"
        style={{
          minWidth: isMobile ? "220px" : "300px",
          minHeight: isMobile ? "220px" : "300px",
          maxWidth: "min(100vw, 100%)",
          maxHeight: "min(100vh, 100%)",
          filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))",
          opacity: 1,
          zIndex: 10,
        }}
        aria-hidden
      >
        <defs>
          {/* Glow effects */}
          <radialGradient
            id="radarGlow"
            cx="50%"
            cy="50%"
            r="50%"
            fx="30%"
            fy="30%"
          >
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
            <stop offset="60%" stopColor={secondaryColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </radialGradient>

          {/* Sweep gradient */}
          <linearGradient
            id="sweepGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer glow */}
        <circle cx={cx} cy={cy} r={maxR} fill="url(#radarGlow)" opacity="0.9" />

        {/* Grid lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + maxR * Math.cos(((a - 90) * Math.PI) / 180)}
            y2={cy + maxR * Math.sin(((a - 90) * Math.PI) / 180)}
            stroke={gridColor}
            strokeWidth="1"
          />
        ))}

        {/* Rings */}
        {rings.map((r, idx) => (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={ringColor}
            strokeWidth={1}
            strokeDasharray={idx === rings.length - 1 ? "0" : "5,5"}
          />
        ))}

        {/* Sweep area - more subtle */}
        <path
          d={sweepPath()}
          fill="url(#sweepGradient)"
          fillOpacity="0.1"
          className="pointer-events-none"
          style={{
            mixBlendMode: "screen",
          }}
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="4" fill={primaryColor} />

        {/* Nodes */}
        {nodes.map((node) => {
          const active = isActive(node.angle);
          const [x, y] = toXY(node.angle, node.r * maxR);
          const nodeSize = active ? 8 : 4;
          const nodeColor = active
            ? node.color
            : `hsla(280, 100%, 60%, ${active ? "1" : "0.5"})`;
          const pulseSize = active ? nodeSize * 3 : nodeSize * 1.5;
          const glowColor = active ? secondaryColor : primaryColor;

          return (
            <g key={node.id} className="transition-all duration-300">
              {/* Pulsing glow */}
              {active && (
                <circle
                  cx={x}
                  cy={y}
                  r={pulseSize}
                  fill={glowColor}
                  fillOpacity="0.3"
                  className="pointer-events-none"
                >
                  <animate
                    attributeName="r"
                    values={`${nodeSize * 1.5};${nodeSize * 3};${
                      nodeSize * 1.5
                    }`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0.1;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Node */}
              <circle
                cx={x}
                cy={y}
                r={nodeSize}
                fill={nodeColor}
                stroke="#0f172a"
                strokeWidth="2"
                className="pointer-events-none transition-all duration-300"
                style={{
                  filter: active
                    ? `drop-shadow(0 0 12px ${glowColor})`
                    : `drop-shadow(0 0 4px ${primaryColor}40)`,
                }}
              />

              {/* Label */}
              {active && (
                <g transform={`translate(${x + 12}, ${y - 10})`}>
                  <text
                    x="0"
                    y="16"
                    fill="white"
                    fontSize="12"
                    fontWeight="500"
                    className="font-sans"
                  >
                    {node.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Sweep line */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + maxR * Math.cos(((angle - 90) * Math.PI) / 180)}
          y2={cy + maxR * Math.sin(((angle - 90) * Math.PI) / 180)}
          stroke={sweepColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="pointer-events-none"
        />
      </svg>
    </div>
  );
};

// New Services Showcase Section (replaces "Professional Security Services")
const ServicesShowcase = () => {
  const Bullet = ({ children }) => (
    <li className="flex items-start gap-2 text-sm md:text-base text-foreground/90">
      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
      <span className="font-mono text-muted-foreground">{children}</span>
    </li>
  );

  const KnowMore = () => (
    <Link to="/services">
      <Button
        size="sm"
        className="font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-5 md:px-6"
      >
        Know more
      </Button>
    </Link>
  );

  return (
    <section className="enterprise-section py-12 sm:py-16 md:py-20 lg:py-28 xl:py-36 relative z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <motion.div
          variants={sectionVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24"
        >
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-xs sm:text-sm font-semibold border border-primary/20 backdrop-blur-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Services
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-foreground font-orbitron leading-tight px-2"
          >
            Services Designed to{" "}
            <span className="enterprise-text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Fortify Your Security
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed mt-3 sm:mt-4 md:mt-6 px-2"
          >
            Comprehensive cybersecurity solutions crafted by elite hackers and
            security experts
          </motion.p>
        </motion.div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 xl:space-y-20">
          {/* Pentest as a Service */}
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="enterprise-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-primary/20"
          >
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 md:gap-10">
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 font-orbitron">
                  Pentest as a Service
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-5 font-mono">
                  Enhance your cybersecurity defenses with hacker-focused
                  Penetration Testing, offering comprehensive manual security
                  assessments to uncover critical vulnerabilities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
                  <ul className="space-y-2">
                    <Bullet>Web Application Penetration Testing</Bullet>
                    <Bullet>API Penetration Testing</Bullet>
                    <Bullet>Network Penetration Testing</Bullet>
                  </ul>
                  <ul className="space-y-2">
                    <Bullet>Mobile Application Penetration Testing</Bullet>
                    <Bullet>Thick Client App Pen-Test</Bullet>
                    <Bullet>IoT Device Penetration Testing</Bullet>
                  </ul>
                </div>
                <KnowMore />
              </div>
              <div className="order-first lg:order-none">
                <div className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-square min-h-[240px] sm:min-h-[320px] md:min-h-[384px]">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl opacity-30 rounded-2xl"></div>
                  <div className="relative h-full w-full rounded-xl overflow-hidden border border-primary/20 bg-black/20">
                    <img
                      src="/pentestAsService.png"
                      alt="Pentest as a Service"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-black/15 to-transparent"></div>
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Red Teaming as a Service */}
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="enterprise-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-primary/20"
          >
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 md:gap-10">
              <div className="order-first">
                <div className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-square min-h-[240px] sm:min-h-[320px] md:min-h-[384px]">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl opacity-30 rounded-2xl"></div>
                  <div className="relative h-full w-full rounded-xl overflow-hidden border border-primary/20 bg-black/20">
                    <img
                      src="/offense.png"
                      alt="Red Teaming"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/45 via-black/20 to-transparent"></div>
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 font-orbitron">
                  Red Teaming as a Service
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-5 font-mono">
                  Evaluate the efficacy of your security team's readiness
                  posture, detection capabilities, and response measures against
                  tenacious hacker attacks, focusing on identifying and
                  mitigating vulnerabilities across your applications, network
                  infrastructure, and other susceptible pathways to ensure
                  robust protection and minimal operational disruption.
                </p>
                <ul className="space-y-2 mb-6">
                  <Bullet>Internal Red Teaming</Bullet>
                  <Bullet>External Red Teaming</Bullet>
                </ul>
                <KnowMore />
              </div>
            </div>
          </motion.div>

          {/* Product Security as a Service */}
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="enterprise-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-primary/20"
          >
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 md:gap-10">
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 font-orbitron">
                  Product Security as a Service
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-5 font-mono">
                  Enhance your cybersecurity defenses with hacker-focused
                  penetration testing, offering comprehensive manual security
                  assessments to uncover critical vulnerabilities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
                  <ul className="space-y-2">
                    <Bullet>Code Review</Bullet>
                    <Bullet>Vulnerability Management</Bullet>
                    <Bullet>Iterative Penetration Testing</Bullet>
                  </ul>
                  <ul className="space-y-2">
                    <Bullet>DevSecOps</Bullet>
                    <Bullet>Cloud Security Assessment</Bullet>
                  </ul>
                </div>
                <KnowMore />
              </div>
              <div className="order-first lg:order-none">
                <div className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-square min-h-[240px] sm:min-h-[320px] md:min-h-[384px]">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl opacity-30 rounded-2xl"></div>
                  <div className="relative h-full w-full rounded-xl overflow-hidden border border-primary/20 bg-black/20">
                    <img
                      src="/ProductSecService.png"
                      alt="Product Security"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-black/15 to-transparent"></div>
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Responsive viewport width hook
const useViewportWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
};

const HomePage = () => {
  const width = useViewportWidth();
  const isMobile = width < 640; // < sm
  const isTablet = width >= 640 && width < 1024; // sm..lg
  const radarSize = isMobile ? 320 : isTablet ? 520 : 800;

  // Auto-scroll to Hero Section on page load
  useEffect(() => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white">
        {/* Hero Section */}
        <section id="hero" className="py-16 md:py-24 lg:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center lg:hidden">
            {/* Mobile: Centered Hero */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-orbitron leading-tight mb-6"
            >
              <span className="block text-white">Continuous</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                Pentest & Red
              </span>
              <span className="block">
                <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Teaming
                </span>{" "}
                <span className="text-white">in</span>
              </span>
              <span className="block text-white">BugBounty Style</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-8 max-w-3xl mx-auto px-4"
            >
              Get your security testing done by top hackers of Fortune 1000 Bug
              bounty programs. No false positives or theoretical vulnerabilities
              — just exploitable and real impactful bugs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6 px-4"
            >
              <Link to="/contact">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-pink-500 hover:to-fuchsia-500 text-white font-semibold py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
                >
                  Secure Now →
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="px-4"
            >
              <a
                href="https://calendly.com/pentstark/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 font-semibold py-4 text-lg rounded-full backdrop-blur-sm"
                >
                  Schedule A Call
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Desktop: Two-column layout with radar */}
          <div className="hidden lg:flex container mx-auto px-4 sm:px-6 lg:px-8 min-h-[75vh] sm:min-h-[80vh] lg:min-h-[85vh] items-center justify-between">
            {/* Left: Hero content */}
            <div className="w-1/2">
              <h1 className="font-orbitron font-bold leading-tight mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl tracking-tight">
                <span className="block text-white">Continuous</span>
                <span className="block bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Pentest & Red
                </span>
                <span className="block">
                  <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Teaming
                  </span>{" "}
                  <span className="text-white">in</span>
                </span>
                <span className="block text-white">BugBounty Style</span>
              </h1>
              <p className="font-mono text-gray-400/90 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed tracking-wide mb-8 max-w-3xl">
                Get your security testing done by top hackers of Fortune 1000
                Bug bounty programs. No false positives or theoretical
                vulnerabilities — just exploitable and real impactful bugs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="rounded-[18px] px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg hover:from-pink-500 hover:to-fuchsia-500"
                  >
                    Secure Now ▸
                  </Button>
                </Link>
                <a
                  href="https://calendly.com/pentstark/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-[18px] px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base md:text-lg font-semibold border-white/20 text-white bg-transparent hover:bg-white/10"
                  >
                    Schedule A Call
                  </Button>
                </a>
              </div>
            </div>

            {/* Right: Radar */}
            <div className="w-1/2 flex justify-center">
              <RadarScan size={radarSize} sweepWidth={25} isMobile={isMobile} />
            </div>
          </div>
        </section>

        {/* Client Logo Strip */}
        <section className="py-8 md:py-12 bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="text-center mb-6">
              <span className="block text-xs font-bold text-white/70 tracking-widest mb-1">
                OUR CLIENTS
              </span>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 font-orbitron">
                We work with the top industry leaders in the world
              </h2>
            </div>
            <div className="relative w-full overflow-hidden">
              {/* Fades for premium effect */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-full w-8 z-10"
                style={{
                  background:
                    "linear-gradient(to right, rgba(15,17,23,0.7) 60%, transparent)",
                }}
              ></div>
              <div
                className="pointer-events-none absolute right-0 top-0 h-full w-8 z-10"
                style={{
                  background:
                    "linear-gradient(to left, rgba(15,17,23,0.7) 60%, transparent)",
                }}
              ></div>
              <div
                className="client-logo-marquee flex items-center gap-x-12 py-2 animate-client-marquee"
                style={{ willChange: "transform" }}
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <img
                      src="https://cdn.prod.website-files.com/60b40102be857975f6bfba32/66b4d6e1473596ca104a7c43_DIGITAL%20RPi%20LOGO%20REVERSE%20LANDSCAPE.svg"
                      alt="Rasberry Pi"
                      className="h-10 md:h-12 max-h-12 object-contain"
                    />
                    <img
                      src="https://assets.pentstark.com/aws.png"
                      alt="AWS"
                      className="h-20 md:h-32 max-h-32 object-contain"
                    />
                    <img
                      src="https://cdn.prod.website-files.com/60b40102be857975f6bfba32/66b278d5a6535ad15541fd33_binaryninja.png"
                      alt="Binary Ninja"
                      className="h-10 md:h-12 max-h-12 object-contain"
                    />
                  </React.Fragment>
                ))}
              </div>
              <style>{`
                .client-logo-marquee {
                  animation: client-marquee 32s linear infinite;
                }
                @keyframes client-marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .client-logo-marquee::-webkit-scrollbar { display: none; }
                .client-logo-marquee { scrollbar-width: none; -ms-overflow-style: none; }
              `}</style>
            </div>
          </div>
        </section>

        {/* Our Accreditations */}
        <section className="py-8 md:py-12 bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="text-center mb-6">
              <span className="block text-xs font-bold text-white/70 tracking-widest mb-1"></span>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 font-orbitron">
                Our Accreditations
              </h2>
            </div>
            <div className="relative w-full overflow-hidden">
              {/* Fades for premium effect */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-full w-8 z-10"
                style={{
                  background:
                    "linear-gradient(to right, rgba(15,17,23,0.7) 60%, transparent)",
                }}
              ></div>
              <div
                className="pointer-events-none absolute right-0 top-0 h-full w-8 z-10"
                style={{
                  background:
                    "linear-gradient(to left, rgba(15,17,23,0.7) 60%, transparent)",
                }}
              ></div>
              <div
                className="client-logo-marquee flex items-center gap-x-12 py-2 animate-client-marquee"
                style={{
                  willChange: "transform",
                  animationDirection: "reverse",
                }}
              >
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <img
                      src="https://assets.pentstark.com/az500.png"
                      alt="ISO 27001 Certified"
                      className="h-20 md:h-28 max-h-28 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />

                    <img
                      src="https://assets.pentstark.com/oscp.png"
                      alt="Offensive Security Certified Professional"
                      className="h-20 md:h-28 max-h-28 max-w-28 object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="https://assets.pentstark.com/oscp+.png"
                      alt="Offensive Security Certified Professional Plus"
                      className="h-20 md:h-28 max-h-28 max-w-28 object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="https://assets.pentstark.com/ejpt-certification.svg"
                      alt="eLearnSecurity Junior Penetration Tester"
                      className="h-20 md:h-28 max-h-28 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="https://assets.pentstark.com/ceh.png"
                      alt="Certified Ethical Hacker"
                      className="h-20 md:h-28 max-h-28 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="https://assets.pentstark.com/cnsp.png"
                      alt="Certified-Network-Security-Practitioner"
                      className="h-20 md:h-28 max-h-28 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="https://assets.pentstark.com/CNPen-badge.png"
                      alt="Offensive Security Certified Professional"
                      className="h-20 md:h-28 max-h-28 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="https://assets.pentstark.com/cbp.png"
                      alt="Certified Blockchain Practitioner"
                      className="h-20 md:h-28 max-h-28 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </React.Fragment>
                ))}
              </div>
              <style>{`
                .client-logo-marquee {
                  animation: client-marquee 32s linear infinite;
                }
                @keyframes client-marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .client-logo-marquee::-webkit-scrollbar { display: none; }
                .client-logo-marquee { scrollbar-width: none; -ms-overflow-style: none; }
              `}</style>
            </div>
          </div>
        </section>

        <ServicesShowcase />

        {/* Enterprise Security Challenges Section */}
        <section className="enterprise-section py-20 md:py-28 relative z-10">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-16 md:mb-20"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-block px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-semibold border border-red-500/20">
                  INDUSTRY CHALLENGES
                </span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-orbitron mb-6 leading-tight"
              >
                Traditional Security Approaches
                <br />
                <span className="enterprise-text-gradient">
                  Are Failing Organizations
                </span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed"
              >
                Enterprise security teams are overwhelmed by reactive approaches
                that fail to address the root causes of vulnerabilities.
              </motion.p>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {/* Detection Challenge */}
              <motion.div
                variants={itemVariants}
                className="enterprise-card rounded-3xl p-8 lg:p-10 flex flex-col h-full text-center group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                <div className="mb-8">
                  <div className="inline-flex items-center bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                    <span className="text-red-400 font-semibold text-sm">
                      REACTIVE DETECTION
                    </span>
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-6 font-orbitron leading-tight">
                  Late Detection Creates Massive Security Debt
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed text-base lg:text-lg mb-8 flex-grow">
                  Organizations waste millions on reactive security measures
                  that only identify threats after damage is done, creating
                  overwhelming backlogs and inefficient development cycles.
                </p>
                <div className="enterprise-card bg-gradient-to-br from-red-500/10 to-red-700/10 rounded-2xl p-6 border border-red-500/20">
                  <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <p className="text-red-400 font-semibold">
                    After-the-Fact Security
                  </p>
                  <p className="text-red-400/70 text-sm mt-2">
                    Average cost: $4.45M per breach
                  </p>
                </div>
              </motion.div>

              {/* Alert Fatigue Challenge */}
              <motion.div
                variants={itemVariants}
                className="enterprise-card rounded-3xl p-8 lg:p-10 flex flex-col h-full text-center group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-600"></div>
                <div className="mb-8">
                  <div className="inline-flex items-center bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                    <span className="text-yellow-400 font-semibold text-sm">
                      ALERT FATIGUE
                    </span>
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-6 font-orbitron leading-tight">
                  False Positives Lead to Security Desensitization
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed text-base lg:text-lg mb-8 flex-grow">
                  Security teams receive thousands of alerts daily, with 95%
                  being false positives. This overwhelming noise causes teams to
                  ignore critical threats and deprioritize security.
                </p>
                <div className="enterprise-card bg-gradient-to-br from-yellow-500/10 to-orange-700/10 rounded-2xl p-6 border border-yellow-500/20">
                  <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <p className="text-yellow-400 font-semibold">
                    Workflow Disruption
                  </p>
                  <p className="text-yellow-400/70 text-sm mt-2">
                    95% false positive rate
                  </p>
                </div>
              </motion.div>

              {/* Knowledge Gap Challenge */}
              <motion.div
                variants={itemVariants}
                className="enterprise-card rounded-3xl p-8 lg:p-10 flex flex-col h-full text-center group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-red-600"></div>
                <div className="mb-8">
                  <div className="inline-flex items-center bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                    <span className="text-purple-400 font-semibold text-sm">
                      KNOWLEDGE GAP
                    </span>
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-6 font-orbitron leading-tight">
                  Lack of Security Expertise Perpetuates Vulnerabilities
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed text-base lg:text-lg mb-8 flex-grow">
                  Development teams lack practical security knowledge, leading
                  to repeated vulnerabilities and a never-ending cycle of
                  patching without addressing root causes.
                </p>
                <div className="enterprise-card bg-gradient-to-br from-purple-500/10 to-red-700/10 rounded-2xl p-6 border border-purple-500/20">
                  <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-400 font-semibold">
                    Skills Shortage
                  </p>
                  <p className="text-purple-400/70 text-sm mt-2">
                    3.5M unfilled security jobs
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Enterprise Solution CTA */}
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mt-20 md:mt-24 text-center"
            >
              <div className="relative max-w-6xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl opacity-50 rounded-3xl"></div>
                <div className="relative enterprise-card p-12 lg:p-16 rounded-3xl border-2 border-primary/30">
                  <motion.h3
                    variants={itemVariants}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-orbitron mb-6"
                  >
                    <span className="enterprise-text-gradient">PentStark</span>{" "}
                    Transforms Enterprise Security
                  </motion.h3>
                  <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light mb-10 max-w-4xl mx-auto leading-relaxed"
                  >
                    Through proactive security training and comprehensive
                    penetration testing, we eliminate vulnerabilities before
                    they become costly breaches. Our enterprise solutions build
                    security expertise across your entire organization.
                  </motion.p>
                  <motion.div variants={itemVariants}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                      <a
                        href="https://calendly.com/pentstark/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative group w-full sm:w-auto">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary blur-xl opacity-60 rounded-2xl group-hover:blur-2xl transition-all duration-300"></div>
                          <Button
                            variant="enterprise"
                            size="xl"
                            className="relative w-full sm:min-w-[280px] font-bold bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-primary/30 hover:border-primary/60"
                          >
                            <span>Schedule Enterprise Demo</span>
                            <Target className="ml-3 h-6 w-6" />
                          </Button>
                        </div>
                      </a>
                      <Link to="/labs">
                        <div className="relative group w-full sm:w-auto">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 blur-xl opacity-40 rounded-2xl group-hover:blur-2xl group-hover:opacity-60 transition-all duration-300"></div>
                          <Button
                            variant="outline"
                            size="xl"
                            className="relative w-full sm:min-w-[280px] font-bold border-2 border-primary/50 hover:border-primary bg-gradient-to-r from-transparent via-primary/10 to-transparent hover:from-primary/20 hover:via-secondary/20 hover:to-primary/20 text-primary hover:text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                          >
                            <span>Try Training Platform</span>
                            <ArrowRight className="ml-3 h-6 w-6" />
                          </Button>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enterprise Contact Section */}
        <section className="enterprise-section py-20 md:py-28 relative z-10">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12 md:space-y-16"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                  ENTERPRISE PARTNERSHIP
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-orbitron leading-tight">
                  Ready to Transform Your{" "}
                  <span className="enterprise-text-gradient">
                    Security Posture
                  </span>
                  ?
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-4xl mx-auto">
                  Join industry leaders who trust PentStark to proactively
                  identify risks, strengthen security postures, and build
                  world-class security teams. Our enterprise solutions are
                  designed for scale.
                </p>
              </motion.div>

              {/* Enterprise Benefits */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                <div className="enterprise-card p-6 rounded-2xl text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Enterprise Security
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    SOC 2 Type II compliant platform
                  </p>
                </div>
                <div className="enterprise-card p-6 rounded-2xl text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Dedicated Support
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    24/7 expert technical support
                  </p>
                </div>
                <div className="enterprise-card p-6 rounded-2xl text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Proven Results
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    99.9% customer satisfaction
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-8">
                <div className="relative inline-block w-full max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl opacity-50 rounded-2xl"></div>
                  <a
                    href="https://calendly.com/pentstark/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center w-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 enterprise-gradient text-white px-8 md:px-16 py-6 md:py-8 text-lg md:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                  >
                    <span className="block w-full text-center">
                      Schedule Enterprise Demo
                    </span>
                    <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enterprise Labs Section */}
        <section className="enterprise-section relative flex items-center py-16 md:py-20 lg:py-28 overflow-hidden z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
              <div className="space-y-6 md:space-y-8 lg:space-y-10 order-2 lg:order-1">
                <motion.div
                  variants={sectionVariants}
                  initial="initial"
                  animate="animate"
                  className="space-y-6 md:space-y-8"
                >
                  <motion.div
                    variants={itemVariants}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="flex justify-center lg:justify-start">
                      <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-semibold border border-primary/20">
                        HANDS-ON TRAINING
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground font-orbitron text-center lg:text-left leading-tight">
                      Master Security Through{" "}
                      <span className="enterprise-text-gradient">
                        Practical Experience
                      </span>
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-light leading-relaxed text-center lg:text-left">
                      Our enterprise training platform features real-world
                      scenarios and live environments. Build expertise through
                      hands-on penetration testing challenges designed by
                      industry experts.
                    </p>
                  </motion.div>

                  {/* Training Features */}
                  <motion.div
                    variants={itemVariants}
                    className="space-y-3 md:space-y-4"
                  >
                    {/* Point 1 */}
                    <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm lg:bg-gradient-to-r lg:from-white/5 lg:to-white/20 lg:p-4 transition-transform duration-300 hover:scale-105">
                      <span className="text-foreground font-medium text-sm md:text-base text-center">
                        Real-world vulnerability scenarios
                      </span>
                    </div>

                    {/* Point 2 */}
                    <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm lg:bg-gradient-to-r lg:from-white/5 lg:to-white/20 lg:p-4 transition-transform duration-300 hover:scale-105">
                      <span className="text-foreground font-medium text-sm md:text-base text-center">
                        Interactive learning environment
                      </span>
                    </div>

                    {/* Point 3 */}
                    <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm lg:bg-gradient-to-r lg:from-white/5 lg:to-white/20 lg:p-4 transition-transform duration-300 hover:scale-105">
                      <span className="text-foreground font-medium text-sm md:text-base text-center">
                        Industry-recognized certifications
                      </span>
                    </div>

                    {/* Point 4 */}
                    <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm lg:bg-gradient-to-r lg:from-white/5 lg:to-white/20 lg:p-4 transition-transform duration-300 hover:scale-105">
                      <span className="text-foreground font-medium text-sm md:text-base text-center">
                        Progress tracking and analytics
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="pt-4 md:pt-6 text-center lg:text-left"
                  >
                    <Link to="/labs">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto min-w-[240px] md:min-w-[280px] font-semibold auth-button-primary"
                      >
                        <span>Access Training Platform</span>
                        <Target className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                className="relative order-1 lg:order-2"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl rounded-2xl md:rounded-3xl"></div>
                  <div className="relative">
                    <CodeEditor />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enterprise Subscription Section */}
        <section className="enterprise-section py-16 md:py-20 lg:py-28 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8 md:space-y-12 lg:space-y-16"
            >
              <motion.div
                variants={itemVariants}
                className="space-y-4 md:space-y-6"
              >
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-semibold border border-primary/20">
                  ENTERPRISE EARLY ACCESS
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground font-orbitron leading-tight">
                  Join the Future of{" "}
                  <span className="enterprise-text-gradient">
                    Security Training
                  </span>
                </h2>
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-light leading-relaxed max-w-4xl mx-auto px-4">
                  Be among the first to experience our revolutionary enterprise
                  security training platform. Limited early access pricing for
                  forward-thinking organizations.
                </p>
              </motion.div>

              {/* Enterprise Features */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
              >
                <div className="enterprise-card p-4 md:p-6 rounded-xl md:rounded-2xl">
                  <Target className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2">
                    Advanced Labs
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    100+ enterprise scenarios
                  </p>
                </div>
                <div className="enterprise-card p-4 md:p-6 rounded-xl md:rounded-2xl">
                  <Users className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2">
                    Team Management
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Centralized admin dashboard
                  </p>
                </div>
                <div className="enterprise-card p-4 md:p-6 rounded-xl md:rounded-2xl">
                  <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2">
                    Analytics
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Detailed progress tracking
                  </p>
                </div>
                <div className="enterprise-card p-4 md:p-6 rounded-xl md:rounded-2xl">
                  <Shield className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2">
                    Compliance
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    SOC 2 & ISO 27001
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-6 md:pt-8">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-2xl md:blur-3xl opacity-30 rounded-xl md:rounded-2xl"></div>
                  <div className="relative space-y-6 md:space-y-8">
                    <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-orbitron flex-wrap">
                      <span className="text-muted-foreground line-through">
                        $99
                      </span>
                      <span className="enterprise-text-gradient">
                        $49/month
                      </span>
                      <span className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-light"></span>
                    </div>
                    <Button
                      size="lg"
                      className="min-w-[280px] md:min-w-[400px] text-base md:text-lg lg:text-xl font-semibold auth-button-primary px-8 md:px-12 py-4 md:py-6"
                    >
                      <span className="block w-full text-center">
                        🚀 Coming Soon..
                      </span>
                      <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
                    </Button>
                    <p className="text-xs md:text-sm lg:text-base text-muted-foreground font-light px-4">
                      *Early access pricing valid for first 100 enterprise
                      customers. No setup fees.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      <div className="relative w-full overflow-hidden">
        <canvas id="hero-canvas" className="absolute inset-0 w-full h-full" />

        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#gradient)" />
        </svg>

        <main className="flex-grow pt-24 sm:pt-32 md:pt-40 lg:pt-44 xl:pt-48 relative z-10">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-10xl mx-auto bg-white/5 rounded-2xl px-4 sm:px-8 py-12 sm:py-20 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap gap-4">
                <h2 className="text-white font-normal text-[1.5rem] sm:text-[2em] text-center sm:text-left">
                  Hourly metrics of{" "}
                  <span className="enterprise-text-gradient">PentStark</span>
                </h2>
                <a
                  href="#explore-section"
                  onClick={(e) => {
                    e.preventDefault(); // prevent default jump
                    document
                      .querySelector("#explore-section")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-white text-white rounded-md text-sm font-semibold hover:bg-white hover:text-black transition"
                >
                  <span>Explore Platform</span>
                  <span className="text-white-400">»</span>
                </a>
              </div>

              <hr className="border-t border-white/10 my-6 sm:my-8" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center font-orbitron">
                <div>
                  <p className="text-white font-medium text-[3rem] sm:text-[5em]">
                    100+
                  </p>
                  <p className="text-muted-foreground text-sm sm:text-base font-normal">
                    Protected Cloud Accounts
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium text-[3rem] sm:text-[5em]">
                    10.000+
                  </p>
                  <p className="text-muted-foreground text-sm sm:text-base font-normal">
                    Inspected Network Assets
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium text-[3rem] sm:text-[5em]">
                    100+
                  </p>
                  <p className="text-muted-foreground text-sm sm:text-base font-normal">
                    Processed GBs of Data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
