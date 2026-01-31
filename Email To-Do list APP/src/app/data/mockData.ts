import { Contact, Email, GhostEvent, CalendarEvent, ProjectBubble, ThreadMap } from '@/app/types';

export const mockContacts: Contact[] = [
  {
    id: 'c1',
    name: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'priya@startup.io',
    relationship: 'inner-circle',
    contexts: ['startup'],
  },
  {
    id: 'c2',
    name: 'Prof. Venkatesh Iyer',
    avatar: 'https://i.pravatar.cc/150?img=11',
    email: 'iyer@university.edu',
    relationship: 'inner-circle',
    contexts: ['academic'],
  },
  {
    id: 'c3',
    name: 'Arjun Mehta',
    avatar: 'https://i.pravatar.cc/150?img=60',
    email: 'arjun@techventures.com',
    relationship: 'important',
    contexts: ['startup'],
  },
  {
    id: 'c4',
    name: 'Dr. Anjali Desai',
    avatar: 'https://i.pravatar.cc/150?img=20',
    email: 'desai@university.edu',
    relationship: 'important',
    contexts: ['academic'],
  },
  {
    id: 'c5',
    name: 'Rohan Gupta',
    avatar: 'https://i.pravatar.cc/150?img=59',
    email: 'rohan@design.co',
    relationship: 'regular',
    contexts: ['startup'],
  },
  {
    id: 'c6',
    name: 'Vikram Singh',
    avatar: 'https://i.pravatar.cc/150?img=3',
    email: 'vikram@startup.io',
    relationship: 'inner-circle',
    contexts: ['startup'],
  },
  {
    id: 'c7',
    name: 'Kavita Patel',
    avatar: 'https://i.pravatar.cc/150?img=49',
    email: 'kavita@university.edu',
    relationship: 'important',
    contexts: ['academic'],
  },
  {
    id: 'c8',
    name: 'Rahul Nair',
    avatar: 'https://i.pravatar.cc/150?img=53',
    email: 'rahul@deepwork.co',
    relationship: 'regular',
    contexts: ['startup', 'academic'],
  },
];

