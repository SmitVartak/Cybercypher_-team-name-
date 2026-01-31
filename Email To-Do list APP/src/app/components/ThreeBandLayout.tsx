import { useState } from 'react';
import { Email, EmailBand } from '@/app/types';
import { EmailItem } from './EmailItem';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ChevronDown } from 'lucide-react';

interface ThreeBandLayoutProps {
  emails: Email[];
  onResolve: (id: string) => void;
  onPin: (id: string) => void;
  onEmailClick: (id: string) => void;
  isLightMode?: boolean;
}

export function ThreeBandLayout({ emails, onResolve, onPin, onEmailClick, isLightMode = false }: ThreeBandLayoutProps) {
  const [isGroupingEnabled, setIsGroupingEnabled] = useState(false);
  const [hoveredBand, setHoveredBand] = useState<EmailBand | null>(null);

  const bandGroups: Record<EmailBand, Email[]> = {
    now: emails.filter(e => e.band === 'now'),
    next: emails.filter(e => e.band === 'next'),
    later: emails.filter(e => e.band === 'later'),
  };

  const bandConfig = {
    now: { label: 'NOW', opacity: 1, description: 'High-priority, needs attention' },
    next: { label: 'NEXT', opacity: 1, description: 'Coming up soon' },
    later: { label: 'LATER', opacity: 0.9, description: 'Lower priority, can wait' },
  };

  const containerClass = isLightMode 
    ? "bg-white/70 border-black/10 shadow-sm" 
    : "bg-black/40 border-white/20 shadow-sm";

  const buttonClass = isGroupingEnabled 
      ? "bg-[var(--accent-color)]/20 border-[var(--accent-color)] text-[var(--accent-color)]"
      : isLightMode 
        ? "bg-black/5 border-black/10 text-black/50 hover:bg-black/10"
        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10";

  return (
    <div className="flex flex-col">
        {/* Global Control Bar */}
        <div className="flex justify-end mb-2 px-2">
            <button 
                onClick={() => setIsGroupingEnabled(!isGroupingEnabled)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${buttonClass}`}
            >
                <Layers className="w-3.5 h-3.5" />
                Smart Grouping
            </button>
        </div>

    <div className="grid grid-cols-3 gap-3 pb-8">
      {(['now', 'next', 'later'] as EmailBand[]).map((band) => {
        // Grouping Logic
        const emailsInBand = bandGroups[band];
        let displayItems: (Email | { type: 'bundle', id: string, label: string, emails: Email[] })[] = [];
        
        if (isGroupingEnabled) {
            const bundledIds = new Set<string>();
            
            // First pass: Find bundles
            emailsInBand.forEach(email => {
                if (email.bundleId && !bundledIds.has(email.bundleId)) {
                    const bundleEmails = emailsInBand.filter(e => e.bundleId === email.bundleId);
                    if (bundleEmails.length > 1) {
                        displayItems.push({
                            type: 'bundle',
                            id: email.bundleId,
                            label: email.bundleId === 'seed-round' ? 'Seed Round Updates' : 'Thesis Research',
                            emails: bundleEmails
                        });
                        bundleEmails.forEach(e => bundledIds.add(e.id)); // Mark all emails in this bundle as handled
                    } else {
                        // Single email with bundleId, treat as normal
                        displayItems.push(email);
                         bundledIds.add(email.id);
                    }
                } else if (!email.bundleId) {
                     displayItems.push(email);
                     bundledIds.add(email.id);
                }
            });

            // Filter out items that were already bundled (logic above is a bit simplified, ensuring order)
            // A clearer way:
            displayItems = [];
            const handledIds = new Set<string>();

            emailsInBand.forEach(email => {
                if (handledIds.has(email.id)) return;

                if (email.bundleId && isGroupingEnabled) {
                     const bundleEmails = emailsInBand.filter(e => e.bundleId === email.bundleId);
                     if (bundleEmails.length > 1) {
                         displayItems.push({
                            type: 'bundle',
                            id: email.bundleId,
                            label: email.bundleId === 'seed-round' ? 'Seed Round Updates' : email.bundleId === 'thesis-research' ? 'Thesis Research' : 'Topic Bundle',
                            emails: bundleEmails
                        });
                        bundleEmails.forEach(e => handledIds.add(e.id));
                     } else {
                         displayItems.push(email);
                         handledIds.add(email.id);
                     }
                } else {
                    displayItems.push(email);
                    handledIds.add(email.id);
                }
            });
            
        } else {
            displayItems = emailsInBand;
        }

        const isDimmed = hoveredBand && hoveredBand !== band;
        const isBreathing = hoveredBand === band;

        return (
        <motion.div
          key={band}
          className={`flex flex-col min-h-[280px] backdrop-blur-md rounded-lg border transition-all duration-500 ease-out ${containerClass}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
              opacity: isDimmed ? 0.3 : bandConfig[band].opacity, 
              y: 0,
              scale: isDimmed ? 0.98 : 1
          }}
          transition={{ duration: 0.4 }}
          onMouseEnter={() => setHoveredBand(band)}
          onMouseLeave={() => setHoveredBand(prev => prev === band ? null : prev)}
        >
          {/* Band Header */}
          <div className={`mb-4 sticky top-0 z-10 p-4 pb-3 rounded-t-lg border-b backdrop-blur-xl transition-colors duration-500 ${
              isLightMode ? 'bg-[#fbfaff]/80 border-purple-500/5' : 'bg-[#13111C]/80 border-purple-500/10'
          }`}>
            <h2 className="font-['Instrument_Serif'] text-xl mb-1 tracking-wide">
              {bandConfig[band].label}
            </h2>
            <p className="text-[10px] uppercase tracking-widest opacity-50">
              {bandConfig[band].description}
            </p>
          </div>

          {/* Emails */}
          <motion.div 
            className={`flex-1 px-3 pb-4 transition-all duration-500 ${isBreathing ? 'space-y-6' : 'space-y-3'}`}
            layout
          >
            {displayItems.length === 0 ? (
              <motion.div
                className="flex items-center justify-center h-40 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
              >
                <div>
                  <div className="text-6xl mb-2">✨</div>
                  <p className="text-sm">All clear</p>
                </div>
              </motion.div>
            ) : (
              displayItems.map((item: any) => {
                  if (item.type === 'bundle') {
                     return (
                         <BundleItem 
                            key={item.id} 
                            item={item} 
                            onResolve={onResolve}
                            onPin={onPin}
                            onEmailClick={onEmailClick}
                            isLightMode={isLightMode}
                         />
                     );
                  }
                  return (
                    <EmailItem
                      key={item.id}
                      email={item}
                      onResolve={onResolve}
                      onPin={onPin}
                      onClick={onEmailClick}
                      isLightMode={isLightMode}
                    />
                  )
              })
            )}
          </motion.div>
        </motion.div>
      )})}
    </div>
    </div>
  );
}

