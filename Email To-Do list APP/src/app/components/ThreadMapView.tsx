import { ThreadMap } from '@/app/types';
import { motion } from 'motion/react';
import { Mail, Calendar, CheckSquare, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface ThreadMapViewProps {
  threadMap: ThreadMap;
  onClose: () => void;
}

export function ThreadMapView({ threadMap, onClose }: ThreadMapViewProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return Mail;
      case 'meeting':
        return Calendar;
      case 'task':
        return CheckSquare;
      default:
        return Mail;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 border-green-500/40 text-green-300';
      case 'pending':
        return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300';
      case 'upcoming':
        return 'bg-blue-500/20 border-blue-500/40 text-blue-300';
      default:
        return 'bg-white/10 border-white/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg" />

      {/* Thread Map */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-12 max-w-5xl w-full border border-white/20 shadow-2xl overflow-auto max-h-[80vh]"
      >
        <div className="mb-8">
          <h2 className="font-['Instrument_Serif'] text-3xl mb-2">Thread Map</h2>
          <p className="text-sm opacity-60">Visualizing the lineage of your project</p>
        </div>

        {/* Mind Map */}
        <div className="relative">
          {threadMap.nodes.map((node, index) => {
            const Icon = getIcon(node.type);
            const isLast = index === threadMap.nodes.length - 1;
            
            return (
              <div key={node.id} className="mb-8 last:mb-0">
                <div className="flex items-start gap-4">
                  {/* Node */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex-1 p-6 rounded-2xl border ${getStatusColor(node.status)}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white/10 rounded-xl">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-['Inter'] font-medium text-lg">
                            {node.title}
                          </h4>
                          <span className="text-xs uppercase tracking-wider opacity-60">
                            {node.type}
                          </span>
                        </div>
                        <p className="text-sm opacity-70">
                          {format(node.date, 'MMM d, yyyy')}
                        </p>
                        <div className="mt-2 inline-block px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-wider">
                          {node.status}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Connection arrow */}
                {!isLast && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 32 }}
                    transition={{ delay: index * 0.1 + 0.05 }}
                    className="ml-20 my-2 flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5 opacity-40 rotate-90" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm uppercase tracking-wider transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
