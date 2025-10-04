import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { pageVariants, sectionVariants, itemVariants } from '@/lib/animations';
import GlobeVisualization from '@/components/ui/GlobeVisualization';

const locations = [
	{
		name: 'San Francisco • Palo Alto',
		lat: 37.7749,
		lng: -122.4194,
		display: true
	},
	{
		name: 'London',
		lat: 51.5074,
		lng: -0.1278,
		display: true
	},
	{
		name: 'Bangalore',
		lat: 12.9716,
		lng: 77.5946,
		display: true
	}
];

const benefits = [
	{ 
		title: 'Competitive compensation', 
		description: 'Competitive cash and equity-based compensation packages to attract top talent.',
		icon: '💰',
		color: 'from-green-500/20 to-emerald-500/20 border-green-500/30'
	},
	{ 
		title: 'Health and wellness', 
		description: 'Comprehensive health insurance including medical, dental, vision, and disability coverage.',
		icon: '🏥',
		color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
	},
	{ 
		title: 'Life and family', 
		description: 'Life and AD&D insurance and fertility benefits to ensure our team\'s well-being and peace of mind.',
		icon: '👨‍👩‍👧‍👦',
		color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
	},
	{ 
		title: 'Flexible vacation', 
		description: 'We work hard but avoid burn out. Take time off when you need it.',
		icon: '🏖️',
		color: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30'
	},
	{ 
		title: 'Visa sponsorship', 
		description: 'We support international talent with visa sponsorship to join our team.',
		icon: '🌍',
		color: 'from-teal-500/20 to-green-500/20 border-teal-500/30'
	},
	{ 
		title: '401(k) plan', 
		description: 'Retirement savings plan to secure your financial future.',
		icon: '📊',
		color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30'
	}
];

const interviewSteps = [
	{ step: 1, title: 'Initial Application', description: 'Submit your resume and tell us why you want to join our mission to advance cybersecurity.' },
	{ step: 2, title: 'Capture the flag Challenge', description: 'A practical assessment built to reflect the complex security scenarios you\'ll encounter in the field.' },
	{ step: 3, title: 'Technical Interview', description: 'Deep dive into your technical expertise with our senior engineers and security experts.' },
	{ step: 4, title: 'Final Discussion', description: 'Meet with the team leads to discuss culture fit and answer any remaining questions.' }
];

const openPositions = [
	{
		title: 'Penetration Tester',
		location: 'Remote',
		type: 'Full-Time',
		posted: 'Perform comprehensive security assessments to identify vulnerabilities before attackers do.'
	},
	{
		title: 'SOC Analyst (Security Monitoring)',
		location: 'Remote',
		type: 'Full-Time',
		posted: 'Monitor systems 24/7 for threats and respond to incidents to keep infrastructure secure.'
	},
	{
		title: 'Compliance & Audit Specialist',
		location: 'Remote',
		type: 'Full-Time',
		posted: 'Ensure organizational compliance with industry standards and regulatory frameworks.'
	},
	{
		title: 'DevSecOps Engineer',
		location: 'Remote',
		type: 'Full-Time',
		posted: 'Integrate security practices into the CI/CD pipeline and software development lifecycle.'
	},
	{
		title: 'API Security Engineer',
		location: 'Remote',
		type: 'Full-Time',
		posted: 'Conduct security testing for APIs to prevent injection, broken authentication, and data breaches.'
	},
	{
		title: 'Web Application Security Engineer',
		location: 'Remote',
		type: 'Full-Time',
		posted: 'Identify and remediate vulnerabilities in web applications using industry best practices.'
	}
];


