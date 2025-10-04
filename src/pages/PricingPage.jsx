import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { pageVariants, sectionVariants, itemVariants } from '@/lib/animations';



const plans = [
	{
		name: 'Starter',
		price: '$0',
		period: 'forever',
		features: [
			'Access to free labs',
			'Basic community support',
			'Limited progress tracking',
		],
		cta: 'Get Started',
		highlight: false,
	},
	{
		name: 'Pro',
		price: '$19',
		period: 'per month',
		features: [
			'All Starter features',
			'Unlimited labs access',
			'Advanced progress analytics',
			'Priority support',
			'Early access to new labs',
		],
		cta: 'Subscribe',
		highlight: true,
	},
	{
		name: 'Enterprise',
		price: 'Custom',
		period: '',
		features: [
			'All Pro features',
			'Team management',
			'Custom integrations',
			'Dedicated account manager',
		],
		cta: 'Contact Us',
		highlight: false,
	},
];

const PricingPage = () => (
    <motion.div
		initial="initial"
		animate="in"
		exit="out"
		variants={pageVariants}
		className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] py-16"
	>
		<section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<motion.h1
				variants={sectionVariants}
				className="text-4xl sm:text-6xl font-bold text-foreground font-orbitron mb-4"
			>
				Pricing Plans
			</motion.h1>
			<motion.p
				variants={itemVariants}
				className="text-lg text-muted-foreground mb-12 font-mono"
			>
				Choose the plan that fits your needs. Upgrade, downgrade, or cancel
				anytime.
			</motion.p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{plans.map((plan, idx) => (
					<motion.article
						key={plan.name}
						variants={itemVariants}
						aria-label={`${plan.name} plan`}
						className={`relative rounded-2xl border border-border/30 bg-background/80 shadow-lg p-8 flex flex-col items-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${
							plan.highlight
								? 'ring-2 ring-primary scale-105 z-10'
								: ''
						}`}
					>
						{plan.highlight && (
							<span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
								Most Popular
							</span>
						)}
						<h2 className="text-2xl font-bold font-orbitron mb-2">
							{plan.name}
						</h2>
						<div className="text-4xl font-extrabold text-primary mb-1">
							{plan.price}
						</div>
						<div className="text-muted-foreground mb-6">
							{plan.period}
						</div>
						<ul className="text-left mb-8 space-y-2">
							{plan.features.map((feature, i) => (
								<li
									key={i}
									className="flex items-center gap-2 text-base"
								>
									<span className="inline-block w-2 h-2 rounded-full bg-primary" />
									{feature}
								</li>
							))}
						</ul>
						<Button
							size="lg"
							className={`w-full font-mono transition-all duration-200 ${
								plan.highlight
									? 'bg-primary text-primary-foreground hover:bg-primary/90'
									: 'hover:bg-secondary/30'
							}`}
							onClick={() => alert(`Selected: ${plan.name}`)}
						>
							{plan.cta}
						</Button>
					</motion.article>
				))}
			</div>
		</section>
	</motion.div>
);

export default PricingPage;
