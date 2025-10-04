import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Palette } from 'lucide-react';
import { itemVariants } from '@/lib/animations';
import { rankColors } from './ProfileHeader'; // Assuming rankColors is exported from ProfileHeader or a shared consts file

const DashboardTab = ({
  subscription,
  profile,
  labStats,
  skillScores
}) => {
  const subscriptionPlan = subscription?.plan_name || 'Free';
  const subscriptionStatus = subscription?.status || 'N/A';
  const userRank = profile?.rank || 'Script Kiddie';
  const userXP = profile?.xp || 0;
  const currentRankColor = rankColors[userRank] || 'text-gray-400';
  const overallProgressPercentage = labStats.total > 0 ? Math.round((labStats.completed / labStats.total) * 100) : 0;

  return (
    <motion.section
      variants={itemVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <motion.div variants={itemVariants} className="p-6 glass-effect-purple rounded-lg card-border-glow-purple">
        <h3 className="text-xl font-semibold text-foreground mb-3 font-orbitron flex items-center"><Shield className="mr-2 text-primary" />Subscription</h3>
        <p className="text-muted-foreground font-mono">Plan: <span className="text-secondary font-bold">{subscriptionPlan}</span></p>
        <p className="text-muted-foreground font-mono">Status: <span className={`font-bold ${subscriptionStatus === 'active' ? 'text-green-400' : 'text-red-400'}`}>{subscriptionStatus}</span></p>
        {subscriptionPlan === 'Free' && <Button size="sm" className="mt-3 w-full font-mono bg-secondary hover:bg-secondary/90">Upgrade to Pro</Button>}
        {subscriptionStatus === 'expired' && <Button size="sm" className="mt-3 w-full font-mono bg-yellow-500 hover:bg-yellow-600 text-black">Renew Subscription</Button>}
      </motion.div>

      <motion.div variants={itemVariants} className="p-6 glass-effect-purple rounded-lg card-border-glow-purple">
        <h3 className="text-xl font-semibold text-foreground mb-3 font-orbitron flex items-center"><TrendingUp className="mr-2 text-primary" />Overall Stats</h3>
        <p className="text-muted-foreground font-mono">Rank: <span className={`font-bold ${currentRankColor}`}>{userRank}</span></p>
        <p className="text-muted-foreground font-mono">XP: <span className="text-secondary font-bold">{userXP}</span></p>
        <p className="text-muted-foreground font-mono mt-1">Labs Completed: <span className="text-secondary font-bold">{labStats.completed} / {labStats.total}</span></p>
        <div className="w-full bg-muted rounded-full h-2.5 mt-2">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${overallProgressPercentage}%` }}></div>
        </div>
        <p className="text-xs text-right text-primary font-mono mt-1">{overallProgressPercentage}% Complete</p>
      </motion.div>

      <motion.div variants={itemVariants} className="p-6 glass-effect-purple rounded-lg card-border-glow-purple">
        <h3 className="text-xl font-semibold text-foreground mb-3 font-orbitron flex items-center"><Palette className="mr-2 text-primary" />Skill Overview</h3>
        {skillScores ? (
          <ul className="text-sm text-muted-foreground font-mono space-y-1">
            <li>Web: <span className="text-secondary">{skillScores.web_score || 0}%</span></li>
            <li>Crypto: <span className="text-secondary">{skillScores.crypto_score || 0}%</span></li>
            <li>Forensics: <span className="text-secondary">{skillScores.forensics_score || 0}%</span></li>
          </ul>
        ) : <p className="text-muted-foreground font-mono text-sm">Skill scores not available.</p>}
        <Button variant="link" size="sm" className="px-0 mt-2 text-primary">View Full Skill Wheel</Button>
      </motion.div>
    </motion.section>
  );
};

export default DashboardTab;