const CareersPage = () => {
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
								<span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-green-500/10 text-green-400 rounded-full text-xs md:text-sm font-semibold border border-green-500/20">
									JOIN OUR MISSION
								</span>
							</motion.div>
							<motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground font-orbitron mb-6 leading-tight">
								Shape the Future of <span className="enterprise-text-gradient">Cybersecurity</span>
							</motion.h1>
							<motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed px-4">
								Join our world-class team of security experts and help organizations build unbreakable defenses against evolving cyber threats.
							</motion.p>
						</motion.div>
					</div>
				</section>

				{/* Open Positions Section */}
				<section id="open-positions" className="enterprise-section py-16 md:py-20 relative z-10">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
						<motion.div
							variants={sectionVariants}
							initial="initial"
							animate="animate"
							className="text-center space-y-8 md:space-y-12"
						>
							<motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-12 font-orbitron">
								Open Positions
							</motion.h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{openPositions.map((position, index) => (
									<motion.div
										key={index}
										variants={itemVariants}
										whileInView="animate"
										viewport={{ once: true }}
										className="enterprise-card group hover:border-green-500/50 transition-all duration-300 cursor-pointer p-6 md:p-8"
									>
										<div className="flex flex-col gap-6 text-center">
											<div className="flex flex-col items-center">
												<h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 font-orbitron">
													{position.title}
												</h3>
												<div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
													<span className="bg-primary/10 px-2 py-1 rounded-full text-primary border border-primary/20">
														{position.location}
													</span>
													<span className="bg-secondary/10 px-2 py-1 rounded-full text-secondary border border-secondary/20">
														{position.type}
													</span>
												</div>
											</div>
											<div className="flex-1">
												<p className="text-sm text-muted-foreground leading-relaxed">
													{position.posted}
												</p>
											</div>
											<div className="mt-auto pt-4">
												<a href="https://apply.pentstark.com/apply" target="_blank" rel="noopener noreferrer" className="w-full">
													<button className="auth-button-primary text-sm px-6 py-3 w-full rounded-lg font-semibold hover:transform hover:scale-105 transition-all duration-300">
														Apply Now
													</button>
												</a>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				{/* Why Join Us Section */}
				<section className="enterprise-section py-16 md:py-20">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
						<motion.div
							variants={sectionVariants}
							initial="initial"
							animate="animate"
							className="text-center space-y-8 md:space-y-12 mb-12"
						>
							<motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16 font-orbitron">
								Why Join <span className="enterprise-text-gradient">PentStark</span>?
							</motion.h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
								{benefits.map((benefit, index) => (
									<motion.div
										key={index}
										variants={itemVariants}
										whileInView="animate"
										viewport={{ once: true }}
										className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${benefit.color} backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
									>
										<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
										<div className="relative z-10 text-center">
											<div className="text-4xl md:text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
												{benefit.icon}
											</div>
											<h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 font-orbitron">
												{benefit.title}
											</h3>
											<p className="text-sm md:text-base text-muted-foreground leading-relaxed">
												{benefit.description}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				{/* Interview Process Section */}
				<section className="enterprise-section py-16 md:py-20">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
						<motion.div
							variants={sectionVariants}
							initial="initial"
							animate="animate"
							className="text-center space-y-8 md:space-y-12"
						>
							<motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16 font-orbitron">
								Our <span className="enterprise-text-gradient">Interview Process</span>
							</motion.h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
								{interviewSteps.map((step, index) => (
									<motion.div
										key={index}
										variants={itemVariants}
										whileInView="animate"
										viewport={{ once: true }}
										className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
									>
										<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
										<div className="relative z-10 text-center">
											<div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
												{step.step}
											</div>
											<h3 className="text-lg md:text-xl font-bold text-foreground mb-4 font-orbitron">
												{step.title}
											</h3>
											<p className="text-sm md:text-base text-muted-foreground leading-relaxed">
												{step.description}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				{/* Global Team Section */}
				<section className="enterprise-section py-16 md:py-20">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
						<motion.div
							variants={sectionVariants}
							initial="initial"
							animate="animate"
							className="text-center space-y-8 md:space-y-12"
						>
							<motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 font-orbitron">
								Collaboration Across Borders
							</motion.h2>
							<motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
								Join our global team of security experts working together to build the next generation of cybersecurity solutions.
							</motion.p>
							<motion.div
								variants={itemVariants}
								whileInView="animate"
								viewport={{ once: true }}
								className="relative aspect-square w-full h-[400px] md:h-[500px] lg:h-[600px]"
							>
								<div className="absolute inset-0 w-full h-full overflow-hidden lg:overflow-visible">
									<GlobeVisualization />
								</div>
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="enterprise-section py-16 md:py-20">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
						<motion.div
							variants={sectionVariants}
							initial="initial"
							animate="animate"
							className="text-center space-y-8 md:space-y-12"
						>
							<motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 font-orbitron">
								Ready to Make an Impact?
							</motion.h2>
							<motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
								Join our team of cybersecurity experts and help shape the future of digital security. Send us your resume and let's build something amazing together.
							</motion.p>
							<motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
								<button 
									onClick={() => {
										const openPositionsSection = document.getElementById('open-positions');
										if (openPositionsSection) {
											const yOffset = -100; // Adjust this value as needed for your header height
											const y = openPositionsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
											window.scrollTo({ top: y, behavior: 'smooth' });
										}
									}}
									className="auth-button-primary px-8 py-3 text-sm md:text-base rounded-xl hover:scale-105 transition-all duration-300"
								>
									View Open Positions
								</button>
								<Link to="/contact">
									<button className="auth-button-secondary px-8 py-3 text-sm md:text-base rounded-xl hover:scale-105 transition-all duration-300">
										Submit Resume
									</button>
								</Link>
							</motion.div>
						</motion.div>
					</div>
				</section>
			</div>
		</motion.div>
	);
};

export default CareersPage;