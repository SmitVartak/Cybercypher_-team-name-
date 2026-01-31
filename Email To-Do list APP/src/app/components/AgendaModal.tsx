import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, User, Clock, Check } from 'lucide-react';
import { toast } from 'sonner';

interface AgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
  initialHour?: number;
}

export function AgendaModal({ isOpen, onClose, initialDate, initialHour }: AgendaModalProps) {
  const [agenda, setAgenda] = useState('');
  const [person, setPerson] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (isOpen && initialDate && initialHour !== undefined) {
      // Format time as HH:00
      const formattedTime = `${initialHour.toString().padStart(2, '0')}:00`;
      setTime(formattedTime);
      setAgenda('');
      setPerson('');
    }
  }, [isOpen, initialDate, initialHour]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agenda || !person || !time) {
      toast.error("Please fill in all fields");
      return;
    }

    // Here you would typically save the event to your backend/state
    toast.success("Agenda Scheduled", {
      description: `${agenda} with ${person} at ${time}`
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
            <div>
                <h2 className="font-['Instrument_Serif'] text-xl text-white">Schedule Agenda</h2>
                <p className="text-xs text-white/50">
                    {initialDate?.toLocaleDateString()}
                </p>
            </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X className="w-5 h-5 opacity-70" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Agenda Input */}
            <div className="space-y-1.5">
                <label className="text-xs text-white/50 uppercase tracking-widest font-medium pl-1">Agenda</label>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[var(--accent-color)] transition-colors">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <input 
                        type="text" 
                        value={agenda}
                        onChange={(e) => setAgenda(e.target.value)}
                        placeholder="What's the plan?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20"
                        autoFocus
                    />
                </div>
            </div>

            {/* Person Input */}
            <div className="space-y-1.5">
                <label className="text-xs text-white/50 uppercase tracking-widest font-medium pl-1">With Whom?</label>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[var(--accent-color)] transition-colors">
                        <User className="w-4 h-4" />
                    </div>
                    <input 
                        type="text" 
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                        placeholder="Name of person(s)"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20"
                    />
                </div>
            </div>

            {/* Time Input */}
            <div className="space-y-1.5">
                <label className="text-xs text-white/50 uppercase tracking-widest font-medium pl-1">Time</label>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[var(--accent-color)] transition-colors">
                        <Clock className="w-4 h-4" />
                    </div>
                    <input 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20" // default time input visual might vary by browser, but works
                    />
                </div>
            </div>

            <button 
                type="submit"
                className="w-full py-3 bg-[var(--accent-color)] text-white font-medium rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-4"
            >
                <Check className="w-4 h-4" />
                Confirm Schedule
            </button>
        </form>

      </motion.div>
    </div>
  );
}
