import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AvatarAnchors } from '@/app/components/AvatarAnchors';
import { SidebarRibbon } from '@/app/components/SidebarRibbon';
import { ThreeBandLayout } from '@/app/components/ThreeBandLayout';
import { ProjectBubbles } from '@/app/components/ProjectBubbles';
import { ThreadMapView } from '@/app/components/ThreadMapView';
import { LiquidComposeButton } from '@/app/components/LiquidComposeButton';

import { OnboardingHint } from '@/app/components/OnboardingHint';
import { Toaster } from '@/app/components/ui/sonner';
import { toast } from 'sonner';
import { EmailDetailModal } from '@/app/components/EmailDetailModal';

import { BurndownChart } from '@/app/components/BurndownChart';
import { ComposeModal } from '@/app/components/ComposeModal';
import { MeetingROITracker } from '@/app/components/MeetingROITracker';
import { Email, CalendarEvent, IntentLabel } from '@/app/types';
import { 
  mockEmails, 
  mockContacts, 
  mockProjectBubbles, 
  mockCalendarEvents,
  mockThreadMap,
} from '@/app/data/mockData';
import { X } from 'lucide-react';
import { 
  focusModeConfigs,
  getFocusModeStyles,
} from '@/app/utils/focusModes';
import { 
  type FocusMode,
  type FocusSliderPosition
} from '@/app/types';

