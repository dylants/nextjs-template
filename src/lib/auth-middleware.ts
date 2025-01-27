import projectConfig from '@/config/index';
import UnauthorizedError from '@/lib/errors/UnauthorizedError';
import { getLogger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import Session from '@/types/Session';
import { NextRequest } from 'next/server';

const authCookieName = projectConfig.auth.cookieName;

export default async function authMiddleware(
  request: NextRequest,
): Promise<Session> {
  const logger = getLogger('authMiddleware');

  const cookie = request.cookies.get(authCookieName);
  logger.trace({ cookie }, 'authMiddleware cookie');
  const userId = cookie?.value;
  if (!userId) {
    throw new UnauthorizedError();
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) {
    throw new UnauthorizedError();
  }

  return {
    user,
  };
}
