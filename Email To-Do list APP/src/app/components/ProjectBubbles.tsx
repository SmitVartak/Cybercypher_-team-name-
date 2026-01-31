import { ProjectBubble } from '@/app/types';
import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { Calendar } from 'lucide-react';

interface ProjectBubblesProps {
  projects: ProjectBubble[];
  onProjectClick: (projectId: string) => void;
}

export function ProjectBubbles({ projects, onProjectClick }: ProjectBubblesProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xs uppercase tracking-widest opacity-50 mb-3">Active Projects</h3>
      <div className="flex flex-wrap gap-3">
        {projects.map(project => (
          <motion.button
            key={project.id}
            onClick={() => onProjectClick(project.id)}
            className="relative group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glassmorphism bubble */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3">
                {/* Color indicator */}
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                
                <div className="text-left">
                  <h4 className="font-['Instrument_Serif'] text-lg mb-0.5">
                    {project.name}
                  </h4>
                  <div className="flex items-center gap-3 text-xs opacity-60">
                    <span>{project.emailCount} messages</span>
                    {project.nextDeadline && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDistanceToNow(project.nextDeadline, { addSuffix: true })}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Avatars */}
              {project.relatedContacts.length > 0 && (
                <div className="flex -space-x-2 mt-3">
                  {project.relatedContacts.slice(0, 3).map(contact => (
                    <img
                      key={contact.id}
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-6 h-6 rounded-full border-2 border-white/20"
                    />
                  ))}
                  {project.relatedContacts.length > 3 && (
                    <div className="w-6 h-6 rounded-full border-2 border-white/20 bg-white/20 flex items-center justify-center text-xs">
                      +{project.relatedContacts.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ambient glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity -z-10"
              style={{ backgroundColor: project.color }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
