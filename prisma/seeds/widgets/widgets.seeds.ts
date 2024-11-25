import prisma from '@/lib/prisma';

export async function generateWidgets() {
  const { userId } = await prisma.user.findFirstOrThrow({
    select: { userId: true },
    where: { email: 'test@fake.com' },
  });

  await prisma.widget.createMany({
    data: [
      { name: 'Widget 1', userId },
      { name: 'Widget 2', userId },
      { name: 'Widget 3', userId },
    ],
  });
}
