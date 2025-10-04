import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

// Simple RadarScan component
const RadarScan = ({ size = 600, sweepWidth = 25 }) => {
  const [angle, setAngle] = useState(0);
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.4;
  const ringCount = 4;
  
  // Animation loop
  useEffect(() => {
    let animationId;
    const animate = () => {
      setAngle(prev => (prev + 0.5) % 360);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Generate rings
  const rings = Array.from({ length: ringCount }, (_, i) => (i + 1) * (maxR / ringCount));
  
  // Generate grid lines
  const lines = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
        {/* Background */}
        <rect width="100%" height="100%" fill="#0a0a0f" />
        
        {/* Grid */}
        <g stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1">
          {rings.map((r, i) => (
            <circle key={`ring-${i}`} cx={cx} cy={cy} r={r} fill="none" />
          ))}
          {lines.map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={`line-${i}`}
                x1={cx}
                y1={cy}
                x2={cx + maxR * Math.cos(rad)}
                y2={cy + maxR * Math.sin(rad)}
              />
            );
          })}
        </g>
        
        {/* Sweep */}
        <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
          <defs>
            <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
            </linearGradient>
          </defs>
          <path
            d={`M ${cx} ${cy} L ${cx + maxR} ${cy} A ${maxR} ${maxR} 0 0 1 ${cx + maxR * Math.cos(sweepWidth * Math.PI / 180)} ${cy + maxR * Math.sin(sweepWidth * Math.PI / 180)} Z`}
            fill="url(#sweepGradient)"
          />
        </g>
        
        {/* Center dot */}
        <circle cx={cx} cy={cy} r="4" fill="#6366f1" />
      </svg>
    </div>
  );
};

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left: Content */}
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Continuous Pentest & Red Teaming
                <span className="block text-blue-400 mt-2">in BugBounty Style</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                Get your security testing done by top hackers of Fortune 1000 Bug bounty programs.
                No false positives or theoretical vulnerabilities — just exploitable and real impactful bugs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Secure Now
                  </Button>
                </Link>
                <a href="https://calendly.com/pentstark/30min" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                    Schedule A Call
                  </Button>
                </a>
              </div>
            </div>

            {/* Right: Radar */}
            <div className="lg:w-1/2 flex justify-center items-center">
              <div className="w-full max-w-md">
                <RadarScan size={isMobile ? 400 : 600} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Add service cards here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
