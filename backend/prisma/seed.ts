/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.messageReaction.deleteMany(),
    prisma.message.deleteMany(),
    prisma.threadParticipant.deleteMany(),
    prisma.chatThread.deleteMany(),
    prisma.mediaComment.deleteMany(),
    prisma.mediaItem.deleteMany(),
    prisma.album.deleteMany(),
    prisma.pollVote.deleteMany(),
    prisma.pollOption.deleteMany(),
    prisma.poll.deleteMany(),
    prisma.eventMessage.deleteMany(),
    prisma.eventRsvp.deleteMany(),
    prisma.event.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.notificationPreference.deleteMany(),
    prisma.resource.deleteMany(),
    prisma.userBadge.deleteMany(),
    prisma.badge.deleteMany(),
    prisma.activityLog.deleteMany(),
    prisma.reaction.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.post.deleteMany(),
    prisma.announcement.deleteMany(),
    prisma.report.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        fullName: 'Anika Chatterjee',
        email: 'anika@nodipar.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
        batchYear: 2010,
        location: 'Kolkata',
        bio: 'Community organiser and cultural fest host.',
        birthDate: new Date('1992-07-19'),
        socialLinks: { instagram: 'https://instagram.com/anika' },
      },
    }),
    prisma.user.create({
      data: {
        fullName: 'Rahul Biswas',
        email: 'rahul@nodipar.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=51',
        batchYear: 2011,
        location: 'Dhaka',
        bio: 'Photographer capturing every reunion.',
        birthDate: new Date('1993-11-05'),
        socialLinks: { facebook: 'https://facebook.com/rahul' },
      },
    }),
    prisma.user.create({
      data: {
        fullName: 'Sadia Karim',
        email: 'sadia@nodipar.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
        batchYear: 2009,
        location: 'Toronto',
        bio: 'Quiz master and trivia queen.',
        birthDate: new Date('1991-02-22'),
      },
    }),
    prisma.user.create({
      data: {
        fullName: 'Arif Hossain',
        email: 'arif@nodipar.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=33',
        batchYear: 2010,
        location: 'Chittagong',
        bio: 'Tech lead for our alumni digital home.',
        birthDate: new Date('1992-05-30'),
      },
    }),
    prisma.user.create({
      data: {
        fullName: 'Mitali Sen',
        email: 'mitali@nodipar.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
        batchYear: 2012,
        location: 'London',
        bio: 'Always planning the next picnic.',
        birthDate: new Date('1994-09-14'),
      },
    }),
  ]);

  await prisma.badge.createMany({
    data: [
      { code: 'ORGANIZER', label: 'Organizer', description: 'Hosts unforgettable gatherings.', points: 20 },
      { code: 'PHOTOGRAPHER', label: 'Photographer', description: 'Captures community stories.', points: 15 },
      { code: 'QUIZMASTER', label: 'Quiz Master', description: 'Keeps trivia nights buzzing.', points: 10 },
    ],
  });

  const [anika, rahul, sadia, arif, mitali] = users;

  const post = await prisma.post.create({
    data: {
      authorId: anika.id,
      content: 'Throwback to our 2010 science fair! Share your favourite moments with #Reunion and #ScienceMagic.',
      mediaUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
      mediaType: 'image',
      hashtags: ['Reunion', 'ScienceMagic'],
      isPinned: true,
      comments: {
        create: [
          {
            authorId: rahul.id,
            body: 'I still remember the robotics demo—it blew everyone away! 🤖',
          },
          {
            authorId: sadia.id,
            body: 'And the quiz finale was electric! We should host another soon.',
          },
        ],
      },
      reactions: {
        create: [
          { userId: rahul.id, type: 'heart' },
          { userId: sadia.id, type: 'sparkles' },
          { userId: arif.id, type: 'like' },
        ],
      },
    },
  });

  await prisma.activityLog.createMany({
    data: [
      { userId: anika.id, type: 'POST_CREATED', points: 5, metadata: { postId: post.id } },
      { userId: rahul.id, type: 'REACTION_ADDED', points: 1, metadata: { postId: post.id } },
      { userId: sadia.id, type: 'REACTION_ADDED', points: 1, metadata: { postId: post.id } },
      { userId: arif.id, type: 'REACTION_ADDED', points: 1, metadata: { postId: post.id } },
      { userId: rahul.id, type: 'COMMENT_CREATED', points: 2, metadata: { postId: post.id } },
      { userId: sadia.id, type: 'COMMENT_CREATED', points: 2, metadata: { postId: post.id } },
    ],
  });

  const event = await prisma.event.create({
    data: {
      title: 'Nodipar 2024 Monsoon Reunion',
      description: 'A riverside adda with music, memories, and a tribute to our favourite teachers. RSVP to help us finalise catering.',
      location: 'Rabindra Sarobar, Kolkata',
      coverImage: 'https://images.unsplash.com/photo-1515165562835-c4c2fffbe9ef',
      startAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21 + 1000 * 60 * 60 * 6),
      tags: ['Reunion', 'MonsoonMagic'],
      createdById: mitali.id,
      rsvps: {
        create: [
          { userId: anika.id, status: 'GOING' },
          { userId: rahul.id, status: 'INTERESTED' },
          { userId: sadia.id, status: 'GOING' },
        ],
      },
      messages: {
        create: [
          { authorId: anika.id, body: 'Let’s bring back the 2010 dance routine!' },
          { authorId: rahul.id, body: 'I can handle the photo booth setup.' },
        ],
      },
      polls: {
        create: [
          {
            title: 'Preferred picnic menu',
            description: 'Help the organisers lock the menu.',
            createdById: mitali.id,
            options: {
              create: [{ label: 'Traditional Bengali' }, { label: 'Fusion Street Food' }, { label: 'BBQ & Grill' }],
            },
          },
        ],
      },
    },
    include: { polls: { include: { options: true } } },
  });

  await prisma.activityLog.create({
    data: { userId: mitali.id, type: 'EVENT_CREATED', points: 10, metadata: { eventId: event.id } },
  });

  await prisma.chatThread.create({
    data: {
      title: `${event.title} RSVP chat`,
      type: 'EVENT',
      createdById: mitali.id,
      eventId: event.id,
      participants: {
        create: [
          { userId: mitali.id, role: 'ADMIN' },
          { userId: anika.id, role: 'MEMBER' },
          { userId: rahul.id, role: 'MEMBER' },
        ],
      },
      messages: {
        create: [
          { senderId: mitali.id, body: 'Can someone coordinate the music playlist?' },
          { senderId: anika.id, body: 'I have a reunion playlist ready to go!' },
        ],
      },
    },
  });

  await prisma.album.create({
    data: {
      title: '2012 Cultural Fest Highlights',
      description: 'Snapshots from our legendary fest night.',
      createdById: rahul.id,
      coverImage: 'https://images.unsplash.com/photo-1529158062015-cad636e69505',
      media: {
        create: [
          {
            uploaderId: rahul.id,
            url: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81a',
            type: 'IMAGE',
            caption: 'Spot your younger self on stage! #Throwback',
            taggedUserIds: [anika.id, sadia.id],
            comments: {
              create: [{ authorId: sadia.id, body: 'Still remember practicing late nights for this!' }],
            },
          },
        ],
      },
    },
  });

  await prisma.resource.createMany({
    data: [
      {
        title: 'Alumni Directory Template',
        description: 'Editable Google Sheet to track members and contact info.',
        type: 'DOCUMENT',
        url: 'https://docs.google.com/spreadsheets/d/example',
        uploadedById: arif.id,
        tags: ['Template', 'Directory'],
      },
      {
        title: 'Yearbook 2010 (PDF)',
        description: 'Digitised version of our 2010 yearbook.',
        type: 'DOCUMENT',
        url: 'https://example.com/yearbook-2010.pdf',
        uploadedById: anika.id,
        tags: ['Yearbook', 'Archive'],
      },
    ],
  });

  await prisma.poll.create({
    data: {
      title: 'Next Fun Zone Challenge',
      description: 'Vote for the activity you want to see next week.',
      createdById: sadia.id,
      options: {
        create: [{ label: 'Throwback photo caption contest' }, { label: 'Batch trivia night' }, { label: 'Virtual karaoke' }],
      },
    },
  });

  const badges = await prisma.badge.findMany({ where: { code: { in: ['ORGANIZER', 'PHOTOGRAPHER', 'QUIZMASTER'] } } });
  const badgeByCode = badges.reduce<Record<string, number>>((acc, badge) => {
    acc[badge.code] = badge.id;
    return acc;
  }, {});

  const organizerBadgeId = badgeByCode.ORGANIZER;
  const photographerBadgeId = badgeByCode.PHOTOGRAPHER;
  const quizmasterBadgeId = badgeByCode.QUIZMASTER;

  if (!organizerBadgeId || !photographerBadgeId || !quizmasterBadgeId) {
    throw new Error('Required seed badges missing');
  }

  await prisma.userBadge.createMany({
    data: [
      { userId: mitali.id, badgeId: organizerBadgeId },
      { userId: rahul.id, badgeId: photographerBadgeId },
      { userId: sadia.id, badgeId: quizmasterBadgeId },
    ],
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: anika.id,
        category: 'EVENT',
        payload: { message: 'Mitali mentioned you in the Monsoon Reunion thread.' },
      },
      {
        userId: rahul.id,
        category: 'POST',
        payload: { message: 'Anika pinned a new throwback on the Adda Wall.' },
      },
    ],
  });

  await prisma.notificationPreference.createMany({
    data: [
      { userId: anika.id, emailDigestFrequency: 'DAILY', pushEnabled: true, emailEnabled: true, categories: { POST: true } },
      { userId: rahul.id, emailDigestFrequency: 'WEEKLY', pushEnabled: true, emailEnabled: true, categories: { EVENT: true } },
    ],
  });

  console.log('Database seeded with Nodipar sample data.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
