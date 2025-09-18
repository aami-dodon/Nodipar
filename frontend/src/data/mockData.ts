export const communityPosts = [
  {
    id: 'post-1',
    author: 'Asha Rahman',
    avatar: 'https://i.pravatar.cc/150?img=47',
    content: 'Throwback to our 2008 picnic! Drop your favourite memory in the comments and tag your picnic buddy. 🌞',
    media: {
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
    },
    hashtags: ['#Picnic', '#Reunion'],
    likes: 248,
    comments: 37,
    reactions: {
      wow: 12,
      love: 56,
      laugh: 18,
    },
    pinned: true,
    timestamp: '3h ago',
  },
  {
    id: 'post-2',
    author: 'Nadir Chowdhury',
    avatar: 'https://i.pravatar.cc/150?img=12',
    content:
      'Planning a Dhaka mini-reunion in November. Vote on the venue and drop your availability below. 🎉',
    media: {
      type: 'poll',
      options: [
        { label: 'The Westin Rooftop', votes: 42 },
        { label: 'Gulshan Club', votes: 37 },
        { label: 'Sonargaon Courtyard', votes: 24 },
      ],
    },
    hashtags: ['#Reunion'],
    likes: 189,
    comments: 52,
    reactions: {
      love: 44,
      support: 12,
    },
    timestamp: '6h ago',
  },
  {
    id: 'post-3',
    author: 'Trisha Basu',
    avatar: 'https://i.pravatar.cc/150?img=32',
    content:
      'Sharing the highlight reel from last month\'s heritage walk. Tag the friends you spotted!',
    media: {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
    },
    hashtags: ['#HeritageWalk', '#Nostalgia'],
    likes: 312,
    comments: 41,
    reactions: {
      wow: 68,
      love: 102,
    },
    timestamp: '1d ago',
  },
];

export const announcements = [
  {
    id: 'ann-1',
    title: 'Scholarship Fund Target Hit!',
    description: 'We reached BDT 5 lakh this quarter. Gratitude to everyone who chipped in.',
    category: 'Milestone',
    scheduledFor: '15 Oct 2024',
    channel: ['Push', 'Email'],
    priority: 'High',
  },
  {
    id: 'ann-2',
    title: 'Website Maintenance Window',
    description: 'Platform will be in read-only mode on 02 Nov from 11pm - 1am BST.',
    category: 'Maintenance',
    scheduledFor: '02 Nov 2024',
    channel: ['Push'],
    priority: 'Medium',
  },
];

export const newsroom = [
  {
    id: 'news-1',
    title: 'Batch of 1999 launches annual mentorship',
    date: '9 Oct 2024',
    url: '#',
  },
  {
    id: 'news-2',
    title: 'Community garden initiative kicks off at campus',
    date: '4 Oct 2024',
    url: '#',
  },
];

export const events = [
  {
    id: 'event-1',
    name: 'Winter Reunion Gala',
    date: '12 Dec 2024',
    location: 'Dhaka Club Ballroom',
    going: 86,
    interested: 142,
    reminders: true,
    discussionCount: 64,
    galleryCount: 128,
    pollQuestion: 'Pick the live band',
    pollOptions: [
      { label: 'Arbovirus Unplugged', votes: 52 },
      { label: 'Nemesis Classic', votes: 47 },
      { label: 'Miles Tribute', votes: 39 },
    ],
  },
  {
    id: 'event-2',
    name: 'Virtual Career Clinic',
    date: '24 Oct 2024',
    location: 'Zoom',
    going: 48,
    interested: 91,
    reminders: false,
    discussionCount: 19,
    galleryCount: 12,
    pollQuestion: 'What topic should we deep dive?',
    pollOptions: [
      { label: 'Startups in Bangladesh', votes: 33 },
      { label: 'Product Management', votes: 22 },
      { label: 'Tech Leadership', votes: 18 },
    ],
  },
];

export const galleries = {
  memoryOfWeek: {
    title: 'Freshers Cultural Fest 2010',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    description: 'Tag your friends from the dramatic club and relive the stage lights.',
  },
  albums: [
    {
      id: 'album-1',
      title: 'Heritage Walk 2024',
      count: 86,
      contributors: 18,
      tags: ['#History', '#OldDhaka'],
    },
    {
      id: 'album-2',
      title: 'Sylhet Retreat',
      count: 132,
      contributors: 27,
      tags: ['#Nature', '#Adventure'],
    },
    {
      id: 'album-3',
      title: 'Film & Flashback Night',
      count: 58,
      contributors: 9,
      tags: ['#CinemaClub'],
    },
  ],
};

export const chats = {
  direct: [
    {
      id: 'chat-1',
      name: 'Siam Rahman',
      lastMessage: 'Sending you the batch directory PDF now.',
      time: '2m',
      unread: 2,
    },
    {
      id: 'chat-2',
      name: 'Farhana Z.',
      lastMessage: 'Setlist idea for the gala. Thoughts?',
      time: '12m',
      unread: 0,
    },
  ],
  groups: [
    {
      id: 'group-1',
      name: 'Batch 2004',
      members: 128,
      lastMessage: 'Poll: Where to host the silver jubilee?',
      time: '10m',
    },
    {
      id: 'group-2',
      name: 'Dhaka Cyclists',
      members: 48,
      lastMessage: 'Sunday ride route locked!',
      time: '1h',
    },
  ],
  events: [
    {
      id: 'event-chat-1',
      name: 'Winter Reunion RSVP',
      members: 230,
      lastMessage: 'Reminder: dress code is jewel tones ✨',
      time: '25m',
    },
  ],
};

