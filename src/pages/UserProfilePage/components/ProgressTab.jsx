import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { sectionVariants } from '@/lib/animations';

const ProgressTab = ({ academyEnrollments }) => {
  return (
    <motion.section 
      variants={sectionVariants} 
      initial="initial" 
      animate="animate" 
      className="p-6 glass-effect-purple rounded-lg card-border-glow-purple"
    >
      <h3 className="text-xl font-semibold text-foreground mb-4 font-orbitron flex items-center"><BookOpen className="mr-2 text-primary"/>Academy Enrollments</h3>
      {academyEnrollments.length > 0 ? (
        <ul className="space-y-3">
          {academyEnrollments.map(enrollment => (
            <li key={enrollment.id} className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">{enrollment.tracks?.name || 'Unknown Track'}</span>: {enrollment.progress_percentage}% complete
              {enrollment.completed_at && <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-500" />}
                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${enrollment.progress_percentage}%` }}></div>
              </div>
            </li>
          ))}
        </ul>
      ) : <p className="text-muted-foreground font-mono">Not enrolled in any academy tracks yet.</p>}
    </motion.section>
  );
};

export default ProgressTab;