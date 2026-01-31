import { FocusMode } from '@/app/types';
import { motion } from 'motion/react';
import { focusModeConfigs } from '@/app/utils/focusModes';
import { Briefcase, GraduationCap, Focus, Sparkles } from 'lucide-react';

interface ContextSwitcherProps {
  currentMode: FocusMode;
  onModeChange: (mode: FocusMode) => void;
}

export function ContextSwitcher({ currentMode, onModeChange }: ContextSwitcherProps) {
  const modes: { value: FocusMode; icon: any }[] = [
    { value: 'startup', icon: Briefcase },
    { value: 'academic', icon: GraduationCap },
    { value: 'deep-work', icon: Focus },
    { value: 'zen', icon: Sparkles },
  ];

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-2 py-2 shadow-xl border border-white/20">
        {modes.map(mode => {
          const Icon = mode.icon;
          const isActive = mode.value === currentMode;
          const config = focusModeConfigs[mode.value];
          return (
            <motion.button
              key={mode.value}
              onClick={() => onModeChange(mode.value)}
              className={`relative p-3 rounded-full transition-all ${
                isActive ? 'text-white' : 'text-current opacity-50 hover:opacity-80'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={config.name}
            >
              {isActive && (
                <motion.div
                  layoutId="contextBg"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: config.accentColor }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