export const profiles = {
  featured: [
    {
      id: 'profile-1',
      name: 'Raiyan Hoque',
      batch: 'Class of 2005',
      location: 'Toronto, Canada',
      bio: 'Product strategist, storyteller, and proud theatre club alum.',
      avatar: 'https://i.pravatar.cc/150?img=21',
      socials: {
        linkedin: '#',
        instagram: '#',
      },
    },
    {
      id: 'profile-2',
      name: 'Maliha Ahmed',
      batch: 'Class of 2001',
      location: 'Sydney, Australia',
      bio: 'Documentary photographer curating our alumni photo vault.',
      avatar: 'https://i.pravatar.cc/150?img=56',
      socials: {
        linkedin: '#',
        website: '#',
      },
    },
  ],
  directoryStats: {
    totalMembers: 1820,
    batches: 38,
    lastUpdated: 'Today 09:14 AM',
  },
};

export const polls = [
  {
    id: 'poll-1',
    title: 'Which throwback game night should we host?',
    expiresIn: '2 days',
    anonymous: false,
    options: [
      { label: 'Carrom Championship', votes: 68 },
      { label: 'LAN Party + FIFA', votes: 52 },
      { label: 'Pictionary Mayhem', votes: 34 },
    ],
  },
  {
    id: 'poll-2',
    title: 'Should we open the archives to current seniors?',
    expiresIn: '5 days',
    anonymous: true,
    options: [
      { label: 'Yes, with moderation', votes: 112 },
      { label: 'Only during events', votes: 48 },
      { label: 'Keep alumni only', votes: 27 },
    ],
  },
];

export const gamification = {
  points: 2485,
  rank: 4,
  badges: [
    { id: 'badge-1', label: 'Organizer', description: 'Hosted 3 or more events this year.' },
    { id: 'badge-2', label: 'Photographer', description: 'Uploaded 50+ gallery photos.' },
    { id: 'badge-3', label: 'Connector', description: 'Invited 10 new members.' },
  ],
  leaderboard: [
    { id: 'leader-1', name: 'Lamia S.', score: 3120 },
    { id: 'leader-2', name: 'Rehan R.', score: 2980 },
    { id: 'leader-3', name: 'Tahsin A.', score: 2845 },
  ],
};

export const notificationSettings = {
  categories: [
    { label: 'Posts & Reactions', inApp: true, email: 'daily digest' },
    { label: 'Events & RSVPs', inApp: true, email: 'instant' },
    { label: 'Mentions & Tags', inApp: true, email: 'instant' },
    { label: 'Birthdays', inApp: true, email: 'weekly summary' },
  ],
  dnd: {
    enabled: false,
    window: '11:00 PM - 7:00 AM',
  },
};

export const searchIndex = {
  quickFilters: ['Posts', 'Events', 'People', 'Photos', 'Resources'],
  trendingTags: ['#Reunion', '#ThrowbackThursday', '#BatchOf2000'],
  recentSearches: ['Batch 2007 directory', 'Picnic 2012 photos'],
};

export const archives = {
  upcomingThrowback: {
    title: 'On this day in 2002',
    description: 'The debate team lifted the national trophy. Relive the winning speech tonight!'
  },
  items: [
    {
      id: 'archive-1',
      title: 'Science Fair Winners 1998',
      type: 'photo album',
      year: 1998,
    },
    {
      id: 'archive-2',
      title: 'Annual Magazine 2005',
      type: 'pdf',
      year: 2005,
    },
  ],
};

export const resources = [
  {
    id: 'resource-1',
    title: 'Alumni Handbook 2024',
    type: 'PDF',
    size: '4.3 MB',
    owner: 'Admin Team',
  },
  {
    id: 'resource-2',
    title: 'Event Poster Templates',
    type: 'Figma',
    size: 'Shared',
    owner: 'Design Guild',
  },
  {
    id: 'resource-3',
    title: 'Yearbook Archive (1995-2005)',
    type: 'Drive Folder',
    size: '2.8 GB',
    owner: 'Archivists',
  },
];

export const engagement = {
  throwback: {
    prompt: 'Share a photo from the last campus mela and tag two friends!',
    submissions: 26,
  },
  trivia: {
    question: 'Which teacher introduced the first robotics club in 2009?',
    reveal: 'Answer drops at 9 PM!',
  },
  challenges: [
    {
      id: 'challenge-1',
      title: 'Batch Bingo',
      status: 'Live now',
      description: 'Collect all five throwback moments from your classmates.',
    },
    {
      id: 'challenge-2',
      title: 'Story Chain',
      status: 'Starts Friday',
      description: 'Add a line to our collective nostalgia tale.',
    },
  ],
};

export const birthdays = {
  today: [
    { id: 'bd-1', name: 'Rukhsar Islam', batch: 'Class of 2003' },
    { id: 'bd-2', name: 'Nusrat Khan', batch: 'Class of 2008' },
  ],
  upcoming: [
    { id: 'bd-3', name: 'Imran H.', date: 'Tomorrow' },
    { id: 'bd-4', name: 'Shapla N.', date: '12 Oct' },
  ],
};

export const moderation = {
  reports: [
    {
      id: 'rep-1',
      reporter: 'Arif S.',
      reason: 'Duplicate event listing',
      status: 'Under review',
      submitted: '30m ago',
    },
    {
      id: 'rep-2',
      reporter: 'Mitu R.',
      reason: 'Comment flagged as spam',
      status: 'Resolved',
      submitted: '4h ago',
    },
  ],
  safetyTips: [
    'Set post visibility per batch using privacy controls.',
    'Two-factor authentication keeps reunion details secure.',
    'Admins review reported content within 24 hours.',
  ],
};
