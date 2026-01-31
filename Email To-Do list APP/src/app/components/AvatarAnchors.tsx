import { Contact } from '@/app/types';
import { motion } from 'motion/react';

interface AvatarAnchorsProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (contactId: string | null) => void;
}

export function AvatarAnchors({ contacts, selectedContactId, onSelectContact }: AvatarAnchorsProps) {
  const innerCircle = contacts.filter(c => c.relationship === 'inner-circle');

  return (
    <div className="flex items-center gap-3 mb-6">
      <motion.button
        onClick={() => onSelectContact(null)}
        className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
          selectedContactId === null
            ? 'bg-[var(--accent-color)] text-white'
            : 'bg-white/30 backdrop-blur-md text-current opacity-60 hover:opacity-100'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        All
      </motion.button>
      {innerCircle.map(contact => (
        <motion.button
          key={contact.id}
          onClick={() => onSelectContact(contact.id)}
          className={`relative group ${
            selectedContactId === contact.id ? 'ring-2 ring-[var(--accent-color)]' : ''
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={contact.name}
        >
          <div className={`w-12 h-12 rounded-full overflow-hidden transition-all ${
            selectedContactId === contact.id
              ? 'shadow-lg shadow-[var(--accent-color)]/50'
              : 'opacity-70 hover:opacity-100'
          }`}>
            <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
          </div>
          {selectedContactId === contact.id && (
            <motion.div
              className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-[var(--accent-color)]"
              layoutId="activeIndicator"
              style={{ x: '-50%' }}
            />
          )}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            {contact.name.split(' ')[0]}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
