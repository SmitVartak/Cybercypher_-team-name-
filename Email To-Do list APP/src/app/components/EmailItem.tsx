import { useState } from 'react';
import { Email } from '@/app/types';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Clock, Paperclip, Pin, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface EmailItemProps {
  email: Email;
  onResolve: (id: string) => void;
  onPin: (id: string) => void;
  onClick: (id: string) => void;
  isLightMode?: boolean;
}

export function EmailItem({ email, onResolve, onPin, onClick, isLightMode = false }: EmailItemProps) {
  const [showSatisfaction, setShowSatisfaction] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    ['rgba(220, 38, 38, 0.1)', 'rgba(255, 255, 255, 0.05)', 'rgba(34, 197, 94, 0.1)']
  );
  
  // Drag indicator opacities - must be defined before any conditional returns
  const snoozeOpacity = useTransform(x, [0, -100], [0, 1]);
  const resolveOpacity = useTransform(x, [0, 100], [0, 1]);

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x > 100) {
      setShowSatisfaction(true);
      setTimeout(() => {
        onResolve(email.id);
      }, 300);
    } else if (info.offset.x < -100) {
      // Snooze logic could go here
    }
  };

  // Calculate visual weight glow
  const getWeightGlow = () => {
    // Urgent glow - Red/Orange tint for attention
    if (email.intent === 'urgent') return '0 0 35px rgba(248, 113, 113, 0.35), inset 0 0 20px rgba(248, 113, 113, 0.1)'; 
    if (email.from.relationship === 'inner-circle') return '0 0 25px rgba(var(--accent-color-rgb), 0.15), inset 0 0 20px rgba(var(--accent-color-rgb), 0.05)';
    if (email.from.relationship === 'important') return '0 0 15px rgba(var(--accent-color-rgb), 0.1)';
    return 'none';
  };

  const getBorderColor = () => {
    if (email.from.relationship === 'inner-circle') return 'rgba(var(--accent-color-rgb), 0.3)';
    return 'rgba(255, 255, 255, 0.05)';
  };

  const getWeightOpacity = () => {
    if (email.from.relationship === 'noise') return 0.6;
    return 1;
  };

  // Satisfaction state render
  if (showSatisfaction) {
    return (
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
        className="bg-white/5 backdrop-blur-md rounded-lg p-6 mb-3"
      >
        <div className="text-center text-green-400">
          <CheckCircle2 className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm">Did you get what you needed?</p>
        </div>
      </motion.div>
    );
  }

  // Normal email item render
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{ x, opacity, backgroundColor, boxShadow: getWeightGlow() }}
      className="relative bg-white/10 backdrop-blur-md rounded-2xl mb-2 cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.01 }}
      onClick={() => onClick(email.id)}
    >
      <div className="p-4" style={{ opacity: getWeightOpacity() }}>
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {email.from.avatar ? (
              <img 
                src={email.from.avatar} 
                alt={email.from.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-white font-medium text-lg">
                {email.from.name[0]}
              </div>
            )}
            {email.weight >= 8 && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--accent-color)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-['Inter'] font-medium text-sm text-current mb-0.5">
                  {email.from.name}
                </h3>
                <p className="text-sm opacity-60">
                  {formatDistanceToNow(email.timestamp, { addSuffix: true })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {email.hasAttachment && (
                  <Paperclip className="w-3.5 h-3.5 opacity-50" />
                )}
                {email.hasDeadline && (
                  <div className="flex items-center gap-1 text-[10px] text-[var(--accent-color)]">
                    <Clock className="w-3 h-3" />
                    <span>{formatDistanceToNow(email.hasDeadline)}</span>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPin(email.id);
                  }}
                  className="p-1 hover:bg-white/10 rounded"
                  aria-label={email.pinned ? "Unpin email" : "Pin email"}
                >
                  <Pin className={`w-3.5 h-3.5 ${email.pinned ? 'fill-[var(--accent-color)] text-[var(--accent-color)]' : 'opacity-50'}`} />
                </button>
              </div>
            </div>
            
            <h4 className="font-['Instrument_Serif'] text-lg mb-1 truncate">
              {email.subject}
            </h4>
            
            <p className="text-xs opacity-70 line-clamp-2">
              {email.preview}
            </p>

            {email.needsReply && (
              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-[var(--accent-color)]/20 text-[var(--accent-color)] rounded-full text-xs uppercase tracking-wider">
                Needs Reply
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drag indicators */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 text-red-400"
        style={{ opacity: snoozeOpacity }}
      >
        ← Snooze
      </motion.div>
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 text-green-400"
        style={{ opacity: resolveOpacity }}
      >
        Resolve →
      </motion.div>
    </motion.div>
  );
}