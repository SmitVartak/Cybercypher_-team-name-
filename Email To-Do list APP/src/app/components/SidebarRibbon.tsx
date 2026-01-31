import { motion } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Focus, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Home,
  Users,
  Settings,
  Trash2
} from 'lucide-react';
import { FocusMode, FocusSliderPosition } from '@/app/types';
import { focusModeConfigs } from '@/app/utils/focusModes';

interface SidebarRibbonProps {
  currentMode: FocusMode;
  onModeChange: (mode: FocusMode) => void;
  sliderPosition: FocusSliderPosition;
  onSliderChange: (position: FocusSliderPosition) => void;
}

export function SidebarRibbon({
  currentMode,
  onModeChange,
  sliderPosition,
  onSliderChange,
}: SidebarRibbonProps) {

  const modes: { value: FocusMode; icon: any }[] = [
    { value: 'startup', icon: Briefcase },
    { value: 'academic', icon: GraduationCap },
    { value: 'deep-work', icon: Focus },
  ];

  const positions: { value: FocusSliderPosition; icon: any; label: string }[] = [
    { value: 'home', icon: Home, label: 'Home' },
    { value: 'collab', icon: Users, label: 'Collab' },
    { value: 'junk', icon: Trash2, label: 'Junk' },
  ];

  return (
    <div className="sticky top-0 left-0 h-screen w-16 flex flex-col items-center py-6 bg-black/60 backdrop-blur-xl border-r border-white/10 z-50 flex-shrink-0">
      
      {/* Top: Timeline Page Button */}
      <div className="mb-8">
        <RibbonButton 
            onClick={() => onSliderChange('calendar')}
            isActive={sliderPosition === 'calendar'}
            icon={CalendarIcon}
            label="Full Timeline"
            accentColor="var(--accent-color)"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1 w-full flex flex-col items-center gap-8">
        
        {/* Context Modes (formerly ContextSwitcher) */}
        <div className="flex flex-col gap-4 w-full items-center">
             <div className="h-px w-8 bg-white/10" />
             {modes.map(mode => (
                 <RibbonButton
                    key={mode.value}
                    onClick={() => onModeChange(mode.value)}
                    isActive={currentMode === mode.value}
                    icon={mode.icon}
                    label={focusModeConfigs[mode.value].name}
                    accentColor={focusModeConfigs[mode.value].accentColor}
                 />
             ))}
             {/* Zen Mode Special Case */}
             <div className="h-px w-8 bg-white/10" />
             <RibbonButton
                onClick={() => onModeChange('zen')}
                isActive={currentMode === 'zen'}
                icon={Sparkles}
                label="Zen Mode"
                accentColor="#fbbf24" // amber-400
             />
        </div>
      </div>

      {/* Bottom: Layout/Slider Modes */}
      <div className="mt-auto flex flex-col gap-4 w-full items-center">
         <div className="h-px w-8 bg-white/10" />
         {positions.map(pos => (
             <RibbonButton
                key={pos.value}
                onClick={() => onSliderChange(pos.value)}
                isActive={sliderPosition === pos.value}
                icon={pos.icon}
                label={pos.label}
                accentColor="white"
                size="sm"
             />
         ))}
         
         <div className="h-px w-8 bg-white/10 mt-2" />
         <button 
           className="p-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors"
           title="Settings"
           aria-label="Settings"
         >
            <Settings className="w-5 h-5" />
         </button>
      </div>
    </div>
  );
}

function RibbonButton({ 
    onClick, 
    isActive, 
    icon: Icon, 
    label, 
    accentColor,
    size = 'md'
}: { 
    onClick: () => void;
    isActive: boolean;
    icon: any;
    label: string;
    accentColor: string;
    size?: 'sm' | 'md';
}) {
    return (
        <motion.button
            onClick={onClick}
            className={`relative group rounded-xl flex items-center justify-center transition-all ${
                size === 'sm' ? 'p-2' : 'p-3'
            } ${isActive ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {isActive && (
                <motion.div
                    layoutId={`active-indicator-${size}`}
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}
            
            {isActive && (
                <div 
                    className="absolute inset-0 opacity-20 blur-md rounded-full"
                    style={{ backgroundColor: accentColor }}
                />
            )}

            <Icon className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} relative z-10`} />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-2 py-1 bg-black/80 backdrop-blur-md rounded border border-white/10 text-xs text-white opacity-0 whitespace-nowrap pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                {label}
            </div>
        </motion.button>
    )
}
