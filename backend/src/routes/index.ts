import type { Express } from 'express';

import { announcementsRouter } from '../modules/announcements/announcements.router';
import { birthdaysRouter } from '../modules/birthdays/birthdays.router';
import { chatsRouter } from '../modules/chats/chats.router';
import { engagementRouter } from '../modules/engagement/engagement.router';
import { eventsRouter } from '../modules/events/events.router';
import { gamificationRouter } from '../modules/gamification/gamification.router';
import { galleryRouter } from '../modules/gallery/gallery.router';
import { healthRouter } from '../modules/health/health.router';
import { moderationRouter } from '../modules/moderation/moderation.router';
import { notificationsRouter } from '../modules/notifications/notifications.router';
import { pollsRouter } from '../modules/polls/polls.router';
import { postsRouter } from '../modules/posts/posts.router';
import { profilesRouter } from '../modules/profiles/profiles.router';
import { resourcesRouter } from '../modules/resources/resources.router';
import { searchRouter } from '../modules/search/search.router';

export const registerRoutes = (app: Express) => {
  app.use('/health', healthRouter);
  app.use('/posts', postsRouter);
  app.use('/announcements', announcementsRouter);
  app.use('/events', eventsRouter);
  app.use('/gallery', galleryRouter);
  app.use('/chats', chatsRouter);
  app.use('/profiles', profilesRouter);
  app.use('/polls', pollsRouter);
  app.use('/gamification', gamificationRouter);
  app.use('/notifications', notificationsRouter);
  app.use('/search', searchRouter);
  app.use('/resources', resourcesRouter);
  app.use('/birthdays', birthdaysRouter);
  app.use('/moderation', moderationRouter);
  app.use('/engagement', engagementRouter);
};
