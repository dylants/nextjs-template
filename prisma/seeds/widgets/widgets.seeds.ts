import prisma from '@/lib/prisma';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import _ from 'lodash';

export async function generateWidgets(numWidgets: number) {
  const { userId } = await prisma.user.findFirstOrThrow({
    select: { userId: true },
    where: { email: 'test@fake.com' },
  });

  const data: Prisma.WidgetCreateManyInput[] = _.times(numWidgets, (i) => ({
    description: faker.lorem.sentence(),
    name: `Widget ${i + 1}`,
    userId,
  }));

  await prisma.widget.createMany({ data });
}
