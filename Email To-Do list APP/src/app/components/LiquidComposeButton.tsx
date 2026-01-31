import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface LiquidComposeButtonProps {
  onClick: () => void;
}

export function LiquidComposeButton({ onClick }: LiquidComposeButtonProps) {
  return (
    <motion.div
      className="fixed bottom-10 right-8 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <button
        onClick={onClick}
        className="p-5 bg-[var(--accent-color)] text-white rounded-full shadow-2xl hover:shadow-[var(--accent-color)]/50 transition-all flex items-center justify-center"
        aria-label="Compose new message"
      >
        <Plus className="w-8 h-8" />
      </button>
    </motion.div>
  );
}