export const mockEmails: Email[] = [
  {
    id: 'e1',
    from: mockContacts[0],
    subject: 'Seed Round: Investor Meeting Tomorrow',
    preview: 'Hey! Can we sync before the investor pitch at 2pm? I have some updates on the deck...',
    timestamp: new Date(2026, 0, 31, 9, 30),
    read: false,
    pinned: false,
    band: 'now',
    priority: 'high',
    weight: 9,
    hasDeadline: new Date(2026, 1, 1, 14, 0),
    contexts: ['startup'],
    bundleId: 'seed-round',
    threadId: 't1',
    needsReply: true,
    body: `Hey Team,

I've reviewed the latest version of the pitch deck, and it's 90% there. However, we need to tighten up the [[User Acquisition]] slide before [[tomorrow's meeting at 2:00 PM]].

Can we have a [[quick sync at 9:30 AM]] today to finalize these changes? I want to make sure we're fully aligned before we present to the partners.

Also, please review the [[attached financial projections]] one last time.

Best,
Priya`,
  },
  {
    id: 'e2',
    from: mockContacts[1],
    subject: 'Research Paper Feedback',
    preview: 'Kartik, reviewed your draft. The methodology section needs work. Let\'s discuss next week.',
    timestamp: new Date(2026, 0, 30, 16, 45),
    read: false,
    pinned: false,
    band: 'now',
    priority: 'high',
    weight: 8,
    hasDeadline: new Date(2026, 1, 5),
    contexts: ['academic'],
    bundleId: 'thesis-research',
    threadId: 't2',
    needsReply: true,
    body: `Hi Kartik,

I've gone through your draft for the upcoming conference. Overall, the premise is strong, but the [[methodology section needs significant work]]. You're making some assumptions about the dataset that aren't clearly justified.

Let's discuss this during our next office hours. I'm available [[next Tuesday or Wednesday afternoon]].

Please send me the [[revised citations by Friday]].

Regards,
Prof. Iyer`,
  },
  {
    id: 'e3',
    from: mockContacts[2],
    subject: 'Product Roadmap Q1 Review',
    preview: 'The roadmap looks solid. Few questions on the timeline for feature releases...',
    timestamp: new Date(2026, 0, 31, 11, 15),
    read: false,
    pinned: false,
    band: 'now',
    priority: 'medium',
    weight: 6,
    contexts: ['startup'],
    bundleId: 'seed-round',
    threadId: 't3',
    isInvite: true,
    body: `Kartik,

The [[Q1 roadmap]] looks solid. I especially like the focus on mobile optimization.

However, I have a few questions regarding the timeline for the "Smart Sync" feature. Are we confident we can ship that by [[mid-February]] given the current backend constraints?

Let's review this in detail [[later this week]].

Cheers,
Arjun`,
  },
  {
    id: 'e4',
    from: mockContacts[3],
    subject: 'Thesis Committee Meeting',
    preview: 'We should schedule your committee meeting for mid-February. What\'s your availability?',
    timestamp: new Date(2026, 0, 29, 10, 20),
    read: true,
    pinned: true,
    band: 'next',
    priority: 'medium',
    weight: 7,
    contexts: ['academic'],
    bundleId: 'thesis-research',
    threadId: 't4',
    body: `Hello Kartik,

We need to finalize scheduling your [[thesis committee meeting]]. [[Mid-February]] would be ideal as it gives you enough time to incorporate the feedback from the preliminary review.

Please send me your availability for the [[weeks of Feb 9th and Feb 16th]]. 

Best,
Dr. Desai`,
  },
  {
    id: 'e5',
    from: mockContacts[4],
    subject: 'UI Design Review',
    preview: 'Attached mockups for the new dashboard. Thoughts?',
    timestamp: new Date(2026, 0, 28, 14, 30),
    read: true,
    pinned: false,
    band: 'next',
    priority: 'medium',
    weight: 5,
    contexts: ['startup'],
    hasAttachment: true,
    threadId: 't5',
    body: `Hey!,

Attached are the [[high-fidelity mockups]] for the new user dashboard. I went with a cleaner, more modular approach as we discussed.

Let me know what you think about the [[color palette]] – tried to keep it consistent with the new brand guidelines.

Best,
Rohan`,
  },
  {
    id: 'e6',
    from: { id: 'c6', name: 'Newsletter Bot', avatar: '', email: 'noreply@tech.news', relationship: 'noise', contexts: [] },
    subject: 'Weekly Tech Digest',
    preview: 'Top stories this week: AI breakthroughs, startup funding rounds...',
    timestamp: new Date(2026, 0, 27, 8, 0),
    read: false,
    pinned: false,
    band: 'later',
    priority: 'low',
    weight: 2,
    contexts: [],
    threadId: 't6',
    body: `Your Weekly Tech Digest

1. **AI Breakthroughs**: New models showing promising results in reasoning tasks.
2. **Startup Funding**: Global venture funding hits a 6-month high.
3. **Hardware News**: The latest chips from silicon valley promise 2x efficiency.

Click here to read the full report.`,
  },
  {
    id: 'e7',
    from: mockContacts[0],
    subject: 'Team Standup Notes',
    preview: 'Quick recap from today\'s standup. Marketing launch is on track for next Friday...',
    timestamp: new Date(2026, 0, 31, 17, 0),
    read: true,
    pinned: false,
    band: 'later',
    priority: 'low',
    weight: 3,
    contexts: ['startup'],
    threadId: 't7',
    body: `Team,

Notes from [[today's standup]]:

* **Marketing**: Launch campaign is on track for [[next Friday]]. Ad creatives are finalized.
* **Engineering**: Backend migration is [[70% complete]]. No major blockers.
* **Design**: Final polish on the mobile app UI is ongoing.

Action items:
- @Vikram: [[Review copy]] for the landing page.
- @Priya: Sign off on the [[budget for the launch party]].

Thanks,
Priya`,
  },
  {
    id: 'e8',
    from: { id: 'c6', name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?img=3', email: 'vikram@startup.io', relationship: 'inner-circle', contexts: ['startup'] },
    subject: 'New User Acquisition Strategy',
    preview: 'I have some ideas for outlining the new user acquisition strategy. Can we brainstorm?',
    timestamp: new Date(2026, 0, 31, 13, 0),
    read: false,
    pinned: true,
    band: 'now',
    priority: 'high',
    weight: 8,
    contexts: ['startup'],
    bundleId: 'seed-round',
    hasDeadline: new Date(2026, 0, 31, 16, 0),
    needsReply: true,
    body: `Hi everyone,

I've been thinking about our user acquisition funnel, and I believe we're missing a [[huge opportunity in organic search]].

I've outlined a few ideas for a new content strategy that targets long-tail keywords. I'd love to brainstorm this with you all.

Are you free for a [[30-min sync at 2:00 PM today]]?

Thanks,
Vikram`,
  },
  {
    id: 'e9',
    from: { id: 'c7', name: 'Kavita Patel', avatar: 'https://i.pravatar.cc/150?img=49', email: 'kavita@university.edu', relationship: 'important', contexts: ['academic'] },
    subject: 'Lab Equipment Grant',
    preview: 'The grant application for the new lab equipment is due next week. Need your input on the budget.',
    timestamp: new Date(2026, 0, 31, 10, 0),
    read: false,
    pinned: false,
    band: 'next',
    priority: 'medium',
    weight: 6,
    contexts: ['academic'],
    bundleId: 'thesis-research',
    body: `Hi Kartik,

The [[deadline for the lab equipment grant]] is fast approaching. I'm finalizing the budget proposal now.

Could you please [[double-check the line items]] for the GPU server? I want to make sure we're accounting for the educational discount.

Need this by [[tomorrow morning]].

Best,
Kavita`,
  },
  {
    id: 'e10',
    from: { id: 'c8', name: 'Rahul Nair', avatar: 'https://i.pravatar.cc/150?img=53', email: 'rahul@deepwork.co', relationship: 'regular', contexts: ['startup', 'academic'] },
    subject: 'Deep Work Session Invite',
    preview: 'Planning a deep work session for the team. Join us?',
    timestamp: new Date(2026, 0, 31, 9, 0),
    read: true,
    pinned: false,
    band: 'later',
    priority: 'low',
    weight: 4,
    contexts: ['startup'],
    body: `Hey team,

I'm blocking out some [[deep work time tomorrow morning]] from [[9 AM to 12 PM]]. I'll be working on the core notification engine refactor.

Feel free to join me in "Do Not Disturb" mode if you have focused tasks to knock out!

Cheers,
Rahul`,
  },
];

export const mockGhostEvents: GhostEvent[] = [
  {
    id: 'g1',
    emailId: 'e1',
    title: 'Investor Pitch Prep',
    suggestedDate: new Date(2026, 1, 1, 13, 0),
    snippet: 'Can we sync before the investor pitch at 2pm?',
    solidified: false,
  },
  {
    id: 'g2',
    emailId: 'e4',
    title: 'Thesis Committee Meeting',
    snippet: 'We should schedule your committee meeting for mid-February',
    solidified: false,
  },
  {
    id: 'g3',
    emailId: 'e8',
    title: 'Brainstorm: User Acquisition',
    suggestedDate: new Date(2026, 0, 31, 14, 0), // 2 PM
    snippet: 'I have some ideas for outlining the new user acquisition strategy.',
    solidified: false,
  },
  {
    id: 'g4',
    emailId: 'e9',
    title: 'Budget Review: Lab Grant',
    suggestedDate: new Date(2026, 0, 31, 11, 0), // 11 AM
    snippet: 'The grant application is due next week. Need your input on the budget.',
    solidified: false,
  },
  {
    id: 'g5',
    emailId: 'e10',
    title: 'Team Deep Work',
    suggestedDate: new Date(2026, 0, 31, 9, 0), // 9 AM
    snippet: 'Planning a deep work session for the team.',
    solidified: false,
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'cal1',
    title: 'Deep Work: Research Paper',
    start: new Date(2026, 0, 31, 9, 0),
    end: new Date(2026, 0, 31, 12, 0),
    type: 'deep-work',
    context: 'academic',
  },
  {
    id: 'cal2',
    title: 'Investor Pitch',
    start: new Date(2026, 1, 1, 14, 0),
    end: new Date(2026, 1, 1, 15, 30),
    type: 'meeting',
    participants: [mockContacts[0], mockContacts[2]],
    context: 'startup',
    emailThreadId: 't1',
  },
  {
    id: 'cal3',
    title: 'Focus: Product Strategy',
    start: new Date(2026, 1, 2, 10, 0),
    end: new Date(2026, 1, 2, 12, 0),
    type: 'focus',
    context: 'startup',
  },
  {
    id: 'cal4',
    title: 'Sync w/ Vikram',
    start: new Date(2026, 0, 31, 16, 0),
    end: new Date(2026, 0, 31, 16, 30),
    type: 'meeting',
    context: 'startup',
  },
  {
    id: 'cal5',
    title: 'Grant Writing Workshop',
    start: new Date(2026, 0, 31, 18, 0),
    end: new Date(2026, 0, 31, 19, 30),
    type: 'deep-work',
    context: 'academic',
  },
  // Shadow Events (Ghost Blocks)
  {
    id: 'shadow1',
    title: 'Reply: Investor Pitch',
    start: new Date(2026, 0, 31, 13, 0),
    end: new Date(2026, 0, 31, 14, 0), // 1 hour estimate
    type: 'focus',
    context: 'startup',
    isShadow: true,
    emailThreadId: 't1'
  },
  {
    id: 'shadow2',
    title: 'Review: Research Paper',
    start: new Date(2026, 0, 31, 15, 0),
    end: new Date(2026, 0, 31, 16, 0), // 1 hour estimate
    type: 'focus',
    context: 'academic',
    isShadow: true,
    emailThreadId: 't2'
  }
];

export const mockProjectBubbles: ProjectBubble[] = [
  {
    id: 'p1',
    name: 'Seed Round',
    context: 'startup',
    color: '#6366F1',
    emailCount: 12,
    nextDeadline: new Date(2026, 1, 1, 14, 0),
    relatedContacts: [mockContacts[0], mockContacts[2]],
  },
  {
    id: 'p2',
    name: 'Product Launch',
    context: 'startup',
    color: '#8B5CF6',
    emailCount: 8,
    nextDeadline: new Date(2026, 1, 7),
    relatedContacts: [mockContacts[4]],
  },
  {
    id: 'p3',
    name: 'Thesis Research',
    context: 'academic',
    color: '#92400E',
    emailCount: 5,
    nextDeadline: new Date(2026, 1, 5),
    relatedContacts: [mockContacts[1], mockContacts[3]],
  },
];

export const mockThreadMap: ThreadMap = {
  projectId: 'p1',
  nodes: [
    {
      id: 'n1',
      type: 'meeting',
      title: 'Kickoff Meeting',
      date: new Date(2026, 0, 15),
      status: 'completed',
    },
    {
      id: 'n2',
      type: 'email',
      title: 'Pitch Deck Draft',
      date: new Date(2026, 0, 18),
      status: 'completed',
    },
    {
      id: 'n3',
      type: 'task',
      title: 'Financial Projections',
      date: new Date(2026, 0, 25),
      status: 'completed',
    },
    {
      id: 'n4',
      type: 'email',
      title: 'Investor Meeting Tomorrow',
      date: new Date(2026, 0, 31),
      status: 'pending',
    },
    {
      id: 'n5',
      type: 'meeting',
      title: 'Investor Pitch',
      date: new Date(2026, 1, 1),
      status: 'upcoming',
    },
  ],
  connections: [
    { from: 'n1', to: 'n2' },
    { from: 'n2', to: 'n3' },
    { from: 'n3', to: 'n4' },
    { from: 'n4', to: 'n5' },
  ],
};
