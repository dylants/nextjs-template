import { User as PrismaUser } from '@prisma/client';

type User = Omit<PrismaUser, 'passwordHash'>;

export default User;
