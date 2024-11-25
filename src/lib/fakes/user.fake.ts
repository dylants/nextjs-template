import User from '@/types/User';
import { faker } from '@faker-js/faker';
import { User as PrismaUser } from '@prisma/client';

export function fakeUser(): User {
  return {
    createdAt: faker.date.past(),
    email: faker.internet.email(),
    updatedAt: faker.date.past(),
    userId: faker.string.uuid(),
  };
}

// omit passwordHash to match our default implementation
export function fakePrismaUser(): Omit<PrismaUser, 'passwordHash'> {
  return {
    ...fakeUser(),
    id: faker.number.int(),
  };
}
