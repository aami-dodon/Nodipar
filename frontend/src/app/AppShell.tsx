import { Section } from '../components/Section';
import { CommunityFeed } from '../features/communityFeed/CommunityFeed';
import { Announcements } from '../features/announcements/Announcements';
import { EventsCenter } from '../features/eventsCenter/EventsCenter';
import { Gallery } from '../features/gallery/Gallery';
import { Messaging } from '../features/messaging/Messaging';
import { Profiles } from '../features/profiles/Profiles';
import { Polls } from '../features/polls/Polls';
import { Gamification } from '../features/gamification/Gamification';
import { Notifications } from '../features/notifications/Notifications';
import { SearchArchive } from '../features/searchArchive/SearchArchive';
import { Resources } from '../features/resources/Resources';
import { Engagement } from '../features/engagement/Engagement';
import { Birthdays } from '../features/birthdays/Birthdays';
import { Moderation } from '../features/moderation/Moderation';
import styles from './AppShell.module.css';
import { announcements, communityPosts, events, resources as sharedResources } from '../data/mockData';

const sections = [
  {
    id: 'adda-wall',
    icon: '🧑‍🤝‍🧑',
    title: 'Community Feed (Adda Wall)',
    subtitle: 'Pin big reunion moments, launch polls, and spark conversations with your batchmates.',
    component: <CommunityFeed />,
  },
  {
    id: 'announcements',
    icon: '📣',
    title: 'Announcements & News',
    subtitle: 'Schedule priority updates and push them via in-app bell or email digests.',
    component: <Announcements />,
  },
  {
    id: 'events-center',
    icon: '🎉',
    title: 'Events Center',
    subtitle: 'Plan, RSVP, and coordinate discussions with auto-generated event chats and polls.',
    component: <EventsCenter />,
  },
  {
    id: 'gallery',
    icon: '📸',
    title: 'Photo & Media Gallery',
    subtitle: 'Relive memories with curated albums, contributor tags, and the Memory of the Week spotlight.',
    component: <Gallery />,
  },
  {
    id: 'bondho-chat',
    icon: '💬',
    title: 'Messaging (BondhoChat)',
    subtitle: 'Stay connected through DMs, interest groups, and auto-created event chat rooms.',
    component: <Messaging />,
  },
  {
    id: 'profiles',
    icon: '🪪',
    title: 'Profiles (Amader Golpo)',
    subtitle: 'Showcase alumni bios with privacy-aware controls and a searchable directory.',
    component: <Profiles />,
  },
  {
    id: 'polls',
    icon: '🗳️',
    title: 'Polls & Surveys',
    subtitle: 'Launch quick decisions with rich, anonymous or open voting experiences.',
    component: <Polls />,
  },
  {
    id: 'fun-zone',
    icon: '🏅',
    title: 'Gamification (Fun Zone)',
    subtitle: 'Reward community builders with points, badges, and a vibrant leaderboard.',
    component: <Gamification />,
  },
  {
    id: 'notifications',
    icon: '🔔',
    title: 'Notifications',
    subtitle: 'Fine-tune bell, email, and DND preferences across posts, events, and mentions.',
    component: <Notifications />,
  },
  {
    id: 'search-archive',
    icon: '🔍',
    title: 'Search & Archive',
    subtitle: 'Find posts, people, events, and throwbacks with filters and trending tags.',
    component: <SearchArchive />,
  },
  {
    id: 'resources',
    icon: '📂',
    title: 'Shared Resources',
    subtitle: 'Host docs, flyers, and collaborative notes with ownership clarity.',
    component: <Resources />,
  },
  {
    id: 'engagement',
    icon: '🎯',
    title: 'Engagement Boosters',
    subtitle: 'Keep nostalgia flowing with throwbacks, trivia, and seasonal challenges.',
    component: <Engagement />,
  },
  {
    id: 'birthdays',
    icon: '🎂',
    title: 'Birthdays',
    subtitle: 'Celebrate alumni with daily walls, reminders, and personal greetings.',
    component: <Birthdays />,
  },
  {
    id: 'moderation',
    icon: '🛡️',
    title: 'Moderation & Safety',
    subtitle: 'Empower admins with reporting workflows, safety cues, and privacy guardrails.',
    component: <Moderation />,
  },
];

const quickStats = [
  { label: 'Active conversations today', value: `${communityPosts.length} featured stories` },
  { label: 'Events on the calendar', value: `${events.length} upcoming` },
  { label: 'Resource hub', value: `${sharedResources.length} shared kits` },
  { label: 'Alerts queued', value: `${announcements.length} announcements` },
];

export const AppShell = () => {
  return (
    <div className={styles.shell}>
      <header className={styles.hero}>
        <div>
          <h1>Nodipar Alumni Hub</h1>
          <p>
            A vibrant, mobile-first command center for every reunion, picnic, and throwback moment.
            Discover conversations, plan events, and nurture alumni bonds from one modern dashboard.
          </p>
        </div>
        <div className={styles.quickStats}>
          {quickStats.map((stat) => (
            <span key={stat.label}>
              <strong>{stat.value}</strong>
              <br />
              {stat.label}
            </span>
          ))}
        </div>
      </header>
      <nav className={styles.nav}>
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.icon} {section.title}
          </a>
        ))}
      </nav>
      <main className={styles.sections}>
        {sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            icon={<span aria-hidden>{section.icon}</span>}
            title={section.title}
            subtitle={section.subtitle}
          >
            {section.component}
          </Section>
        ))}
      </main>
    </div>
  );
};
