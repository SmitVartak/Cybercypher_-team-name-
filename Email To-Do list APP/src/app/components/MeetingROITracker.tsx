import { motion } from 'motion/react';
import { X, TrendingUp, Clock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { CalendarEvent } from '@/app/types';

interface MeetingROITrackerProps {
  onClose: () => void;
  onViewReport: () => void;
  events: CalendarEvent[];
}

export function MeetingROITracker({ onClose, onViewReport, events }: MeetingROITrackerProps) {
  // Mock calculations based on "events" (in a real app, this would be real data)
  const meetingEvents = events.filter(e => e.type === 'meeting');
  const totalMeetingMinutes = meetingEvents.reduce((acc, curr) => {
    return acc + (curr.end.getTime() - curr.start.getTime()) / (1000 * 60);
  }, 0);
  
  const totalMeetingHours = Math.round(totalMeetingMinutes / 60 * 10) / 10;
  
  // Mock "Value" stats
  const actionItemsClosed = 12;
  const decisionsMade = 5;
  const roiScore = Math.min(Math.round((actionItemsClosed + decisionsMade) / (totalMeetingHours || 1) * 10), 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-3xl bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-slate-50"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div>
            <h2 className="font-['Instrument_Serif'] text-2xl text-white">Meeting ROI Tracker</h2>
            <p className="text-sm text-white/50">Weekly Intelligence Report</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X className="w-5 h-5 opacity-70" />
          </button>
        </div>

        <div className="p-8 grid grid-cols-12 gap-8">
            {/* Left Col: The Big Score */}
            <div className="col-span-5 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                
                <div className="relative z-10 text-center">
                    <div className="text-sm opacity-50 uppercase tracking-widest mb-2 font-medium">Productivity Score</div>
                    <div className="text-7xl font-['Instrument_Serif'] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 mb-2">
                        {roiScore}
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                        <TrendingUp className="w-3 h-3" />
                        Top 10%
                    </div>
                </div>

                {/* Circular Progress (Mock Visual) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - roiScore/100)} className="text-[var(--accent-color)] rotate-[-90deg] origin-center" />
                </svg>
            </div>

            {/* Right Col: The Breakdown */}
            <div className="col-span-7 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-2 mb-2 opacity-60">
                            <Clock className="w-4 h-4 text-orange-400" />
                            <span className="text-xs uppercase tracking-wide">Time Sunk</span>
                        </div>
                        <div className="text-2xl font-medium">{totalMeetingHours} <span className="text-sm opacity-50">hrs</span></div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-2 mb-2 opacity-60">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs uppercase tracking-wide">Value Created</span>
                        </div>
                        <div className="text-2xl font-medium">{actionItemsClosed} <span className="text-sm opacity-50">actions</span></div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-sm font-medium opacity-70 uppercase tracking-widest">Insights</h4>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5" />
                        <div>
                            <p className="text-sm text-orange-200/90 font-medium">Meeting overload detected on Tuesday</p>
                            <p className="text-xs text-orange-200/60 mt-0.5">3 hours of back-to-back calls fragmented your deep work blocks.</p>
                        </div>
                    </div>

                     <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <TrendingUp className="w-4 h-4 text-indigo-400 mt-0.5" />
                        <div>
                            <p className="text-sm text-indigo-200/90 font-medium">High ROI Strategy Session</p>
                            <p className="text-xs text-indigo-200/60 mt-0.5">The "Q3 Planning" meeting generated 8 action items. Good use of time.</p>
                        </div>
                    </div>
                </div>

                <button 
                  onClick={onViewReport}
                  className="w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                    View Full Report <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
