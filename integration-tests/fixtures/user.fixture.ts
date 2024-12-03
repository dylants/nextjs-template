import { Prisma } from '@prisma/client';

export const USER_WITH_WIDGETS_EMAIL = 'testUserWithWidgets@fake.com';
export const USER_NO_WIDGETS_EMAIL = 'testUserNoWidgets@fake.com';

export const PASSWORD = 'password';

const userFixtures: Prisma.UserCreateInput[] = [
  {
    email: USER_WITH_WIDGETS_EMAIL,
    passwordHash: PASSWORD,
    widgets: {
      createMany: {
        data: [
          { description: 'Description 1', name: 'Widget 1' },
          { description: 'Description 2', name: 'Widget 2' },
          { description: 'Description 3', name: 'Widget 3' },
        ],
      },
    },
  },
  {
    email: USER_NO_WIDGETS_EMAIL,
    passwordHash: PASSWORD,
  },
];

export default userFixtures;