export default function App() {
  const [focusMode, setFocusMode] = useState<FocusMode>('startup');
  const [sliderPosition, setSliderPosition] = useState<FocusSliderPosition>('home');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [emails, setEmails] = useState(mockEmails);
  const [selectedThreadMap, setSelectedThreadMap] = useState<string | null>(null);
  const [zenMode, setZenMode] = useState(false);

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isROIModalOpen, setIsROIModalOpen] = useState(false);

  // Filter emails based on context and selected contact
  const filteredEmails = useMemo(() => {
    let filtered = emails;

    // Filter by focus mode context
    if (focusMode !== 'zen') {
      filtered = filtered.filter(email => {
        if (focusMode === 'startup') return email.contexts.includes('startup');
        if (focusMode === 'academic') return email.contexts.includes('academic');
        if (focusMode === 'deep-work') return email.priority === 'high';
        return true;
      });
    }

    // Filter by selected contact
    if (selectedContactId) {
      filtered = filtered.filter(email => email.from.id === selectedContactId);
    }

    return filtered;
  }, [emails, focusMode, selectedContactId]);

  // Filter projects by context
  const filteredProjects = useMemo(() => {
    if (focusMode === 'zen') return [];
    return mockProjectBubbles.filter(p => p.context === focusMode || focusMode === 'deep-work');
  }, [focusMode]);

  const handleModeChange = (mode: FocusMode) => {
    setFocusMode(mode);
    if (mode === 'zen') {
      setZenMode(true);
    } else {
      setZenMode(false);
    }
    toast.success(`Switched to ${focusModeConfigs[mode].name}`);
  };

  const handleResolve = (emailId: string) => {
    setEmails(prev => prev.filter(e => e.id !== emailId));
    toast.success('Email resolved! Great work.');
  };

  const handlePin = (emailId: string) => {
    setEmails(prev =>
      prev.map(e => (e.id === emailId ? { ...e, pinned: !e.pinned } : e))
    );
  };



  const handleProjectClick = (projectId: string) => {
    setSelectedThreadMap(projectId);
  };



  const handleCompose = () => {
    setIsComposeOpen(true);
  };

  const handleSend = (data: { to: string; subject: string; body: string; intent: IntentLabel; justification?: string; quiet?: boolean }) => {
    toast.success(data.quiet ? "Queued for quiet delivery" : "Message sent", {
      description: data.quiet 
        ? "Will arrive during recipient's active window"
        : `Labeled as ${data.intent.toUpperCase()}`,
      icon: data.quiet ? '🌙' : undefined
    });
    setIsComposeOpen(false);
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (event.emailId || event.emailThreadId) {
      // Prioritize finding by specific email ID, then fall back to thread ID
      const email = emails.find(e => 
        (event.emailId && e.id === event.emailId) || 
        (event.emailThreadId && e.threadId === event.emailThreadId)
      );

      if (email) {
        setSelectedEmail(email);
        toast.success(`Context Stitched: Opened related email for "${event.title}"`);
      } else {
        toast.info("Context not found for this event.");
      }
    } else {
        // Just a regular event
        toast('Event Details', {
            description: event.title
        });
    }
  };

  const handleEmailClick = (id: string) => {
    const email = emails.find(e => e.id === id);
    if (email) setSelectedEmail(email);
  };

  const triggerBriefingToast = () => {
    const duration = 3500;
    toast.custom((t) => (
      <div className="w-[356px] relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-xl flex flex-col ring-1 ring-black/5">
        <button 
          onClick={() => toast.dismiss(t)}
          className="absolute top-2 right-2 p-1 text-slate-500 hover:text-slate-700 hover:bg-black/5 rounded-full transition-colors z-20"
          title="Close"
          aria-label="Close notification"
        >
          <X className="w-3 h-3" />
        </button>
        <div className="p-4 flex gap-3 items-start relative z-10">
          <div className="text-xl mt-0.5">📅</div>
          <div className="flex-1 pr-4">
            <h3 className="font-medium text-slate-900 text-sm">Today's Briefing</h3>
            <p className="text-slate-700 text-sm mt-1 leading-relaxed">
              Today you have 2 classes, 1 intern review, and a startup sprint. Your tightest window is 2–4 PM.
            </p>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="bg-black/5 h-1 w-full mt-auto">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className="h-full bg-blue-500"
          />
        </div>
      </div>
    ), { 
      duration,
      // Override default styles from sonner.tsx to allow transparency
      className: '!bg-transparent !border-0 !shadow-none !p-0 !w-auto', 
      unstyled: true
    });
  };



  return (
    <div
      className="h-screen w-screen overflow-hidden bg-black text-white relative font-sans selection:bg-white/20 flex"
      style={getFocusModeStyles(focusMode)}
    >


      {/* Background grain texture */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      
      {/* Damascus Pattern Background - Hidden in Zen Mode */}
      {!zenMode && (
        <div 
          className="fixed inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 10 Q 45 25, 60 40 T 60 70 Q 45 85, 60 100 M 30 40 Q 20 50, 30 60 T 50 80 M 70 40 Q 80 50, 70 60 T 50 80 M 10 60 Q 15 55, 20 60 T 30 70 M 90 60 Q 95 55, 100 60 T 110 70' stroke='%23000000' stroke-width='0.5' fill='none' opacity='0.4'/%3E%3Cpath d='M 60 0 Q 70 10, 60 20 M 60 100 Q 70 110, 60 120 M 0 60 Q 10 70, 20 60 M 100 60 Q 110 70, 120 60' stroke='%23000000' stroke-width='0.3' fill='none' opacity='0.3'/%3E%3Ccircle cx='60' cy='60' r='3' fill='%23000000' opacity='0.2'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%23000000' opacity='0.15'/%3E%3Ccircle cx='90' cy='30' r='2' fill='%23000000' opacity='0.15'/%3E%3Ccircle cx='30' cy='90' r='2' fill='%23000000' opacity='0.15'/%3E%3Ccircle cx='90' cy='90' r='2' fill='%23000000' opacity='0.15'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
            backgroundRepeat: 'repeat'
          }}
        />
      )}
      
      {/* Ambient Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3], 
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 bg-[var(--accent-color)]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3], 
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 bg-purple-500/30"
        />
      </div>

      {/* Sidebar Ribbon */}
      <AnimatePresence>
        {!zenMode && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex-shrink-0 z-50 h-screen"
          >
            <SidebarRibbon
              currentMode={focusMode}
              onModeChange={handleModeChange}
              sliderPosition={sliderPosition}
              onSliderChange={setSliderPosition}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="px-10 pt-4 pb-3 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-['Playfair_Display'] text-4xl mb-2 tracking-tight">
              team_namemail
            </h1>
            <p className="text-sm opacity-60 font-['Inter'] tracking-wide">
              {zenMode
                ? '✨ Clear mind. Clear inbox.'
                : focusModeConfigs[focusMode].description}
            </p>
          </motion.div>
            {zenMode ? (
               <motion.button
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 onClick={triggerBriefingToast}
                 className="absolute top-8 right-10 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-medium uppercase tracking-wider transition-colors"
               >
                 <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                 Briefing
               </motion.button>
            ) : (
                <div className="absolute top-8 right-10 flex gap-3">
                   <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={triggerBriefingToast}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-medium uppercase tracking-wider transition-colors"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Briefing
                    </motion.button>
                     <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setIsROIModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-medium uppercase tracking-wider transition-colors"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Meeting ROI
                    </motion.button>
                </div>
            )}
        </header>

        {/* Main Content */}
        <main className="px-10 py-6 flex-1 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
          {zenMode ? (
            // Zen Mode - Minimal UI
            <motion.div
              key="zen"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-8xl mb-8"
              >
                ✨
              </motion.div>
              <h2 className="font-['Instrument_Serif'] text-4xl mb-4">
                You're in Zen Mode
              </h2>
              <p className="text-lg opacity-60 mb-8 max-w-md">
                All distractions hidden. Your next big deadline is the only thing that matters.
              </p>
              
              <button 
                onClick={() => handleModeChange('startup')}
                className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium transition-all"
              >
                Exit Zen Mode
              </button>

              <div className="mt-12 p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/20">
                <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Next Deadline</p>
                <p className="font-['Instrument_Serif'] text-2xl">Investor Pitch</p>
                <p className="text-sm opacity-70 mt-2">Tomorrow at 2:00 PM</p>
              </div>
            </motion.div>
          ) : sliderPosition === 'junk' ? (
            // Junk Page - Minimal dark view
            <motion.div
              key="junk"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-full overflow-y-auto custom-scrollbar"
            >
              {/* Use darker text for academic/startup modes */}
              {(() => {
                const isDarkText = focusMode === 'academic' || focusMode === 'startup';
                return (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className={`w-20 h-20 rounded-2xl ${isDarkText ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'} border flex items-center justify-center mb-6`}>
                  <span className="text-4xl">🗑️</span>
                </div>
                <h2 className={`font-['Instrument_Serif'] text-3xl mb-3 ${isDarkText ? 'text-black/70' : 'text-white/80'}`}>Junk & Spam</h2>
                <p className={`text-sm max-w-md mb-8 ${isDarkText ? 'text-black/50' : 'opacity-50'}`}>
                  Low-priority emails and newsletters that don't need your immediate attention.
                </p>
                
                {/* Empty State Junk List */}
                <div className="w-full max-w-2xl space-y-3">
                  {mockEmails.filter(e => e.priority === 'low').slice(0, 3).map((email, i) => (
                    <motion.div
                      key={email.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-4 ${isDarkText ? 'bg-black/5 border-black/10 hover:bg-black/10' : 'bg-white/5 border-white/10 hover:bg-white/10'} border rounded-lg flex items-center gap-4 transition-colors cursor-pointer`}
                    >
                      <div className={`w-10 h-10 rounded-full ${isDarkText ? 'bg-black/10' : 'bg-white/10'} flex items-center justify-center text-lg`}>
                        {email.from.name[0]}
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`font-medium text-sm ${isDarkText ? 'text-black/70' : 'text-white/70'}`}>{email.subject}</p>
                        <p className={`text-xs ${isDarkText ? 'text-black/40' : 'text-white/40'}`}>{email.from.name}</p>
                      </div>
                      <span className={`text-xs ${isDarkText ? 'text-black/30' : 'text-white/30'}`}>low priority</span>
                    </motion.div>
                  ))}
                </div>
                
                <button 
                  onClick={() => setSliderPosition('home')}
                  className={`mt-8 px-6 py-2 ${isDarkText ? 'bg-black/10 hover:bg-black/20 border-black/20' : 'bg-white/10 hover:bg-white/20 border-white/20'} border rounded-full text-sm font-medium transition-all`}
                >
                  Back to Inbox
                </button>
              </div>
                );
              })()}
            </motion.div>
          ) : sliderPosition === 'calendar' ? (
            // Full Calendar Page - Weekly Grid View
            <motion.div
              key="calendar-page"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="font-['Instrument_Serif'] text-3xl">Weekly Timeline</h2>
                </div>

                <button 
                  onClick={() => setSliderPosition('home')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium transition-all"
                >
                  Back to Inbox
                </button>
              </div>
              
              {/* Weekly Grid */}
              <div className="flex-1 min-h-0 overflow-auto">
                <div className="bg-black/15 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden shadow-xl">
                  {/* Days Header */}
                  <div className="grid grid-cols-8 border-b border-white/20 bg-white/5">
                    <div className="p-3 text-xs font-mono opacity-60 text-center border-r border-white/15">Time</div>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => {
                      const today = new Date();
                      const startOfWeek = new Date(today);
                      startOfWeek.setDate(today.getDate() - today.getDay() + i);
                      const isToday = startOfWeek.toDateString() === today.toDateString();
                      
                      return (
                        <div 
                          key={day} 
                          className={`p-3 text-center border-l border-white/15 ${isToday ? 'bg-[var(--accent-color)]/20' : ''}`}
                        >
                          <div className={`text-xs font-semibold uppercase tracking-wider ${isToday ? 'text-[var(--accent-color)]' : 'opacity-70'}`}>
                            {day}
                          </div>
                          <div className={`text-lg font-mono font-bold ${isToday ? 'text-[var(--accent-color)]' : ''}`}>
                            {startOfWeek.getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Hour Rows */}
                  <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                    {Array.from({ length: 14 }, (_, i) => i + 6).map((hour, idx) => (
                      <div key={hour} className={`grid grid-cols-8 border-b border-white/10 min-h-[60px] ${idx % 2 === 0 ? 'bg-white/[0.03]' : 'bg-black/10'}`}>
                        <div className="p-2 text-xs font-mono opacity-60 text-right pr-4 border-r border-white/15 flex items-center justify-end">
                          {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                        </div>
                        {[0, 1, 2, 3, 4, 5, 6].map(dayOffset => {
                          const today = new Date();
                          const dayDate = new Date(today);
                          dayDate.setDate(today.getDate() - today.getDay() + dayOffset);
                          dayDate.setHours(hour, 0, 0, 0);
                          
                          // Find events for this hour/day
                          const dayEvents = mockCalendarEvents.filter(e => {
                            const eventDay = e.start.getDay();
                            const eventHour = e.start.getHours();
                            
                            // Filter by selected mode
                            // Startup mode shows: startup
                            // Academic mode shows: academic
                            // Career (deep-work) mode shows: deep-work
                            const matchesMode = e.context === focusMode;
                            
                            return eventDay === dayOffset && eventHour === hour && matchesMode;
                          });
                          
                          const isToday = dayDate.toDateString() === today.toDateString();
                          const isCurrentHour = isToday && hour === today.getHours();
                          
                          return (
                            <div 
                              key={dayOffset}
                              className={`p-1 border-l border-white/10 relative ${isToday ? 'bg-[var(--accent-color)]/10' : ''} ${isCurrentHour ? 'bg-emerald-500/20 ring-1 ring-inset ring-emerald-500/40' : ''}`}
                            >
                              {dayEvents.map(event => (
                                <div
                                  key={event.id}
                                  onClick={() => handleEventClick(event)}
                                  className={`text-[10px] p-1.5 rounded mb-1 cursor-pointer truncate font-medium shadow-sm ${
                                    event.type === 'deep-work' 
                                      ? 'bg-sky-500/30 border border-sky-400/50 text-sky-200'
                                      : 'bg-indigo-500/30 border border-indigo-400/50 text-indigo-200'
                                  }`}
                                >
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Normal Mode
            <motion.div
              key={focusMode}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-full overflow-y-auto custom-scrollbar"
            >
              {/* Avatar Anchors + Project Bubbles Row */}
              <div className="mb-3 flex-shrink-0 flex items-center gap-4">
                <AvatarAnchors
                  contacts={mockContacts}
                  selectedContactId={selectedContactId}
                  onSelectContact={setSelectedContactId}
                />
                
                {/* Project Bubbles - now beside people */}
                {filteredProjects.length > 0 && (
                  <div className="flex-1">
                    <ProjectBubbles
                      projects={filteredProjects}
                      onProjectClick={handleProjectClick}
                    />
                  </div>
                )}
              </div>

              {/* Flex Layout: Main Content */}
              <div className="flex flex-1 min-h-0 gap-3">

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Three Band Layout */}
                  <div className="flex-1">
                    <ThreeBandLayout
                      emails={filteredEmails}
                      onResolve={handleResolve}
                      onPin={handlePin}
                      onEmailClick={handleEmailClick}
                      isLightMode={focusMode === 'startup' || focusMode === 'academic'}
                    />
                  </div>
                </div>
              </div>


            </motion.div>
          )}
          </AnimatePresence>
        </main>

        {/* Email Detail Modal */}
        <AnimatePresence>
          {selectedEmail && (
            <EmailDetailModal 
              email={selectedEmail} 
              onClose={() => setSelectedEmail(null)} 
            />
          )}
        </AnimatePresence>
        
        {/* Compose Modal */}
        <AnimatePresence>
          {isComposeOpen && (
            <ComposeModal 
              onClose={() => setIsComposeOpen(false)} 
              onSend={handleSend} 
            />
          )}
        </AnimatePresence>

        {/* Liquid Compose Button */}
        {!zenMode && <LiquidComposeButton onClick={handleCompose} />}

        {/* Onboarding Hint */}
        {!zenMode && <OnboardingHint />}

        {/* Burn-down Chart */}
        {!zenMode && <BurndownChart emails={filteredEmails} />}

        {/* Thread Map Modal */}
        <AnimatePresence>
          {selectedThreadMap && (
            <ThreadMapView
              threadMap={mockThreadMap}
              onClose={() => setSelectedThreadMap(null)}
            />
          )}
        </AnimatePresence>

        {/* Meeting ROI Tracker Modal */}
        <AnimatePresence>
            {isROIModalOpen && (
                <MeetingROITracker 
                    onClose={() => setIsROIModalOpen(false)}
                    events={mockCalendarEvents}
                />
            )}
        </AnimatePresence>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--accent-color);
          border-radius: 3px;
          opacity: 0.5;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          opacity: 0.8;
        }

        /* Set font families globally */
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
      
      {/* Toaster */}
      <Toaster />
    </div>
  );
}