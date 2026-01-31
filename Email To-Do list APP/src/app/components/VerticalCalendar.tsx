import { useRef, useEffect } from 'react';
import { CalendarEvent, GhostEvent } from '@/app/types';
import { motion, AnimatePresence } from 'motion/react';
import { format, differenceInMinutes, setHours, addHours, isSameDay } from 'date-fns';
import { Sparkles, FileText, CheckCircle2, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface VerticalCalendarProps {
  events: CalendarEvent[];
  ghostEvents: GhostEvent[];
  collapsed: boolean;
  onToggle: () => void;
  onEventClick: (event: CalendarEvent) => void;
}

export function VerticalCalendar({ events, ghostEvents, collapsed, onToggle, onEventClick }: VerticalCalendarProps) {
  // Use fixed "today" from mock data to align with user session
  const TODAY = new Date(2026, 0, 31);
  
  const todaysEvents = events.filter(e => isSameDay(e.start, TODAY));
  const todaysGhostEvents = ghostEvents.filter(e => e.suggestedDate && isSameDay(e.suggestedDate, TODAY));
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Start from 5 AM
  const startHour = 5;
  const totalHours = 24;
  const hours = Array.from({ length: totalHours }, (_, i) => (startHour + i) % 24);

  // Helper to calculate position (top offset) based on time
  const getTopOffset = (date: Date) => {
    // If the time is before 5 AM (e.g., 1 AM), treat it as "next day" for the timeline
    let targetTime = new Date(date);
    if (targetTime.getHours() < startHour) {
       targetTime = addHours(targetTime, 24);
    }
    
    // For handling dates properly in a real app, we'd need more sophisticated logic,
    // but for this mock single-day view, we'll align relative to 5 AM today.
    
    // Diff in minutes from 5 AM
    // Using simple hour calculation for the mock
    let hour = date.getHours();
    if (hour < startHour) hour += 24;
    
    const minutesFromStart = (hour - startHour) * 60 + date.getMinutes();
    return minutesFromStart * 2; // 2px per minute gives 120px per hour
  };

  const getHeight = (start: Date, end: Date) => {
    const diff = differenceInMinutes(end, start);
    return Math.max(diff * 2, 40); // Min height 40px
  };

  useEffect(() => {
    // Scroll to 9 AM initially if component mounts
    if (scrollRef.current) {
      scrollRef.current.scrollTop = (9 - 5) * 60 * 2; 
    }
  }, []);

  return (
    <div className="min-h-[280px] max-h-[650px] flex flex-col bg-white/5 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden relative transition-all duration-300">
      
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute top-4 right-4 z-20 p-1.5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Header */}
      <div className={`border-b border-white/10 bg-black/20 ${collapsed ? 'p-4 flex flex-col items-center gap-4' : 'p-5'}`}>
        {collapsed ? (
          <div className="mt-8 flex flex-col items-center gap-2">
            <CalendarIcon className="w-6 h-6 opacity-60" />
            <div className="text-xs font-mono opacity-50 rotate-90 whitespace-nowrap mt-4">
              {format(new Date(), 'MMM d')}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="font-['Instrument_Serif'] text-3xl mb-1">Timeline</h3>
            <p className="text-sm opacity-60 mb-4">{format(new Date(), 'EEEE, MMMM d')}</p>
            
            {/* Daily Briefing / AI Summary */}
            {/* Daily Briefing / AI Summary */}
            <div className="bg-white/90 rounded-xl p-4 border border-white/20 shadow-lg mt-2">
              <div className="flex items-center gap-2 mb-2 text-blue-600 text-xs uppercase tracking-widest font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Brief</span>
              </div>
              <p className="text-sm text-slate-900 font-medium leading-relaxed mb-3">
                "You have 3 hours of deep work scheduled. The investor pitch is your priority—deck needs review by 2 PM."
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>All systems nominal</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar relative bg-black/10">
        <div className="relative min-h-[2880px]"> {/* 24h * 60m * 2px */}
          {/* Hour Grid */}
          {hours.map((hour, i) => (
            <div 
              key={hour} 
              className="absolute w-full border-t border-white/5 flex group"
              style={{ top: i * 120, height: 120 }}
            >
              {!collapsed && (
                <div className="w-16 py-2 pl-4 text-sm opacity-40 font-mono group-hover:opacity-100 transition-opacity">
                  {format(setHours(new Date(), hour), 'h a')}
                </div>
              )}
              {collapsed && (
                <div className="w-full flex justify-center py-2">
                   <div className="text-[10px] opacity-30 font-mono">
                    {hour % 12 === 0 ? 12 : hour % 12}
                   </div>
                </div>
              )}
              <div className="flex-1" />
            </div>
          ))}

          {/* Current Time Line */}
          <div 
            className="absolute w-full border-t-2 border-red-500/50 z-20 pointer-events-none"
            style={{ top: getTopOffset(new Date()) }}
          >
            <div className={`absolute ${collapsed ? 'left-1/2 -ml-1.5' : '-left-1'} -top-1.5 w-3 h-3 rounded-full bg-red-500`} />
          </div>

          {/* Energy Window (9 AM - 11 AM) */}
          <div 
            className="absolute w-full left-0 right-0 z-0 pointer-events-none"
            style={{ 
              top: getTopOffset(setHours(new Date(), 9)), 
              height: getHeight(setHours(new Date(), 9), setHours(new Date(), 11)) 
            }}
          >
            <div className={`w-full h-full bg-gradient-to-r from-amber-500/5 to-amber-500/10 border-y border-amber-500/20 backdrop-blur-[2px] transition-opacity duration-500 ${collapsed ? 'opacity-0' : 'opacity-100'}`} />
            {!collapsed && (
              <div className="absolute top-2 right-4 flex items-center gap-1.5 text-amber-300/60 text-[10px] font-medium uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Peak Energy
              </div>
            )}
          </div>

          {/* Events */}
          <AnimatePresence>
            {!collapsed && todaysEvents.map(event => {
                // Check for optimization suggestion
                const isDeepWork = event.type === 'deep-work';
                // Simply check hours for mock purpose (real app would be more robust)
                const hour = event.start.getHours();
                const isOutsidePeak = hour < 9 || hour >= 11;
                const showSuggestion = isDeepWork && isOutsidePeak;

                return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => onEventClick(event)}
                className={`absolute left-16 right-4 p-4 rounded-xl border overflow-hidden hover:z-10 hover:shadow-xl transition-all cursor-pointer z-10 ${
                  event.isShadow 
                    ? 'border-dashed border-white/40 bg-black/40 backdrop-blur-sm' 
                    : 'border-white/10'
                }`}
                style={{
                  top: getTopOffset(event.start),
                  height: getHeight(event.start, event.end),
                  backgroundColor: event.isShadow 
                    ? undefined 
                    : event.type === 'deep-work' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  borderColor: event.isShadow
                    ? undefined
                    : event.type === 'deep-work' ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${
                    event.isShadow ? 'bg-white/40 border border-white/60' :
                    event.type === 'deep-work' ? 'bg-sky-400' : 'bg-indigo-400'
                  }`} />
                  <span className="text-[10px] opacity-70 tracking-wide font-mono">
                    {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                  </span>
                  {event.isShadow && (
                    <span className="ml-auto text-[10px] uppercase tracking-widest bg-white/10 px-1.5 py-0.5 rounded text-white/60">
                      Ghost Block
                    </span>
                  )}
                  {showSuggestion && (
                     <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-auto flex items-center gap-1 bg-amber-500/10 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                           // Mock optimization
                        }}
                     >
                        <Sparkles className="w-2.5 h-2.5" />
                        Optimize
                     </motion.button>
                  )}
                </div>
                <h4 className={`font-medium text-sm leading-tight mb-2 ${event.isShadow ? 'italic text-white/70' : ''}`}>
                  {event.title}
                </h4>
                
                {/* Fake Agenda Items */}
                {event.type === 'meeting' && !event.isShadow && (
                  <div className="space-y-1">
                    <div className="h-px bg-white/10 w-full mb-1.5" />
                    <div className="flex items-center gap-1.5 text-[10px] opacity-60">
                      <FileText className="w-3 h-3" />
                      <span>Review Q3 Metrics</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] opacity-60">
                      <FileText className="w-3 h-3" />
                      <span>Finalize Deck</span>
                    </div>
                  </div>
                )}
                {event.type === 'deep-work' && (
                  <div className="text-[10px] opacity-50 italic">
                    No notifications allowed.
                  </div>
                )}
                {event.isShadow && (
                  <div className="text-[10px] opacity-50 border-t border-white/10 pt-2 flex items-center gap-1">
                     <Sparkles className="w-3 h-3" />
                     Estimated time for reply
                  </div>
                )}
              </motion.div>
            )})}

            {!collapsed && todaysGhostEvents.map(event => {
              if (!event.suggestedDate) return null;
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-20 right-12 p-3 rounded-xl border-2 border-dashed border-white/20 hover:border-[var(--accent-color)] hover:bg-[var(--accent-color)]/5 transition-all cursor-grab active:cursor-grabbing group z-0"
                  style={{
                    top: getTopOffset(event.suggestedDate),
                    height: 120, // fixed visual height for transparency
                  }}
                >
                   <div className="flex items-center gap-2 mb-2 opacity-60 group-hover:opacity-100">
                    <div className="w-2 h-2 rounded-full border border-current" />
                    <span className="text-xs">
                      Suggested: {format(event.suggestedDate, 'h:mm a')}
                    </span>
                  </div>
                    <h4 className="font-medium text-base mb-1 italic opacity-80">{event.title}</h4>
                    <p className="text-xs opacity-50 line-clamp-2">{event.snippet}</p>
                  </motion.div>
                );
              })}

            {/* Collapsed State Markers */}
            {collapsed && todaysEvents.map(event => (
               <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`absolute left-2 right-2 rounded-md ${event.type === 'deep-work' ? 'bg-sky-400/30' : 'bg-indigo-400/30'} border border-white/20`}
                style={{
                  top: getTopOffset(event.start),
                  height: Math.max(differenceInMinutes(event.end, event.start) * 2, 20),
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
