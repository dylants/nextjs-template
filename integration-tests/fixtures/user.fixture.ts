import { Prisma } from '@prisma/client';

export const EMAIL = 'testUser@fake.com';
export const PASSWORD = 'password';

const userFixtures: Prisma.UserCreateInput[] = [
  {
    email: EMAIL,
    passwordHash: PASSWORD,
  },
];

export default userFixtures;
