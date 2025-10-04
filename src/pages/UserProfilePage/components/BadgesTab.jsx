import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap } from 'lucide-react'; // Assuming Zap is a generic icon
import { sectionVariants } from '@/lib/animations';

const BadgesTab = ({ userBadges, allAchievements }) => {
  return (
    <motion.section 
      variants={sectionVariants} 
      initial="initial" 
      animate="animate" 
      className="p-6 glass-effect-purple rounded-lg card-border-glow-purple"
    >
      <h3 className="text-xl font-semibold text-foreground mb-4 font-orbitron flex items-center"><Award className="mr-2 text-primary"/>Badges & Achievements</h3>
      {userBadges.length > 0 && allAchievements.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {userBadges.map(userBadge => {
            const achievement = allAchievements.find(a => a.id === userBadge.badge_id);
            if (!achievement) return null;
            return (
              <div 
                key={achievement.id} 
                title={`${achievement.name}: ${achievement.description}\nAchieved: ${new Date(userBadge.achieved_at).toLocaleDateString()}`} 
                className="text-center p-3 bg-card/70 rounded-md border border-border w-28 hover:border-secondary/50 transition-colors cursor-help"
              >
                {achievement.icon_url === 'shield-check' ? <Award size={32} className="mx-auto text-yellow-400 mb-1.5"/> : <Zap size={32} className="mx-auto text-yellow-400 mb-1.5"/>}
                <p className="text-xs font-mono text-muted-foreground truncate">{achievement.name}</p>
              </div>
            );
          })}
        </div>
      ) : <p className="text-muted-foreground font-mono">No badges earned yet. Keep hacking!</p>}
    </motion.section>
  );
};

export default BadgesTab;