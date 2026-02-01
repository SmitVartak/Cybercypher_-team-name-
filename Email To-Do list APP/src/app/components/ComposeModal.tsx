import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, AlertCircle, Info, Coffee, Zap } from 'lucide-react';
import { IntentLabel } from '@/app/types';
import { toast } from 'sonner';

interface ComposeModalProps {
  onClose: () => void;
  onSend: (data: { to: string; subject: string; body: string; intent: IntentLabel; justification?: string; quiet?: boolean; tags?: string[] }) => void;
}

export function ComposeModal({ onClose, onSend }: ComposeModalProps) {
  const [step, setStep] = useState<'compose' | 'intent'>('compose');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<IntentLabel | null>(null);
  const [justification, setJustification] = useState('');
  const [quietDelivery, setQuietDelivery] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');

  const availableTags = ['meeting', 'deadline', 'research', 'school', 'startup', 'investor', 'design', 'product', 'event'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const addCustomTag = () => {
    const trimmed = customTag.trim().toLowerCase();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags(prev => [...prev, trimmed]);
      setCustomTag('');
    }
  };

  const handleInitialSend = () => {
    if (!to || !subject || !body) {
      toast.error("Please fill in all fields");
      return;
    }
    setStep('intent');
  };

  const handleFinalSend = () => {
    if (!selectedIntent) {
      toast.error("Please select a priority label");
      return;
    }

    if (selectedIntent === 'urgent' && justification.length < 10) {
      toast.error("Please provide a valid justification for urgency");
      return;
    }

    onSend({ to, subject, body, intent: selectedIntent, justification, quiet: quietDelivery, tags: selectedTags });
  };

  // Auto-enable quiet delivery for low priority intents
  const handleIntentSelect = (intent: IntentLabel) => {
      setSelectedIntent(intent);
      if (intent === 'fyi' || intent === 'social') {
          setQuietDelivery(true);
      } else {
          setQuietDelivery(false);
      }
  };

  const intents: { id: IntentLabel; label: string; icon: any; color: string; desc: string }[] = [
    { id: 'fyi', label: 'FYI', icon: Info, color: 'bg-emerald-500', desc: "No response needed. Respects focus." },
    { id: 'social', label: 'Social', icon: Coffee, color: 'bg-blue-400', desc: "Casual chat. Delivered during breaks." },
    { id: 'action', label: 'Action', icon: Zap, color: 'bg-orange-500', desc: "Requires work. Creates a Ghost Block." },
    { id: 'urgent', label: 'Urgent', icon: AlertCircle, color: 'bg-red-500', desc: "Breaks through Focus Mode." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-sm">
          <h2 className="font-['Instrument_Serif'] text-xl text-white">
            {step === 'compose' ? 'New Message' : 'Intent Shield'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <AnimatePresence mode="wait">
            {step === 'compose' ? (
              <motion.div
                key="compose"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="To"
                    className="w-full bg-white/5 border-b border-white/20 p-2 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-colors"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    autoFocus
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-white/5 border-b border-white/20 p-2 text-lg font-medium text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-colors"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />
                </div>
                
                {/* Tag Selection - Moved above textarea */}
                <div className="border-t border-b border-indigo-500/20 bg-indigo-500/5 py-4">
                  <label className="text-xs text-indigo-300 uppercase tracking-widest font-medium mb-3 block">
                    Tags (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider transition-all ${
                          selectedTags.includes(tag)
                            ? tag === 'deadline' ? 'bg-red-500/40 text-red-100 border border-red-400/60' :
                              tag === 'meeting' ? 'bg-blue-500/40 text-blue-100 border border-blue-400/60' :
                              tag === 'research' ? 'bg-purple-500/40 text-purple-100 border border-purple-400/60' :
                              tag === 'school' ? 'bg-yellow-500/40 text-yellow-100 border border-yellow-400/60' :
                              tag === 'startup' ? 'bg-green-500/40 text-green-100 border border-green-400/60' :
                              tag === 'investor' ? 'bg-orange-500/40 text-orange-100 border border-orange-400/60' :
                              tag === 'design' ? 'bg-pink-500/40 text-pink-100 border border-pink-400/60' :
                              tag === 'product' ? 'bg-cyan-500/40 text-cyan-100 border border-cyan-400/60' :
                              tag === 'event' ? 'bg-indigo-500/40 text-indigo-100 border border-indigo-400/60' :
                              'bg-white/20 text-white/90 border border-white/40'
                            : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    {/* Display custom tags */}
                    {selectedTags.filter(tag => !availableTags.includes(tag)).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wider transition-all bg-white/20 text-white/90 border border-white/40"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {/* Custom tag input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Create custom tag..."
                      value={customTag}
                      onChange={e => setCustomTag(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={addCustomTag}
                      className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div>
                  <textarea
                    placeholder="What's on your mind?"
                    className="w-full bg-transparent p-2 text-white/80 placeholder-white/40 focus:outline-none min-h-[150px] resize-none"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="intent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2 mb-8">
                  <h3 className="text-2xl font-['Instrument_Serif']">Check your intent</h3>
                  <p className="text-white/60 text-sm max-w-md mx-auto">
                    Help us protect the recipient's focus. How should this message be delivered?
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {intents.map((intent) => (
                    <button
                      key={intent.id}
                      onClick={() => handleIntentSelect(intent.id)}
                      className={`p-4 rounded-xl border transition-all text-left flex flex-col gap-3 group relative overflow-hidden ${
                        selectedIntent === intent.id
                          ? 'border-white/40 bg-white/10'
                          : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${intent.color} text-white`}>
                        <intent.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-white/90 mb-1">{intent.label}</div>
                        <div className="text-xs text-white/50">{intent.desc}</div>
                      </div>
                      
                      {selectedIntent === intent.id && (
                        <motion.div
                          layoutId="outline"
                          className="absolute inset-0 border-2 border-[var(--accent-color)] rounded-xl"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Respect Focus Toggle */}
                 <div 
                   onClick={() => setQuietDelivery(!quietDelivery)}
                   className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${quietDelivery ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                 >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${quietDelivery ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/40'}`}>
                            <span className="text-lg">🌙</span>
                        </div>
                        <div>
                            <div className="font-medium text-sm text-white/90">Quiet Delivery</div>
                            <p className="text-xs text-white/50">Delivers only when recipient is available</p>
                        </div>
                    </div>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${quietDelivery ? 'bg-indigo-500' : 'bg-white/20'}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${quietDelivery ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                 </div>

                <AnimatePresence>
                  {selectedIntent === 'urgent' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-2">
                        <label className="text-xs text-red-200 uppercase tracking-widest font-medium mb-2 block">
                          Urgency Justification Required
                        </label>
                        <textarea
                          value={justification}
                          onChange={e => setJustification(e.target.value)}
                          placeholder="Why does this need to break their flow right now?"
                          className="w-full bg-black/20 border border-red-500/20 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-red-500/50 min-h-[80px]"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
          {step === 'intent' ? (
            <button
              onClick={() => setStep('compose')}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Back to compose
            </button>
          ) : (
            <div /> // Spacer
          )}
          
          <button
            onClick={step === 'compose' ? handleInitialSend : handleFinalSend}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
          >
            {step === 'compose' ? (
              <>
                Next <ChevronRightIcon className="w-4 h-4" />
              </>
            ) : (
              <>
                 <Send className="w-4 h-4" /> 
                 {quietDelivery ? 'Send Quietly' : 'Send Now'}
                 <span className="opacity-50 text-[10px] ml-1 uppercase">
                     ({selectedIntent ? intents.find(i => i.id === selectedIntent)?.label : '...'})
                 </span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
    )
}
