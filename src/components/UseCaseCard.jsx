import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Cloud, Smartphone, Bug, Banknote as Bank, BrainCircuit as Brain } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const iconMap = {
  'shield-check': ShieldCheck,
  cloud: Cloud,
  smartphone: Smartphone,
  bug: Bug,
  banknote: Bank,
  'brain-circuit': Brain,
};

export default function UseCaseCard({ useCase }) {
  const { id, title, description, icon, color, hoverColor } = useCase;
  const Icon = iconMap[icon] || ShieldCheck;

  return (
    <Link
      to={`/use-cases/${id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl"
    >
      <Card className={`relative overflow-hidden rounded-2xl border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}>        
        <div className={`absolute inset-0 bg-gradient-to-br ${color} ${hoverColor} opacity-30 group-hover:opacity-40 transition-opacity`}></div>
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
        <CardHeader className="relative z-10">
          <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/10">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardDescription className="text-white/80">{description}</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 pt-2 pb-6">
          <div className="flex items-center text-sm font-medium text-white/90 group-hover:text-white transition-colors">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
