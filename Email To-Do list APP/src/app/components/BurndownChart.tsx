import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Email } from '@/app/types';

interface BurndownChartProps {
  emails: Email[];
  className?: string;
}

export function BurndownChart({ emails, className }: BurndownChartProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 });
  const [workLeft, setWorkLeft] = useState<{ hours: number; minutes: number }>({ hours: 0, minutes: 0 });
  const [status, setStatus] = useState<'ontrack' | 'behind' | 'ahead'>('ontrack');

  useEffect(() => {
    // Calculate work left
    // Heuristic: Weight * 15 minutes
    const unfinishedEmails = emails.filter(e => e.band === 'now' || e.band === 'next');
    const totalWeight = unfinishedEmails.reduce((acc, email) => acc + (email.weight || 1), 0);
    const totalMinutes = totalWeight * 15;
    
    setWorkLeft({
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60
    });

    // Calculate time left until 6 PM
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(18, 0, 0, 0); // 6:00 PM

      if (now > endOfDay) {
        setTimeLeft({ hours: 0, minutes: 0 });
        return;
      }

      const diff = endOfDay.getTime() - now.getTime();
      const diffMinutes = Math.floor(diff / 1000 / 60);
      
      setTimeLeft({
        hours: Math.floor(diffMinutes / 60),
        minutes: diffMinutes % 60
      });

      // Determine status
      if (totalMinutes > diffMinutes) {
        setStatus('behind');
      } else if (diffMinutes - totalMinutes > 120) { // More than 2 hours buffer
        setStatus('ahead');
      } else {
        setStatus('ontrack');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [emails]);



  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className ?? "fixed bottom-6 right-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-64 shadow-2xl z-50"}
    >
      <div className="flex items-center gap-4 h-full relative px-1">
         {/* Status Group */}
         <div className="flex flex-col items-start min-w-[60px]">
             <div className="flex items-center gap-1.5 mb-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'behind' ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`} />
                <span className={`text-[10px] font-medium uppercase tracking-wider ${status === 'behind' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {status === 'behind' ? 'Behind' : status === 'ahead' ? 'Ahead' : 'On Track'}
                </span>
             </div>
         </div>

         <div className="h-6 w-px bg-white/10" />

         {/* Metrics Group */}
         <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
                <span className="text-sm font-['Instrument_Serif'] text-white leading-none tracking-wide">{workLeft.hours}h {workLeft.minutes}m</span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest leading-none mt-0.5">Work Left</span>
            </div>
            
            <div className="flex flex-col items-end">
                <span className="text-sm font-['Instrument_Serif'] text-white/70 leading-none tracking-wide">{timeLeft.hours}h {timeLeft.minutes}m</span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest leading-none mt-0.5">Time Left</span>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
