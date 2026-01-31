import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Email } from '@/app/types';

interface BurndownChartProps {
  emails: Email[];
}

export function BurndownChart({ emails }: BurndownChartProps) {
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

  const getStatusColor = () => {
    switch (status) {
      case 'behind': return 'text-red-400';
      case 'ahead': return 'text-green-400';
      default: return 'text-white/60';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-64 shadow-2xl z-50"
    >
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-white/40 text-xs font-medium uppercase tracking-widest">Burndown</h3>
        <span className={`text-xs font-medium ${getStatusColor()}`}>
          {status === 'behind' ? 'Behind Schedule' : status === 'ahead' ? 'Ahead of Schedule' : 'On Track'}
        </span>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="text-2xl font-['Instrument_Serif'] text-white">
            {workLeft.hours}h {workLeft.minutes}m
          </div>
          <div className="text-xs text-white/40 mt-1">Work Remaining</div>
        </div>
        
        <div className="w-px bg-white/10" />
        
        <div className="flex-1 text-right">
          <div className="text-2xl font-['Instrument_Serif'] text-white/60">
            {timeLeft.hours}h {timeLeft.minutes}m
          </div>
          <div className="text-xs text-white/40 mt-1">Time until 6 PM</div>
        </div>
      </div>
      
      {/* Visual Bar */}
      <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden flex">
         {/* Work Bar */}
         <div 
           className={`h-full rounded-full ${status === 'behind' ? 'bg-red-500/50' : 'bg-white/20'}`}
           style={{ width: '100%' }} // Conceptual representation
         />
      </div>
    </motion.div>
  );
}
