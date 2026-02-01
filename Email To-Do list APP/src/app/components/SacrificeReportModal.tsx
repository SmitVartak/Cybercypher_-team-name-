import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, TrendingDown } from 'lucide-react';
import { FocusMode, CalendarEvent } from '../types';
import { formatDistance } from 'date-fns';

interface SacrificeReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: CalendarEvent[];
  currentMode: FocusMode;
}

export function SacrificeReportModal({ isOpen, onClose, events, currentMode }: SacrificeReportModalProps) {
  // Calculate lost time
  // We want to see how much of 'currentMode' was lost to other things.
  // OR, if global, show all sacrifices.
  // Let's focus on: Hours of [currentMode] lost.
  
  const lostEvents = events.filter(e => e.shadowedContext === currentMode);
  
  const totalLostMilliseconds = lostEvents.reduce((acc, curr) => {
    return acc + (curr.end.getTime() - curr.start.getTime());
  }, 0);
  
  const totalLostHours = Math.round(totalLostMilliseconds / (1000 * 60 * 60) * 10) / 10;
  
  // Group by what stole the time (the actual context)
  const culpritStats = lostEvents.reduce((acc, curr) => {
    const culprit = curr.context;
    const duration = curr.end.getTime() - curr.start.getTime();
    acc[culprit] = (acc[culprit] || 0) + duration;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#1C1C1E] border border-white/10 rounded-2xl shadow-2xl z-[70] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                        <TrendingDown className="w-5 h-5 text-red-400" />
                    </div>
                    <h2 className="text-xl font-['Instrument_Serif'] font-bold">Sacrifice Report</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 opacity-60" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-red-500/5 rounded-xl p-5 border border-red-500/10">
                    <p className="text-sm text-red-200/60 font-medium uppercase tracking-wider mb-1">Total Time Sacrified</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-red-400">{totalLostHours}</span>
                        <span className="text-sm opacity-60">hours this week</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium opacity-70 mb-3">Where did the time go?</h3>
                    <div className="space-y-3">
                        {Object.entries(culpritStats).map(([culprit, duration]) => (
                            <div key={culprit} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <span className="capitalize">{culprit} Meetings</span>
                                <span className="font-mono opacity-60">
                                    {(duration / (1000 * 60 * 60)).toFixed(1)} hrs
                                </span>
                            </div>
                        ))}
                        {lostEvents.length === 0 && (
                            <div className="text-center py-6 opacity-40 text-sm">
                                No sacrifices made this week. Great job protecting your time! 🛡️
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl text-sm opacity-70 leading-relaxed">
                    💡 <strong>Insight:</strong> You lost {totalLostHours} hours of {currentMode} time. Consider delegating these meetings or blocking "Deep Work" sessions earlier in the week.
                </div>
              </div>

              <div className="mt-6">
                <button
                    onClick={onClose}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors"
                >
                    Close Report
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
