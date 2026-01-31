import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Email } from '@/app/types';
import { format } from 'date-fns';
import { 
  X, Reply, ReplyAll, Forward, Pin, Bookmark, 
  Sparkles, PenLine, MoreHorizontal, Trash2,
  Calendar as CalendarIcon, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

interface EmailDetailModalProps {
  email: Email;
  onClose: () => void;
}

export function EmailDetailModal({ email, onClose }: EmailDetailModalProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<Date[]>([]);
  
  // Mock body generator... (keep existing)
  const getBodyContent = () => {
    if (email.body) return email.body;
    return email.preview + "\n\n(Placeholder body)";
  };

  const handleSlotClick = (hour: number) => {
    const date = new Date(2026, 0, 31, hour, 0);
    if (selectedSlots.find(d => d.getTime() === date.getTime())) {
      setSelectedSlots(selectedSlots.filter(d => d.getTime() !== date.getTime()));
    } else {
      setSelectedSlots([...selectedSlots, date]);
    }
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {isReplying ? (
           // --- REPLY MODE ---
           <div className="flex h-full">
              {/* Left: Draft Area */}
              <div className="flex-1 flex flex-col border-r border-white/10">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                   <h3 className="font-medium">Drafting Reply</h3>
                   <button onClick={() => setIsReplying(false)} className="text-xs text-white/50 hover:text-white">Cancel</button>
                </div>
                <div className="flex-1 p-6 font-['Inter'] space-y-4 overflow-y-auto">
                    <p className="opacity-80">Hi {email.from.name.split(' ')[0]},</p>
                    <p className="opacity-80">Thanks for the note. I'd be happy to meet.</p>
                    <p className="opacity-80">Here are some times that work for me:</p>
                    
                    {/* Embedded Time Widgets */}
                    <div className="flex flex-wrap gap-2 my-4">
                      {selectedSlots.length === 0 && (
                        <div className="text-sm opacity-40 italic border-2 border-dashed border-white/10 rounded-xl p-4 w-full text-center">
                          Select time blocks from the calendar to embed them here.
                        </div>
                      )}
                      
                      {selectedSlots.sort((a,b) => a.getTime() - b.getTime()).map(slot => (
                         <motion.div 
                           initial={{ scale: 0.8, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           key={slot.toISOString()}
                           className="bg-[var(--accent-color)] text-white px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg"
                         >
                            <div className="bg-white/20 p-1.5 rounded-lg">
                               <CalendarIcon className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-medium opacity-80 uppercase tracking-wide">Available</div>
                                <div className="font-semibold">{format(slot, 'h:00 a')} - {format(new Date(slot.getTime() + 60*60*1000), 'h:00 a')}</div>
                            </div>
                            <button 
                              onClick={() => handleSlotClick(slot.getHours())}
                              className="ml-2 hover:bg-black/20 p-1 rounded transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                         </motion.div>
                      ))}
                    </div>

                    <p className="opacity-80">Let me know which works best for you.</p>
                </div>
                <div className="p-4 border-t border-white/10 flex justify-end gap-2">
                    <button 
                      onClick={() => {
                        toast.success('Reply sent with scheduling widget!');
                        onClose();
                      }}
                      className="bg-white text-black px-6 py-2 rounded-xl font-medium hover:bg-white/90"
                    >
                      Send Reply
                    </button>
                </div>
              </div>

              {/* Right: Mini Scheduling Calendar */}
              <div className="w-[300px] bg-black/20 flex flex-col">
                  <div className="p-4 border-b border-white/10">
                     <h4 className="text-xs font-semibold uppercase tracking-widest opacity-50">Availability</h4>
                     <p className="text-sm opacity-80 mt-1">Select slots to insert</p>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                      {hours.map(hour => {
                        const isSelected = selectedSlots.some(d => d.getHours() === hour);
                        // Mock busy detection
                        const isBusy = (hour === 9 || hour === 14); // Mock specific busy hours

                        return (
                          <div 
                            key={hour}
                            onClick={() => !isBusy && handleSlotClick(hour)}
                            className={`
                              group relative h-16 rounded-lg border border-white/5 transition-all cursor-pointer flex items-center px-4 gap-4
                              ${isSelected ? 'bg-[var(--accent-color)]/20 border-[var(--accent-color)]' : 'hover:bg-white/5'}
                              ${isBusy ? 'opacity-30 cursor-not-allowed bg-white/5' : ''}
                            `}
                          >
                             <span className="text-xs font-mono opacity-50 w-12 text-right">{hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}</span>
                             
                             {isBusy ? (
                                <span className="text-xs text-red-300 font-medium">Busy</span>
                             ) : isSelected ? (
                                <span className="text-xs text-[var(--accent-color)] font-medium flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Selected
                                </span>
                             ) : (
                                <span className="text-xs opacity-0 group-hover:opacity-50">Click to add</span>
                             )}
                          </div>
                        )
                      })}
                  </div>
              </div>
           </div>
        ) : (
          // --- READ MODE (Existing) ---
          <> 
        {/* Header Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
               <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                 <X className="w-5 h-5 opacity-70" />
               </button>
               <span className="text-sm font-medium opacity-50">Reading Mode</span>
            </div>
            
            <div className="flex items-center gap-2">
                <button 
                  onClick={() => toast('Summarizing with AI...', { icon: '✨' })}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[var(--accent-color)]/20 text-[var(--accent-color)] rounded-lg text-xs font-medium hover:bg-[var(--accent-color)]/30 transition-colors"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Summarize</span>
                </button>
                 <button 
                  onClick={() => toast('Highlight mode active', { icon: '🖊️' })}
                  className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                  title="Highlight"
                >
                    <PenLine className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button 
                  className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                  title="Pin"
                >
                    <Pin className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                  title="Bookmark"
                >
                    <Bookmark className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Invite Card (Async-First RSVP) */}
        {email.isInvite && (
            <div className="mx-8 mt-6 p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                 <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-3">
                         <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-300">
                             <CalendarIcon className="w-5 h-5" />
                         </div>
                         <div>
                             <h3 className="font-semibold text-white">Calendar Invite</h3>
                             <p className="text-sm opacity-60">Proposed time: Tue, Feb 3 • 2:00 PM - 3:00 PM</p>
                         </div>
                     </div>
                 </div>
                 
                 <div className="flex gap-2">
                     <button 
                        className="flex-1 py-2 bg-white text-black font-medium rounded-lg text-sm hover:bg-white/90 transition-colors"
                        onClick={() => toast.success("Meeting accepted")}
                     >
                         Accept
                     </button>
                     <button className="flex-1 py-2 bg-white/5 border border-white/10 text-white font-medium rounded-lg text-sm hover:bg-white/10 transition-colors">
                         Tentative
                     </button>
                     <button 
                        className="flex-1 py-2 bg-red-500/10 border border-red-500/20 text-red-200 font-medium rounded-lg text-sm hover:bg-red-500/20 transition-colors group relative overflow-hidden"
                        onClick={() => toast.success("Declined. AI Summary scheduled.", {
                            description: "The sender will receive a summary and recording link instead.",
                            icon: "🤖" 
                        })}
                     >
                         <span className="relative z-10 group-hover:hidden">Decline</span>
                         <span className="relative z-10 hidden group-hover:flex items-center justify-center gap-1.5 w-full">
                             <Sparkles className="w-3 h-3" />
                             Decline & Send AI Update
                         </span>
                     </button>
                 </div>
                 <p className="text-[10px] text-center mt-3 opacity-40">
                    Hover on Decline to use Async-First RSVP
                 </p>
            </div>
        )}

        {/* Email Header Info */}
        <div className="px-8 py-6 pb-4">
            <h2 className="font-['Instrument_Serif'] text-3xl leading-tight mb-4 text-white/90">{email.subject}</h2>
            
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={email.from.avatar || `https://ui-avatars.com/api/?name=${email.from.name}`} alt={email.from.name} className="w-12 h-12 rounded-full" />
                    <div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="font-medium text-lg text-white">{email.from.name}</h3>
                            <span className="text-sm opacity-50 text-white/60">&lt;{email.from.email}&gt;</span>
                        </div>
                        <p className="text-sm text-white/60">
                            {format(email.timestamp, "MMM d, yyyy 'at' h:mm a")}
                        </p>
                    </div>
                </div>
                
                {email.priority === 'high' && (
                    <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-medium border border-red-500/30">
                        High Priority
                    </div>
                )}
            </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
            <div className="prose prose-invert prose-lg max-w-none opacity-90 whitespace-pre-line font-['Inter'] leading-relaxed text-white/80">
                {getBodyContent().split(/(\[\[.*?\]\])/).map((part, i) => {
                  if (part.startsWith('[[') && part.endsWith(']]')) {
                    return (
                      <span key={i} className="bg-[var(--accent-color)]/20 text-[var(--accent-color)] px-1 rounded font-medium border border-[var(--accent-color)]/30 mx-0.5 shadow-[0_0_10px_rgba(var(--accent-color),0.2)]">
                        {part.slice(2, -2)}
                      </span>
                    );
                  }
                  return part;
                })}
            </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-white/10 bg-white/5 flex items-center gap-3">
             <button 
                onClick={() => setIsReplying(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
              >
                <Reply className="w-4 h-4" />
                Smart Reply
             </button>
             <button className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors">
                <ReplyAll className="w-4 h-4" />
                Reply All
             </button>
             <div className="flex-1" />
             <button 
                onClick={() => onClose()}
                className="p-2.5 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-colors text-white/40"
            >
                <Trash2 className="w-5 h-5" />
             </button>
        </div>
        </>
        )}

      </motion.div>
    </div>
  );
}
