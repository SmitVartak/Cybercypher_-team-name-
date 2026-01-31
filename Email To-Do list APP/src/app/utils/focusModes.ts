import { FocusMode } from '@/app/types';

export interface FocusModeConfig {
  name: string;
  primaryBg: string;
  accentColor: string;
  textColor: string;
  vibe: string;
  description: string;
}

export const focusModeConfigs: Record<FocusMode, FocusModeConfig> = {
  'startup': {
    name: 'Startup Mode',
    primaryBg: '#F8FAFC',
    accentColor: '#6366F1',
    textColor: '#0F172A',
    vibe: 'Professional, energetic.',
    description: 'High-stakes work, investor updates, and team collaboration.',
  },
  'academic': {
    name: 'Academic Mode',
    primaryBg: '#FDFCF7',
    accentColor: '#92400E',
    textColor: '#1C1917',
    vibe: 'Calm, grounding, studious.',
    description: 'Research, thesis work, and scholarly communication.',
  },
  'deep-work': {
    name: 'Career Mode',
    primaryBg: '#0F172A',
    accentColor: '#38BDF8',
    textColor: '#F8FAFC',
    vibe: 'High contrast, hyper-focus.',
    description: 'Distraction-free environment for intensive focus.',
  },
  'zen': {
    name: 'Zen Mode',
    primaryBg: '#1E1E1E',
    accentColor: '#FDE047',
    textColor: '#FAFAF9',
    vibe: 'Low eye strain, warm.',
    description: 'Evening wind-down with minimal distractions.',
  },
};

export const getFocusModeStyles = (mode: FocusMode) => {
  const config = focusModeConfigs[mode];
  return {
    backgroundColor: config.primaryBg,
    color: config.textColor,
    '--accent-color': config.accentColor,
  };
};
