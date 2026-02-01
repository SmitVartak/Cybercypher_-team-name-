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
  // ═══════════════════════════════════════════════════════════════════════════
  // STARTUP MODE - Investor meetings, product work, team coordination
  // ═══════════════════════════════════════════════════════════════════════════
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
    tags: ['meeting', 'deadline', 'startup', 'investor'],
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
    tags: ['startup', 'product', 'deadline'],
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
    tags: ['design', 'startup'],
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
    tags: ['meeting', 'startup'],
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
    tags: ['meeting', 'startup', 'deadline'],
  },
  {
    id: 'e11',
    from: mockContacts[0],
    subject: 'Monday Morning Standup Agenda',
    preview: 'Here is the agenda for our 9 AM standup. Please review before the call...',
    timestamp: new Date(2026, 0, 26, 8, 30),
    read: true,
    pinned: false,
    band: 'later',
    priority: 'medium',
    weight: 5,
    contexts: ['startup'],
    body: `Team,

Agenda for [[Monday's 9 AM Standup]]:

1. Sprint velocity check
2. Blocker review
3. Demo preparation for investor call

Please come prepared with your updates!

Best,
Priya`,
    tags: ['meeting', 'startup'],
  },
  {
    id: 'e12',
    from: mockContacts[2],
    subject: 'Quarterly Board Deck - Need Your Section',
    preview: 'The board deck is coming together. I need your product metrics section by EOD Tuesday...',
    timestamp: new Date(2026, 0, 26, 11, 30),
    read: false,
    pinned: true,
    band: 'now',
    priority: 'high',
    weight: 9,
    hasDeadline: new Date(2026, 0, 27, 18, 0),
    contexts: ['startup'],
    needsReply: true,
    body: `Hi,

The [[quarterly board deck]] is shaping up well. However, I still need your [[product metrics section]].

Key items to include:
- MAU growth (month over month)
- Retention cohorts
- NPS trend

[[Deadline: Tuesday 6 PM]]

Thanks,
Arjun`,
    tags: ['deadline', 'startup'],
  },
  {
    id: 'e15',
    from: mockContacts[2],
    subject: 'VC Partner Meeting Prep',
    preview: 'Sequoia partner wants a 30-min call tomorrow. Here are the talking points...',
    timestamp: new Date(2026, 0, 28, 9, 0),
    read: false,
    pinned: true,
    band: 'now',
    priority: 'high',
    weight: 9,
    contexts: ['startup'],
    bundleId: 'seed-round',
    needsReply: true,
    body: `URGENT

The [[Sequoia partner call]] is tomorrow at 10 AM. Here are the key talking points:

1. **Traction**: 150% MoM growth in active users
2. **Market Size**: $4.2B addressable market
3. **Differentiation**: AI-first approach to email productivity
4. **Ask**: $3M seed round at $15M pre-money

Please review and add any missing points by [[today EOD]].

Arjun`,
    tags: ['meeting', 'investor', 'deadline', 'startup'],
  },
  {
    id: 'e17',
    from: mockContacts[4],
    subject: 'Design System v2.0 Ready for Review',
    preview: 'The new design system is complete. Includes dark mode, accessibility improvements...',
    timestamp: new Date(2026, 0, 29, 10, 30),
    read: true,
    pinned: false,
    band: 'next',
    priority: 'medium',
    weight: 5,
    contexts: ['startup'],
    body: `Hey team,

The [[Design System v2.0]] is ready for review!

New features:
- Full dark mode support
- WCAG 2.1 AA accessibility compliance
- Micro-interactions library
- Updated component documentation

Figma link attached. Please review during [[today's design review at 10 AM]].

Cheers,
Rohan`,
    tags: ['meeting', 'design', 'startup'],
  },
  {
    id: 'e18',
    from: mockContacts[5],
    subject: 'Sprint Retrospective Action Items',
    preview: 'Here are the action items from yesterday sprint retro. Please review and acknowledge...',
    timestamp: new Date(2026, 0, 29, 11, 0),
    read: true,
    pinned: false,
    band: 'later',
    priority: 'low',
    weight: 3,
    contexts: ['startup'],
    body: `Team,

Action items from [[Thursday's sprint retro]]:

1. @Vikram: Set up automated testing pipeline - [[Due Monday]]
2. @Rohan: Create component documentation - [[Due Wednesday]]
3. @Rahul: Address tech debt in notification service - [[Due Friday]]

Let's make this sprint count!

Vikram`,
    tags: ['meeting', 'deadline', 'startup'],
  },
  {
    id: 'e19',
    from: mockContacts[0],
    subject: 'Investor Pitch Final Deck - REVIEW NEEDED',
    preview: 'Attached is the final deck for the 2 PM investor pitch. Please review slides 8-12...',
    timestamp: new Date(2026, 0, 30, 10, 0),
    read: false,
    pinned: true,
    band: 'now',
    priority: 'high',
    weight: 10,
    hasDeadline: new Date(2026, 0, 30, 14, 0),
    contexts: ['startup'],
    bundleId: 'seed-round',
    needsReply: true,
    body: `FINAL REVIEW NEEDED

The [[investor pitch]] is at [[2:00 PM TODAY]]. Please review:

- Slides 8-12: Financial projections
- Slide 15: Team bios
- Slide 18: Use of funds

We have [[ONE SHOT]] at this. Let's nail it!

Priya`,
    tags: ['meeting', 'deadline', 'investor', 'startup'],
  },
  {
    id: 'e21',
    from: mockContacts[7],
    subject: 'Weekend Hackathon Invite',
    preview: 'Building something cool this weekend? Join our virtual hackathon...',
    timestamp: new Date(2026, 0, 31, 9, 0),
    read: true,
    pinned: false,
    band: 'later',
    priority: 'low',
    weight: 2,
    contexts: ['startup'],
    isInvite: true,
    body: `Hey everyone,

I'm organizing a [[virtual hackathon this weekend]]!

Theme: AI-powered productivity tools
Time: Saturday 10 AM - Sunday 6 PM
Prizes: Bragging rights + pizza!

Who's in? Reply if interested!

Rahul`,
    tags: ['event', 'startup'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACADEMIC MODE - Research, thesis, papers, professors
  // ═══════════════════════════════════════════════════════════════════════════
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
    tags: ['research', 'deadline', 'academic', 'school'],
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
    tags: ['meeting', 'deadline', 'academic', 'school'],
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
    tags: ['deadline', 'academic', 'school'],
  },
  {
    id: 'e13',
    from: mockContacts[1],
    subject: 'Research Paper Draft Review',
    preview: 'I have completed the first draft of our joint paper. Would appreciate your feedback...',
    timestamp: new Date(2026, 0, 27, 9, 15),
    read: false,
    pinned: false,
    band: 'next',
    priority: 'high',
    weight: 8,
    hasDeadline: new Date(2026, 0, 30, 18, 0),
    contexts: ['academic'],
    bundleId: 'thesis-research',
    needsReply: true,
    body: `Dear Student,

I have completed the [[first draft of our joint research paper]] on deep learning optimization techniques.

Please review and provide feedback by [[Friday 6 PM]] so we can submit before the conference deadline.

Focus areas:
- Methodology section
- Experimental results
- Related work citations

Best regards,
Prof. Venkatesh Iyer`,
  },
  {
    id: 'e14',
    from: mockContacts[3],
    subject: 'Thesis Committee Meeting Scheduled',
    preview: 'Your thesis committee meeting has been scheduled for next Wednesday at 2 PM...',
    timestamp: new Date(2026, 0, 27, 14, 0),
    read: true,
    pinned: false,
    band: 'next',
    priority: 'medium',
    weight: 6,
    contexts: ['academic'],
    isInvite: true,
    body: `Dear Kartik,

Your [[thesis committee meeting]] has been confirmed for [[next Wednesday at 2:00 PM]] in Room 301.

Committee members:
- Prof. Venkatesh Iyer (Chair)
- Dr. Anjali Desai
- Prof. Kumar (External)

Please prepare a 20-minute presentation on your progress.

Best,
Dr. Desai`,
  },
  {
    id: 'e16',
    from: mockContacts[6],
    subject: 'Grant Proposal Final Review',
    preview: 'The NSF grant proposal is almost ready. Need your final sign-off before 5 PM submission...',
    timestamp: new Date(2026, 0, 28, 15, 0),
    read: false,
    pinned: false,
    band: 'now',
    priority: 'high',
    weight: 8,
    hasDeadline: new Date(2026, 0, 28, 17, 0),
    contexts: ['academic'],
    needsReply: true,
    body: `Hi,

The [[NSF grant proposal]] is finalized and ready for submission.

Budget summary:
- Equipment: $150,000
- Personnel: $200,000
- Travel: $25,000

[[Submission deadline: TODAY 5 PM]]

Please review and approve!

Kavita`,
  },
  {
    id: 'e20',
    from: mockContacts[1],
    subject: 'Paper Submission Reminder - 6 PM Deadline',
    preview: 'Friendly reminder that the conference paper submission closes at 6 PM today...',
    timestamp: new Date(2026, 0, 30, 12, 0),
    read: false,
    pinned: true,
    band: 'now',
    priority: 'high',
    weight: 9,
    hasDeadline: new Date(2026, 0, 30, 18, 0),
    contexts: ['academic'],
    bundleId: 'thesis-research',
    body: `Dear Student,

This is a reminder that our [[paper submission deadline]] is [[TODAY at 6:00 PM]].

Final checklist:
- [ ] Abstract polished
- [ ] All figures high-resolution
- [ ] References formatted in IEEE style
- [ ] Supplementary materials uploaded

Please send me the final PDF by [[4 PM]] for a last review.

Prof. Iyer`,
  },
  {
    id: 'e23',
    from: mockContacts[3],
    subject: 'Monday Lab Meeting Agenda',
    preview: 'Preparing for next week. Here is the agenda for our Monday lab meeting...',
    timestamp: new Date(2026, 0, 31, 11, 0),
    read: true,
    pinned: false,
    band: 'next',
    priority: 'medium',
    weight: 4,
    contexts: ['academic'],
    body: `Team,

Agenda for [[Monday's Lab Meeting]] at 11 AM:

1. Paper submission debrief
2. New project proposals
3. Conference travel planning
4. Equipment updates

Please prepare any topics you'd like to discuss.

Dr. Desai`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CAREER MODE - Job applications, networking, professional development
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'e24',
    from: { id: 'recruiter1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=45', email: 'sarah@techcorp.com', relationship: 'important', contexts: ['deep-work'] },
    subject: 'Senior Engineer Role - Interview Invitation',
    preview: 'We reviewed your application and would like to invite you for a technical interview...',
    timestamp: new Date(2026, 0, 30, 9, 0),
    read: false,
    pinned: true,
    band: 'now',
    priority: 'high',
    weight: 10,
    hasDeadline: new Date(2026, 1, 3, 17, 0),
    contexts: ['deep-work'],
    needsReply: true,
    body: `Hi Kartik,

Thank you for applying to the Senior Software Engineer position at TechCorp.

We were impressed by your background and would like to [[invite you for a technical interview]].

Available slots:
- [[Monday, Feb 3 at 10 AM]]
- [[Tuesday, Feb 4 at 2 PM]]
- [[Wednesday, Feb 5 at 11 AM]]

Please confirm your preferred time by [[Friday EOD]].

Best regards,
Sarah Chen
Senior Technical Recruiter`,
  },
  {
    id: 'e25',
    from: { id: 'mentor1', name: 'David Kumar', avatar: 'https://i.pravatar.cc/150?img=12', email: 'david@mentorship.io', relationship: 'important', contexts: ['deep-work'] },
    subject: 'Monthly Mentorship Check-in',
    preview: 'Time for our monthly sync! Would love to hear about your career progress...',
    timestamp: new Date(2026, 0, 29, 15, 0),
    read: true,
    pinned: false,
    band: 'next',
    priority: 'medium',
    weight: 6,
    contexts: ['deep-work'],
    isInvite: true,
    body: `Hey Kartik,

It's time for our [[monthly mentorship check-in]]!

Topics I'd like to cover:
1. Career goals progress
2. Technical skill development
3. Networking opportunities
4. Any challenges you're facing

Let's meet [[this Thursday at 4 PM]] if that works for you.

Looking forward to catching up!

David`,
  },
  {
    id: 'e26',
    from: { id: 'linkedin', name: 'LinkedIn', avatar: 'https://i.pravatar.cc/150?img=69', email: 'notifications@linkedin.com', relationship: 'regular', contexts: ['deep-work'] },
    subject: '5 New Job Matches for You',
    preview: 'Based on your profile, we found 5 new opportunities that match your skills...',
    timestamp: new Date(2026, 0, 28, 8, 0),
    read: true,
    pinned: false,
    band: 'later',
    priority: 'low',
    weight: 3,
    contexts: ['deep-work'],
    body: `Hi Kartik,

Based on your profile and job preferences, we found [[5 new job matches]]:

1. **Staff Engineer** at Google - Mountain View
2. **Tech Lead** at Stripe - Remote
3. **Senior SWE** at Meta - Menlo Park
4. **Principal Engineer** at Apple - Cupertino
5. **Engineering Manager** at Netflix - Los Gatos

Apply now to stand out!

LinkedIn Jobs Team`,
  },
  {
    id: 'e27',
    from: { id: 'conference', name: 'TechConf 2026', avatar: 'https://i.pravatar.cc/150?img=70', email: 'speakers@techconf.io', relationship: 'important', contexts: ['deep-work'] },
    subject: 'Speaking Opportunity - TechConf 2026',
    preview: 'We would like to invite you to speak at our annual conference in March...',
    timestamp: new Date(2026, 0, 27, 11, 0),
    read: false,
    pinned: false,
    band: 'next',
    priority: 'medium',
    weight: 7,
    hasDeadline: new Date(2026, 1, 10),
    contexts: ['deep-work'],
    needsReply: true,
    body: `Dear Kartik,

We are thrilled to invite you to be a [[speaker at TechConf 2026]]!

Conference Details:
- **Date**: March 15-17, 2026
- **Location**: Bangalore International Convention Centre
- **Topic**: We'd love a talk on AI-powered productivity tools

Speaking benefits:
- Complimentary conference pass
- Travel and accommodation covered
- Networking dinner with industry leaders

Please [[confirm by February 10]] if you're interested.

Best,
TechConf Program Committee`,
  },
  {
    id: 'e28',
    from: { id: 'hiring-manager', name: 'Amit Verma', avatar: 'https://i.pravatar.cc/150?img=13', email: 'amit@startup.vc', relationship: 'important', contexts: ['deep-work'] },
    subject: 'Referral Request - Engineering Lead Position',
    preview: 'Your colleague mentioned you might know someone for our Engineering Lead role...',
    timestamp: new Date(2026, 0, 26, 14, 0),
    read: true,
    pinned: false,
    band: 'later',
    priority: 'low',
    weight: 4,
    contexts: ['deep-work'],
    body: `Hi Kartik,

A mutual connection suggested I reach out. We're looking for an [[Engineering Lead]] at our Series A startup.

Requirements:
- 5+ years experience
- Full-stack expertise
- Leadership experience

If you know anyone who might be a fit, I'd love an introduction. [[Referral bonus: $5,000]]!

Thanks,
Amit Verma
VP Engineering`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERAL / NEWSLETTERS - Low priority, no specific context
  // ═══════════════════════════════════════════════════════════════════════════
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
  {
    id: 'e22',
    from: { id: 'newsletter', name: 'Morning Brew', avatar: 'https://i.pravatar.cc/150?img=68', email: 'newsletter@morningbrew.com', relationship: 'noise', contexts: [] },
    subject: 'Weekend Edition: Tech Headlines',
    preview: 'The biggest stories in tech this week. Plus: startup layoffs continue...',
    timestamp: new Date(2026, 0, 31, 7, 0),
    read: false,
    pinned: false,
    band: 'later',
    priority: 'low',
    weight: 1,
    contexts: [],
    body: `Happy Weekend!

📰 Top Stories:
1. Major tech giant announces 10,000 layoffs
2. AI startup raises record $500M Series B
3. New privacy regulations take effect in EU

Have a great weekend!
Morning Brew Team`,
  },
];

export const mockGhostEvents: GhostEvent[] = [
  {
    id: 'g1',
    emailId: 'e1',
    title: 'Pitch Prep',
    suggestedDate: new Date(2026, 1, 1, 13, 0),
    snippet: 'Sync before the investor pitch',
    solidified: false,
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // STARTUP MODE - Investor meetings, team syncs, product work
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'cal-sun-1',
    title: 'Weekly Planning',
    start: new Date(2026, 0, 25, 10, 0),
    end: new Date(2026, 0, 25, 11, 0),
    type: 'deep-work',
    context: 'startup',
  },
  {
    id: 'cal-mon-1',
    title: 'Morning Standup',
    start: new Date(2026, 0, 26, 9, 0),
    end: new Date(2026, 0, 26, 9, 30),
    type: 'meeting',
    context: 'startup',
    emailId: 'e11',
  },
  {
    id: 'cal-mon-2',
    title: 'Investor Prep Call',
    start: new Date(2026, 0, 26, 11, 0),
    end: new Date(2026, 0, 26, 12, 0),
    type: 'meeting',
    context: 'startup',
  },
  {
    id: 'cal-mon-3',
    title: 'Deep Work: Product Roadmap',
    start: new Date(2026, 0, 26, 14, 0),
    end: new Date(2026, 0, 26, 16, 0),
    type: 'deep-work',
    context: 'startup',
  },
  {
    id: 'cal-wed-1',
    title: 'Board Meeting Prep',
    start: new Date(2026, 0, 28, 8, 0),
    end: new Date(2026, 0, 28, 9, 0),
    type: 'deep-work',
    context: 'startup',
  },
  {
    id: 'cal-wed-2',
    title: 'VC Partner Call',
    start: new Date(2026, 0, 28, 10, 0),
    end: new Date(2026, 0, 28, 11, 0),
    type: 'meeting',
    context: 'startup',
  },
  {
    id: 'cal-thu-1',
    title: 'Sprint Planning',
    start: new Date(2026, 0, 29, 9, 0),
    end: new Date(2026, 0, 29, 10, 0),
    type: 'meeting',
    context: 'startup',
  },
  {
    id: 'cal-thu-2',
    title: 'Design Review',
    start: new Date(2026, 0, 29, 10, 0),
    end: new Date(2026, 0, 29, 11, 0),
    type: 'meeting',
    context: 'startup',
  },
  {
    id: 'cal-thu-4',
    title: 'Code Review Session',
    start: new Date(2026, 0, 29, 15, 0),
    end: new Date(2026, 0, 29, 16, 0),
    type: 'meeting',
    context: 'startup',
  },
  {
    id: 'cal-fri-2',
    title: 'Team Sync',
    start: new Date(2026, 0, 30, 11, 0),
    end: new Date(2026, 0, 30, 11, 30),
    type: 'meeting',
    context: 'startup',
  },
  {
    id: 'cal-fri-3',
    title: 'Investor Pitch',
    start: new Date(2026, 0, 30, 14, 0),
    end: new Date(2026, 0, 30, 15, 0),
    type: 'meeting',
    context: 'startup',
    emailId: 'e19',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACADEMIC MODE - Lectures, lab meetings, thesis work
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'cal-tue-1',
    title: 'ML Lecture',
    start: new Date(2026, 0, 27, 9, 0),
    end: new Date(2026, 0, 27, 10, 30),
    type: 'meeting',
    context: 'academic',
  },
  {
    id: 'cal-tue-2',
    title: 'Research Lab Meeting',
    start: new Date(2026, 0, 27, 11, 0),
    end: new Date(2026, 0, 27, 12, 0),
    type: 'meeting',
    context: 'academic',
  },
  {
    id: 'cal-tue-3',
    title: 'Thesis Writing',
    start: new Date(2026, 0, 27, 14, 0),
    end: new Date(2026, 0, 27, 17, 0),
    type: 'deep-work',
    context: 'academic',
  },
  {
    id: 'cal-wed-3',
    title: 'Prof. Iyer Office Hours',
    start: new Date(2026, 0, 28, 14, 0),
    end: new Date(2026, 0, 28, 14, 30),
    type: 'meeting',
    context: 'academic',
  },
  {
    id: 'cal-wed-4',
    title: 'Grant Proposal Deadline',
    start: new Date(2026, 0, 28, 17, 0),
    end: new Date(2026, 0, 28, 17, 30),
    type: 'deadline',
    context: 'academic',
  },
  {
    id: 'cal-thu-3',
    title: 'Lunch with Advisor',
    start: new Date(2026, 0, 29, 12, 0),
    end: new Date(2026, 0, 29, 13, 0),
    type: 'meeting',
    context: 'academic',
  },
  {
    id: 'cal-fri-1',
    title: 'Deep Work Block',
    start: new Date(2026, 0, 30, 9, 0),
    end: new Date(2026, 0, 30, 11, 0),
    type: 'deep-work',
    context: 'academic',
  },
  {
    id: 'cal-fri-4',
    title: 'Paper Submission Deadline',
    start: new Date(2026, 0, 30, 18, 0),
    end: new Date(2026, 0, 30, 18, 30),
    type: 'deadline',
    context: 'academic',
    emailId: 'e20',
  },
  {
    id: 'cal-sat-2',
    title: 'Research Reading',
    start: new Date(2026, 0, 31, 14, 0),
    end: new Date(2026, 0, 31, 16, 0),
    type: 'deep-work',
    context: 'academic',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CAREER MODE - Interviews, mentorship, upskilling
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'cal-thu-5',
    title: 'Mentorship Check-in',
    start: new Date(2026, 0, 29, 16, 0),
    end: new Date(2026, 0, 29, 16, 30),
    type: 'meeting',
    context: 'deep-work',
    emailId: 'e25',
  },
  {
    id: 'cal-sat-1',
    title: 'Personal Project Time',
    start: new Date(2026, 0, 31, 10, 0),
    end: new Date(2026, 0, 31, 12, 0),
    type: 'deep-work',
    context: 'deep-work',
  },
  {
    id: 'cal-sun-2',
    title: 'LeetCode Practice',
    start: new Date(2026, 0, 25, 14, 0),
    end: new Date(2026, 0, 25, 16, 0),
    type: 'deep-work',
    context: 'deep-work',
  },

  // Shadow Events (Sacrificed Time)
  {
    id: 'cal-shadow-1',
    title: 'Internship Sync',
    start: new Date(2026, 0, 26, 14, 0), // Monday 2pm
    end: new Date(2026, 0, 26, 15, 0),
    type: 'meeting',
    context: 'academic',
    shadowedContext: 'startup',
    originalTitle: 'Product Dev Sprint',
  },
  {
    id: 'cal-shadow-2',
    title: 'Faculty Meeting',
    start: new Date(2026, 0, 28, 10, 0), // Wednesday 10am
    end: new Date(2026, 0, 28, 11, 0),
    type: 'meeting',
    context: 'academic',
    shadowedContext: 'startup',
    originalTitle: 'User Interviews',
  },
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
