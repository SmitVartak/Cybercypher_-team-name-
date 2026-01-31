import { motion } from 'motion/react';

interface AmbientNotificationProps {
  count: number;
}

export function AmbientNotification({ count }: AmbientNotificationProps) {
  if (count === 0) return null;

  return (
    <motion.div
      className="fixed top-8 left-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="relative"
        animate={{
          boxShadow: [
            '0 0 20px rgba(var(--accent-color-rgb), 0.3)',
            '0 0 30px rgba(var(--accent-color-rgb), 0.5)',
            '0 0 20px rgba(var(--accent-color-rgb), 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="bg-[var(--accent-color)] text-white rounded-full w-10 h-10 flex items-center justify-center font-['Inter'] font-medium shadow-lg">
          {count}
        </div>
      </motion.div>
      <p className="text-xs mt-2 opacity-60 text-center uppercase tracking-wider">New</p>
    </motion.div>
  );
}
