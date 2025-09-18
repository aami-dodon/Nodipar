import { prisma } from '../src/db/client.js';

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'demo.alumnus@example.com',
        firstName: 'Demo',
        lastName: 'Alumnus'
      }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