function BundleItem({ item, onResolve, onPin, onEmailClick, isLightMode }: { item: any, onResolve: any, onPin: any, onEmailClick: any, isLightMode: boolean }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const containerClass = isLightMode 
        ? isExpanded ? 'bg-black/10 border-black/20' : 'bg-black/5 border-black/10 hover:border-black/20'
        : isExpanded ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:border-white/20';

    const iconBgClass = isLightMode ? 'bg-black/10' : 'bg-white/10';
    const textClass = isLightMode ? 'text-black/90' : 'text-white/90';
    const subTextClass = isLightMode ? 'text-black/50' : 'text-white/50';

    return (
        <motion.div 
            layout
            className={`rounded-2xl border transition-all overflow-hidden ${containerClass}`}
        >
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-4 flex items-center justify-between cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${iconBgClass}`}>
                        <Layers className="w-4 h-4 text-[var(--accent-color)]" />
                    </div>
                    <div>
                        <h3 className={`font-medium text-sm ${textClass}`}>{item.label}</h3>
                        <p className={`text-xs ${subTextClass}`}>{item.emails.length} emails nested</p>
                    </div>
                </div>
                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`border-t ${isLightMode ? 'border-black/10 bg-black/5' : 'border-white/10 bg-black/20'}`}
                    >
                        <div className="p-2 space-y-2">
                            {item.emails.map((email: Email) => (
                                <EmailItem
                                  key={email.id}
                                  email={email}
                                  onResolve={onResolve}
                                  onPin={onPin}
                                  onClick={onEmailClick}
                                  isLightMode={isLightMode}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
