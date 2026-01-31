import { FocusSliderPosition } from '@/app/types';
import { motion } from 'motion/react';
import { Zap, Scale, Users } from 'lucide-react';

interface FocusSliderProps {
  position: FocusSliderPosition;
  onChange: (position: FocusSliderPosition) => void;
}

export function FocusSlider({ position, onChange }: FocusSliderProps) {
  const positions: { value: FocusSliderPosition; label: string; icon: any }[] = [
    { value: 'flow', label: 'Flow', icon: Zap },
    { value: 'balance', label: 'Balance', icon: Scale },
    { value: 'collab', label: 'Collab', icon: Users },
  ];

  const currentIndex = positions.findIndex(p => p.value === position);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-full px-2 py-2 shadow-2xl border border-white/20">
        <div className="flex items-center gap-1 relative">
          {positions.map((pos, index) => {
            const Icon = pos.icon;
            const isActive = pos.value === position;
            return (
              <motion.button
                key={pos.value}
                onClick={() => onChange(pos.value)}
                className={`relative px-6 py-3 rounded-full text-sm transition-colors ${
                  isActive ? 'text-white' : 'text-current opacity-50 hover:opacity-80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="focusSliderBg"
                    className="absolute inset-0 bg-[var(--accent-color)] rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="uppercase tracking-wider">{pos.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
