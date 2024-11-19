import { encryptPassword } from '@/lib/encryption';
import { PrismaClient } from '@prisma/client';
import userFixtures from './fixtures/user.fixture';
const prisma = new PrismaClient();

async function createFixtures() {
  for (const user of userFixtures) {
    await prisma.user.create({
      data: {
        ...user,
        passwordHash: await encryptPassword({ password: user.passwordHash }),
      },
    });
  }
}

createFixtures()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
