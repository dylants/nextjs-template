import { Prisma } from '@prisma/client';

type UserCreateInput = Pick<Prisma.UserCreateInput, 'email'> & {
  password: string;
};

export default UserCreateInput;
