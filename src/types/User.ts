import { User as PrismaUser } from '@prisma/client';

type User = Omit<PrismaUser, 'id' | 'passwordHash'>;

export default User;
