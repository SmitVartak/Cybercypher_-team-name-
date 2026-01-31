import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb } from 'lucide-react';

export function OnboardingHint() {
  const [isVisible, setIsVisible] = useState(true);

  const hints = [
    'Swipe right on emails to resolve them',
    'Click faces at the top to filter by person',
    'Switch contexts in the top-right corner',
    'Try Zen mode to eliminate all distractions',
    'Use the Focus Slider to adjust your view',
    'Click project bubbles to see thread maps',
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-8 z-40 max-w-sm"
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-[var(--accent-color)]/20 rounded-lg">
                <Lightbulb className="w-5 h-5 text-[var(--accent-color)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-['Instrument_Serif'] text-lg mb-1">Quick Tips</h3>
                <p className="text-xs opacity-60">Navigate your day, not just your inbox</p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="space-y-2">
              {hints.slice(0, 3).map((hint, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm opacity-80 flex items-start gap-2"
                >
                  <span className="text-[var(--accent-color)] mt-0.5">•</span>
                  <span>{hint}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}