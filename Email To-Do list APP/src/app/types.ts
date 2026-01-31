export type FocusMode = 'startup' | 'academic' | 'deep-work' | 'zen';
export type FocusSliderPosition = 'home' | 'collab' | 'junk' | 'calendar';
export type EmailBand = 'now' | 'next' | 'later';
export type Priority = 'high' | 'medium' | 'low';
export type Relationship = 'inner-circle' | 'important' | 'regular' | 'noise';

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  email: string;
  relationship: Relationship;
  contexts: string[];
}

export type IntentLabel = 'fyi' | 'action' | 'urgent' | 'social';

export interface Email {
  id: string;
  from: Contact;
  subject: string;
  preview: string;
  timestamp: Date;
  read: boolean;
  pinned: boolean;
  band: EmailBand;
  priority: Priority;
  weight: number; // 1-10, based on urgency
  hasDeadline?: Date;
  contexts: string[];
  threadId?: string;
  hasAttachment?: boolean;
  needsReply?: boolean;
  body?: string;
  intent?: IntentLabel;
  urgentJustification?: string;
  isInvite?: boolean;
  bundleId?: string;
}

export interface GhostEvent {
  id: string;
  emailId: string;
  title: string;
  suggestedDate?: Date;
  snippet: string;
  solidified: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'deep-work' | 'focus' | 'deadline';
  emailThreadId?: string;
  emailId?: string;
  participants?: Contact[];
  context: string;
  isShadow?: boolean;
  energyLevel?: 'high' | 'medium' | 'low';
}

export interface ProjectBubble {
  id: string;
  name: string;
  context: FocusMode;
  color: string;
  emailCount: number;
  nextDeadline?: Date;
  relatedContacts: Contact[];
}

export interface ThreadMap {
  projectId: string;
  nodes: ThreadNode[];
  connections: ThreadConnection[];
}

export interface ThreadNode {
  id: string;
  type: 'email' | 'meeting' | 'task';
  title: string;
  date: Date;
  status: 'completed' | 'pending' | 'upcoming';
}

export interface ThreadConnection {
  from: string;
  to: string;
}
