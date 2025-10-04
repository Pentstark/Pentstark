import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CalendarDays, BarChart2 as BarChartIcon } from 'lucide-react';
import { sectionVariants } from '@/lib/animations';

const ActivityTab = ({ weeklyActivityChartData, formattedXpData }) => {
  return (
    <div className="space-y-6">
      <motion.section 
        variants={sectionVariants} 
        initial="initial" 
        animate="animate" 
        className="p-6 glass-effect-purple rounded-lg card-border-glow-purple"
      >
        <h3 className="text-xl font-semibold text-foreground mb-4 font-orbitron flex items-center"><CalendarDays className="mr-2 text-primary"/>Weekly Activity</h3>
        {weeklyActivityChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivityChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} 
                itemStyle={{ color: 'hsl(var(--foreground))' }} 
                labelStyle={{ color: 'hsl(var(--primary))' }}
              />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              <Bar dataKey="count" fill="hsl(var(--primary))" name="Activities" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="text-muted-foreground font-mono">No activity logged in the last 7 days.</p>}
      </motion.section>

      <motion.section 
        variants={sectionVariants} 
        initial="initial" 
        animate="animate" 
        className="p-6 glass-effect-purple rounded-lg card-border-glow-purple"
      >
          <h3 className="text-xl font-semibold text-foreground mb-4 font-orbitron flex items-center"><BarChartIcon className="mr-2 text-primary"/>XP Progression</h3>
          {formattedXpData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={formattedXpData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} 
                        itemStyle={{ color: 'hsl(var(--foreground))' }} 
                        labelStyle={{ color: 'hsl(var(--primary))' }}
                      />
                      <Legend wrapperStyle={{fontSize: "12px"}}/>
                      <Line type="monotone" dataKey="xp" stroke="hsl(var(--secondary))" strokeWidth={2} name="Total XP" dot={{ r: 4, fill: 'hsl(var(--secondary))' }} activeDot={{ r: 6 }} />
                  </LineChart>
              </ResponsiveContainer>
          ) : <p className="text-muted-foreground font-mono">No XP logged yet. Complete some labs!</p>}
      </motion.section>
    </div>
  );
};

export default ActivityTab;