import { GhostEvent } from '@/app/types';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface GhostEventsProps {
  ghostEvents: GhostEvent[];
  onSolidify: (eventId: string, date: Date) => void;
}

export function GhostEvents({ ghostEvents, onSolidify }: GhostEventsProps) {
  if (ghostEvents.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xs uppercase tracking-widest opacity-50 mb-4">Temporal Whispers</h3>
      <div className="space-y-3">
        {ghostEvents.map(event => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            {/* Ghost event card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-dashed border-white/30 hover:border-[var(--accent-color)]/50 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Calendar className="w-4 h-4 opacity-60" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-['Inter'] font-medium text-sm mb-1">
                    {event.title}
                  </h4>
                  <p className="text-xs opacity-60 line-clamp-2 mb-2">
                    {event.snippet}
                  </p>
                  {event.suggestedDate && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="opacity-50">Suggested:</span>
                      <span className="text-[var(--accent-color)]">
                        {format(event.suggestedDate, 'MMM d, h:mm a')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Solidify button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => event.suggestedDate && onSolidify(event.id, event.suggestedDate)}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--accent-color)]/20 hover:bg-[var(--accent-color)]/30 text-[var(--accent-color)] rounded-lg text-xs uppercase tracking-wider transition-colors"
              >
                Solidify Event <ArrowRight className="w-3 h-3" />
              </motion.button>
            </div>

            {/* Ambient glow */}
            <div className="absolute inset-0 bg-[var(--accent-color)] opacity-0 group-hover:opacity-10 rounded-xl blur-xl -z-10 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
